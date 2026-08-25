import subprocess
import pandas as pd
import rq.job
import flask
import json
import os
import rq
import re

import atkinsonlab_web.form_validation
import atkinsonlab_web.applications
import atkinsonlab_web.enqueuing
import atkinsonlab_web.methods

from atkinsonlab_web import app, redis_connection
from atkinsonlab_web import queues


from werkzeug.security import check_password_hash
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()
@auth.verify_password
def verify_password(username, password):
    return check_password_hash(
        app.config["PAGE_PASS_HASH"],
        password)


@app.before_request
def show_maintenance_page():
    if app.config["MAINTENANCE_MODE"]:
        return flask.render_template("503.html"), 503


@app.route("/")
def home():
    return flask.render_template("index.html")


@app.route("/get_table/json/<id>")
def api_pf_table(id):
    data_df = app.config[id]
    data = data_df.to_dict(orient="records")
    return flask.jsonify(data)


@app.route("/<tool>", methods=["GET", "POST"])
def tool(tool):
    if tool in app.config["TOOLS"]:
        form = app.config[f"DEFAULT_FORM_{tool}"]
        if flask.request.args.get("demo"):
            form = app.config[f"DEMO_FORM_{tool}"]
        if flask.request.method == "POST":
            validation_job = atkinsonlab_web.enqueuing.enqueue_for_validation(flask.request,
                                                                              flask.request.remote_addr,
                                                                              tool, form["files_to_keep"])
            return flask.redirect(flask.url_for("request_validation", tool=tool, id=validation_job.id))
        return flask.render_template(f"{tool}.html", tool=tool, form=form)
    else:
        return flask.render_template("404.html"), 404


@app.route("/request_validation/<tool>/<id>", methods=["POST", "GET"])
def request_validation(tool, id):
    job = rq.job.Job.fetch(id, connection=redis_connection)
    full_status = atkinsonlab_web.methods.get_full_job_status(job)
    if full_status["status"] == "finished":
        request_form, parsed_arguments, files_to_keep = job.result
        if parsed_arguments["accept"]:
            run_job = atkinsonlab_web.enqueuing.enqueue_for_run(parsed_arguments, tool)
            return flask.redirect(flask.url_for(f"results", tool=tool, id=run_job.id))
        else:
            if flask.request.method == "POST":
                revalidation_job = atkinsonlab_web.enqueuing.enqueue_for_validation(flask.request,
                                                                                    flask.request.remote_addr, tool,
                                                                                    files_to_keep)
                return flask.redirect(flask.url_for("request_validation", id=revalidation_job.id, tool=tool))
            return flask.render_template(f"{tool}.html", form=request_form, modal=False)

    return flask.render_template("validation.html", status=full_status, id=job.id, tool=tool)


@app.route("/results/<tool>/<id>")
def results(tool, id):
    try:
        job = rq.job.Job.fetch(id, connection=redis_connection)
        full_status = atkinsonlab_web.methods.get_full_job_status(job)
        results_data = dict()
        results_data.update(job.meta)
        if full_status["status"] == "finished":
            results = job.result
            if tool == "ilund4u":
                folder_name = job.meta["run_name"]
                folder_path = os.path.join(app.config["JOBS_FOLDER"], tool, "successful_jobs", job.id, folder_name)
                results_data["mode"] = job.meta["ilund4u_mode"]
                if job.meta["ilund4u_mode"] == "protein":
                    mmseqs_stat_table_path = os.path.join(folder_path, "mmseqs_homology_search_full.tsv")
                    if os.path.exists(mmseqs_stat_table_path):
                        results_data["homology_detected"] = True
                        mmseqs_group_stat_table = pd.read_table(mmseqs_stat_table_path)
                        pf_hits = mmseqs_group_stat_table["group"].to_list()
                        valid_hits = [hit for hit in pf_hits if
                                      hit in app.config["ilund4u-phages-protein_families"].index]
                        pf_hits = valid_hits
                        results_data["N_hom_hits"] = len(pf_hits)

                        if len(pf_hits) == 0:
                            results_data["homology_detected"] = False
                        else:
                            selected_columns = ["name", "db_hit", "domains", "TM_annot", "N_Proteome_communities"]
                            proteins_group_stat_table_p = os.path.join(folder_path, "protein_group_stat.tsv")
                            proteins_group_stat_table = pd.read_table(proteins_group_stat_table_p).set_index(
                                "representative_protein")
                            proteome_annot_subset = app.config["ilund4u-phages-protein_families"].loc[
                                proteins_group_stat_table.index, selected_columns]
                            proteome_annot_subset["r_index"] = proteins_group_stat_table["r_index"].values
                            proteome_annot_subset.rename(
                                columns={"db_hit": "hmmscan hit", "domains": "Pfam domains", "r_index": "rank-index",
                                         "N_Proteome_communities": "# Proteome Communities", "TM_annot": "Topology"},
                                inplace=True)

                            mmseqs_group_stat_table.set_index("group", inplace=True)
                            proteome_annot_subset = proteome_annot_subset.join(
                                mmseqs_group_stat_table[["raw", "fident", "evalue", "qcov", "tcov"]])
                            proteome_annot_subset.reset_index(inplace=True)
                            proteome_annot_subset.rename(columns={"representative_protein": "Family", "name": "Name",
                                                                  "N_Proteome_communities": "# Proteome communities"},
                                                         inplace=True)
                            proteome_annot_subset["evalue"] = proteome_annot_subset["evalue"].apply(
                                lambda x: f"{x:.1e}")
                            proteome_annot_subset["qcov"] = proteome_annot_subset["qcov"].apply(lambda x: round(x, 2))
                            proteome_annot_subset["tcov"] = proteome_annot_subset["tcov"].apply(lambda x: round(x, 2))

                            cols = proteome_annot_subset.columns.tolist()
                            cols.insert(1, cols.pop(cols.index("rank-index")))
                            proteome_annot_subset = proteome_annot_subset[cols]
                            proteome_annot_subset["Family"] = proteome_annot_subset.apply(lambda row: (
                                f'<a href="/ilund4udb/phages/pf/{app.config["family_index_map"][row["Family"]]}">'
                                f'{row["Family"]}</a>' if row["Family"] in app.config[
                                    "family_index_map"] else row["Family"]), axis=1)
                            proteome_annot_subset.rename(columns={"Family": "Cluster"}, inplace=True)
                            proteome_annot_subset = proteome_annot_subset.to_html(
                                classes="table table-hover table-sm table-bordered", header="true", index=False,
                                table_id="pf_search_table", escape=False, border=0)
                            results_data["pf_search_table"] = proteome_annot_subset

                            pgroup_stat_table_path = os.path.join(folder_path, "protein_group_stat.tsv")
                            if os.path.exists(pgroup_stat_table_path):
                                pgroup_stat_table = pd.read_table(pgroup_stat_table_path)
                                pgroup_stat_dict = pgroup_stat_table.iloc[0].to_dict()
                                if pgroup_stat_dict["N_Hotspot_communities"] > 0:
                                    results_data["hotspot_encoded"] = True
                                    results_data["N_hotspots"] = pgroup_stat_dict["N_Hotspot_communities"]

                                    results_data["individual_hotspot_pdfs"] = sorted(
                                        [f"lovis4u_hotspot_plots_full/{f}" for f in
                                         os.listdir(f"{folder_path}/lovis4u_hotspot_plots_full") if f.endswith(".pdf")],
                                        key=lambda x: int(re.search(r"r-(\d+)", x).group(1)) if re.search(r"r-(\d+)",
                                                                                                          x) else x)

                                    results_data["pdfs_with_all_islands"] = sorted(
                                        [f"lovis4u_hotspot_plots_with_query/{f}" for f in
                                         os.listdir(f"{folder_path}/lovis4u_hotspot_plots_with_query") if
                                         f.endswith(".pdf")],
                                        key=lambda x: int(re.search(r"r-(\d+)", x).group(1)) if re.search(r"r-(\d+)",
                                                                                                          x) else x)
                                    results_data["n_groups_plotted"] = len(results_data["pdfs_with_all_islands"])
                                else:
                                    results_data["hotspot_encoded"] = False
                            else:
                                results_data["hotspot_encoded"] = False
                    else:
                        results_data["homology_detected"], results_data["hotspot_encoded"] = False, False
                elif job.meta["ilund4u_mode"] == "genome":
                    mmseqs_stat_table_path = os.path.join(folder_path, "mmseqs_homology_search_full.tsv")
                    if os.path.exists(mmseqs_stat_table_path):
                        results_data["homology_detected"] = True
                        mmseqs_group_stat_table = pd.read_table(mmseqs_stat_table_path)
                        mmseqs_group_stat_table = mmseqs_group_stat_table.drop_duplicates(subset="query", keep="first")
                        pf_hits = mmseqs_group_stat_table["group"].to_list()
                        results_data["N_hom_hits"] = len(pf_hits)
                        available_hits = [hit for hit in pf_hits if
                                          hit in app.config["ilund4u-phages-protein_families"].index]
                        selected_columns = ["name", "db_hit", "domains", "N_Proteome_communities"]
                        proteome_annot_subset = app.config["ilund4u-phages-protein_families"].loc[
                            available_hits, selected_columns]
                        proteome_annot_subset.rename_axis("group", inplace=True)
                        mmseqs_group_stat_table.set_index("group", inplace=True)
                        proteome_annot_subset = proteome_annot_subset.join(
                            mmseqs_group_stat_table[["query", "raw", "fident", "evalue", "qcov", "tcov"]],
                            how="right")
                        proteome_annot_subset.reset_index(inplace=True)
                        proteome_annot_subset.rename(columns={"group": "Family", "name": "Name",
                                                              "N_Proteome_communities": "# Proteome communities"},
                                                     inplace=True)

                        proteome_annot_subset["evalue"] = proteome_annot_subset["evalue"].apply(lambda x: f"{x:.1e}")
                        proteome_annot_subset["qcov"] = proteome_annot_subset["qcov"].apply(lambda x: round(x, 2))
                        proteome_annot_subset["tcov"] = proteome_annot_subset["tcov"].apply(lambda x: round(x, 2))
                        cols = proteome_annot_subset.columns.tolist()
                        cols.insert(0, cols.pop(cols.index("query")))
                        proteome_annot_subset = proteome_annot_subset[cols]

                        if os.path.exists(os.path.join(folder_path, "query_protein_clusters.tsv")):
                            results_data["community_found"] = True
                            protein_classes_table = pd.read_table(
                                os.path.join(folder_path, "query_protein_clusters.tsv"))
                            results_data["n_pgroups"] = len(protein_classes_table.index)
                            class_counts = protein_classes_table["cds_class"].value_counts().reindex(
                                ["conserved", "intermediate", "variable"], fill_value=0)
                            results_data["class_counts"] = class_counts
                            cds_classes = {"labels": ["Conserved", "Intermediate", "Variable"],
                                           "data": [class_counts["conserved"], class_counts["intermediate"],
                                                    class_counts["variable"]]}
                            results_data["cds_classes"] = cds_classes
                            protein_classes_table.rename(columns={"cds_id": "query", "cds_class": "Class"},
                                                         inplace=True)
                            proteome_annot_subset = proteome_annot_subset.merge(protein_classes_table, on="query",
                                                                                how="right")
                            cols = proteome_annot_subset.columns.tolist()
                            cols.insert(2, cols.pop(cols.index("Class")))
                            proteome_annot_subset = proteome_annot_subset[cols]

                            community_table = pd.read_table(
                                os.path.join(folder_path, "similar_proteome_communities.tsv"))
                            community_table_dict = community_table.iloc[0].to_dict()
                            community_table_dict["com_id"] = int(community_table_dict["com_id"])
                            community_table_dict["com_size"] = int(community_table_dict["com_size"])
                            results_data.update(community_table_dict)

                        proteome_annot_subset["Family"] = proteome_annot_subset.apply(lambda row: (
                            f'<a href="/ilund4udb/phages/pf/{app.config["family_index_map"][row["Family"]]}">'
                            f'{row["Family"]}</a>' if row["Family"] in app.config[
                                "family_index_map"] else row["Family"]), axis=1)
                        proteome_annot_subset = proteome_annot_subset.to_html(
                            classes="table table-hover table-sm table-bordered", header="true", index=False,
                            table_id="pf_search_table", escape=False, border=0)
                        results_data["pf_search_table"] = proteome_annot_subset

                        locus_svg_path = os.path.join(folder_path, "lovis4u_query_proteome_classes.svg")
                        if os.path.exists(locus_svg_path):
                            results_data["locus_visualisation_found"] = True
                            results_data["locus_visualisation_classes_svg"] = "lovis4u_query_proteome_classes.svg"
                        else:
                            results_data["locus_visualisation_found"] = False

                    else:
                        results_data["homology_detected"] = False
        else:
            results = None
        return flask.render_template(f"{tool}_results.html", status=full_status, id=job.id, results=results,
                                     results_data=results_data)
    except rq.exceptions.NoSuchJobError:
        return flask.render_template("job_expired.html", tool=tool), 404


@app.route("/check-status/<id>")
def check_status(id):
    job = rq.job.Job.fetch(id, connection=redis_connection)
    return flask.jsonify(atkinsonlab_web.methods.get_full_job_status(job))


@app.route("/download_zip/<tool>/<id>")
def download_zip(id, tool):
    job = rq.job.Job.fetch(id, connection=redis_connection)
    archive_path = os.path.join(app.config["JOBS_FOLDER"], tool, "successful_jobs", job.id, job.result["archive"])
    headers = {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment;"
    }
    return flask.send_file(archive_path)


@app.route("/jobs/<tool>/<id>/<path:filepath>")
def getfile(id, tool, filepath):
    job = rq.job.Job.fetch(id, connection=redis_connection)
    if job.get_status(refresh=True) == "finished":
        subfolder = "successful_jobs"
    else:
        subfolder = ""
    if tool == "webflags":
        innerfolder = "FlaGs_output"
    elif tool == "ilund4u":
        innerfolder = job.meta["run_name"]
    else:
        innerfolder = ""
    return flask.send_from_directory(app.config["JOBS_FOLDER"],
                                     os.path.join(tool, subfolder, job.id, innerfolder, filepath))


@app.route("/files/<path:subdir>/<filename>")
def serve_file(subdir, filename):
    requested_dir = os.path.join(app.config["STATIC_FOLDER"], subdir)
    if not requested_dir.startswith(app.config["STATIC_FOLDER"]):
        flask.abort(403)  # Forbidden
    if not os.path.isdir(requested_dir):
        flask.abort(404)
    file_path = os.path.join(requested_dir, filename)
    if not os.path.exists(file_path):
        flask.abort(404)

    return flask.send_from_directory(requested_dir, filename)

@app.route("/ad4udb")
@auth.login_required
def ad4u_db():
    verified_gene_description = app.config["ad4udb-verified_gene_description"].set_index("db_protein_id")
    verified_gene_pairs = app.config["ad4udb-verified_gene_pairs"]
    gene_ids = verified_gene_description.index.to_list()
    verified_gene_dict = dict()
    for gene_id in gene_ids:
        verified_gene_dict[gene_id] = dict(defences = [])
        verified_gene_dict[gene_id].update(verified_gene_description.loc[gene_id].to_dict())
        gene_pairs = verified_gene_pairs[verified_gene_pairs["db_protein_id"] == gene_id]
        for _, row in gene_pairs.iterrows():
            verified_gene_dict[gene_id]["defences"].append(row.to_dict())
        
    return flask.render_template("ad4u_db.html", verified_gene_dict = verified_gene_dict, hide_header=True)

@app.route("/ad4udb/pc/<candidate_id>")
@auth.login_required
def ad4u_candidate(candidate_id):
    if candidate_id not in app.config["ad4udb-candidate_table"]["Protein id"].values:
        return flask.render_template("404.html"), 404
    candidate_data_dict = dict()
    candidate_row = app.config["ad4udb-candidate_table"][app.config["ad4udb-candidate_table"]["Protein id"] == candidate_id].iloc[0]
    candidate_data_dict.update(candidate_row.to_dict())
    candidate_data_dict["id_initial"] = app.config["ad4udb-candidate_ids"].loc[candidate_id, "id_initial"] 
    initial_id = candidate_data_dict["id_initial"]
    candidate_data_dict["fasta_sequence"] = ">{}\n{}".format(candidate_data_dict["id_initial"], str(app.config["ad4udb-candidate_seqs"][candidate_data_dict["id_initial"]].seq))
    
    candidate_data_dict["total_neighbours"] = app.config["ad4udb-candidate_ilund4u_stat"].loc[initial_id, "N_island_neighbours"]
    candidate_data_dict["ad_neighbours"] = app.config["ad4udb-candidate_ilund4u_stat"].loc[initial_id, "N_anti.defence_island_neighbours"]
    candidate_data_dict["ad_hotspot_fraction"] = app.config["ad4udb-candidate_ilund4u_stat"].loc[initial_id, "anti.defence_avg_cargo_fraction"]
    
    
    pfam_results = app.config["ad4udb-pfam_candidates"].query("query == @initial_id").drop(columns=["query"])
    pfam_results["E-value"] = pfam_results["E-value"].apply(lambda x: f"{x:.1e}")
    pfam_results["Pfam id"] = pfam_results["Pfam id"].apply(lambda x: f'<a href="https://www.ebi.ac.uk/interpro/entry/pfam/{x.split(".")[0]}" target="_blank">{x}</a>')
    if len(pfam_results.index) != 0:
        pfam_results = pfam_results.to_html(classes="table table-hover table-sm", header="true", index=False,
                                            table_id="pfam_results", escape=False, border=0)
    else:
        pfam_results = "NA"
    
    candidate_data_dict["DF_binding"] = [] 
    DF_pairs = app.config["ad4udb-candidate_vs_defence"].query("candidate == @candidate_id")
    DF_pairs = DF_pairs.sort_values(by="iptm_median", ascending=False).reset_index(drop=True)   
    candidate_data_dict["DF_binding_count"] = len(DF_pairs.index)
    
    for ind, row in DF_pairs.iterrows():
        row["ind"] = ind + 1
        row_dict = row.to_dict()
        row_dict.update(app.config["ad4udb-DF_ids"].loc[row["d_system"]].to_dict())
        row_dict["fasta_sequence"] = ">{}\n{}".format(row_dict["Record_id"], str(app.config["ad4udb-DF_seqs"][row_dict["Record_id"]].seq))
        candidate_data_dict["DF_binding"].append(row_dict)
        
            
    return flask.render_template("ad4u_db_candidate.html", candidate_id = candidate_id, candidate_dict = candidate_data_dict,
                                 pfam_results = pfam_results) 
    

@app.route("/ad4udb/df/<record_id>")
@auth.login_required
def ad4u_defence(record_id):
    if record_id not in app.config["ad4udb-defence_table"]["Defence protein id"].values:
        return flask.render_template("404.html"), 404
    defence_data_dict = dict()
    defence_row = app.config["ad4udb-defence_table"][app.config["ad4udb-defence_table"]["Defence protein id"] == record_id].iloc[0]
    defence_data_dict.update(defence_row.to_dict())
    defence_data_dict.update(app.config["ad4udb-DF_ids"].loc[defence_data_dict["Defence protein id"]].to_dict())
    
    defence_data_dict["fasta_sequence"] = ">{}\n{}".format(defence_data_dict["Record_id"], str(app.config["ad4udb-DF_seqs"][defence_data_dict["Record_id"]].seq))
    defence_data_dict["defence_components"] = app.config["ad4udb-DF_ids"][app.config["ad4udb-DF_ids"]["System ID"] == defence_data_dict["System ID"]]["Protein"].to_list()
    defence_data_dict["N_defence_components"] = len(defence_data_dict["defence_components"])
    defence_data_dict["defence_components_str"] = ", ".join(defence_data_dict["defence_components"])
    
    pfam_results = app.config["ad4udb-pfam_DF"].query("query == @defence_data_dict['Record_id']").drop(columns=["query"])
    pfam_results["E-value"] = pfam_results["E-value"].apply(lambda x: f"{x:.1e}")
    pfam_results["Pfam id"] = pfam_results["Pfam id"].apply(lambda x: f'<a href="https://www.ebi.ac.uk/interpro/entry/pfam/{x.split(".")[0]}" target="_blank">{x}</a>')
    if len(pfam_results.index) != 0:
        pfam_results = pfam_results.to_html(classes="table table-hover table-sm", header="true", index=False,
                                                table_id="pfam_results", escape=False, border=0)
    else:
        pfam_results = "NA"
    
    defence_data_dict["candidate_binding"] = []
    DF_pairs = app.config["ad4udb-candidate_vs_defence"].query("d_system == @record_id")
    DF_pairs = DF_pairs.sort_values(by="iptm_median", ascending=False).reset_index(drop=True)
    defence_data_dict["candidate_binding_count"] = len(DF_pairs.index)
    for ind, row in DF_pairs.iterrows():
        row["ind"] = ind + 1
        row_dict = row.to_dict()
        row_dict["candidate_full_id"] = app.config["ad4udb-candidate_ids"].loc[row["candidate"], "id_initial"]
        
        row_dict["fasta_sequence"] = ">{}\n{}".format(row_dict["candidate_full_id"], str(app.config["ad4udb-candidate_seqs"][row_dict["candidate_full_id"]].seq))
        defence_data_dict["candidate_binding"].append(row_dict)
    
    #return defence_data_dict
    return flask.render_template("ad4u_db_defence.html", record_id = record_id, defence_dict = defence_data_dict,
                                    pfam_results = pfam_results) 
    """
    
    candidate_data_dict["DF_binding"] = [] 
    DF_pairs = app.config["ad4udb-candidate_vs_defence"].query("candidate == @candidate_id")
    DF_pairs = DF_pairs.sort_values(by="iptm_median", ascending=False).reset_index(drop=True)   
    candidate_data_dict["DF_binding_count"] = len(DF_pairs.index)
    
    for ind, row in DF_pairs.iterrows():
        row["ind"] = ind + 1
        row_dict = row.to_dict()
        row_dict.update(app.config["ad4udb-DF_ids"].loc[row["d_system"]].to_dict())
        row_dict["fasta_sequence"] = ">{}\n{}".format(row_dict["Record_id"], str(app.config["ad4udb-DF_seqs"][row_dict["Record_id"]].seq))
        candidate_data_dict["DF_binding"].append(row_dict)
        
            
    return flask.render_template("ad4u_db_candidate.html", candidate_id = candidate_id, candidate_dict = candidate_data_dict,
                                 pfam_results = pfam_results) 
    """
@app.route("/ilund4udb")
def ilund4u_db():
    return flask.render_template("ilund4u_db.html", hide_header=True)

@app.route("/ilund4udb/<database>/pc/<community_index>")
def ilund4u_proteome_community(database, community_index):
    if database not in ["phages"]:
        return flask.render_template("404.html"), 404
    annotation_table = app.config["ilund4u-proteom_comminities"]
    if int(community_index) not in annotation_table.index:
        return flask.render_template("404.html"), 404
    annotation_dict = annotation_table.loc[int(community_index)].to_dict()

    # Get hotspot/hotspot com statistics
    cind_int = int(community_index)
    hotspot_stat_subset = app.config["ilund4u-hotspot_annotation"].query("proteome_community == @cind_int")
    annotation_dict["N_of_hotspots"] = len(hotspot_stat_subset.index)
    annotation_dict["N_of_uniq_islands"] = hotspot_stat_subset["number_of_unique_islands"].sum()
    hotspot_communities = hotspot_stat_subset["hotspot_community"].to_list()
    hcom_stat_subset = app.config["ilund4u-hcom_annotation"].loc[hotspot_communities]
    if len(hotspot_communities) != 0:
        annotation_dict["pdf_files"] = [f"/files/ilund4udb/lovis4u_hotspots/{pdf}" for pdf in
                                        hcom_stat_subset["pdf_filename"].to_list()]
        annotation_dict["pdf_preview"] = annotation_dict["pdf_files"][0] if annotation_dict["pdf_files"] else None
        annotation_dict["hcom_data_complete"] = True
        hcoms_list = [int(x) for x in hotspot_communities]
        hcom_full_list_subset = app.config["ilund4u-hcom_annotation"][
            app.config["ilund4u-hcom_annotation"]["N_cargo_groups"] >= 30]
        hotspot_communities_f = [hc for hc in hotspot_communities if hc in hcom_full_list_subset.index]
        if len(hotspot_communities_f) == 0:
            annotation_dict["hcom_data_complete"] = False
            hcom_distribution_plot_data = None
        else:
            hcom_stat_subset = hcom_full_list_subset.loc[hotspot_communities_f]
            columns_to_process = ["defence_cargo_normalised", "virulence_cargo_normalised",
                                  "anti_defence_cargo_normalised",
                                  "AMR_cargo_normalised"]
            hcom_distribution_plot_data = {"background": {}, "selected": {}}
            for col in columns_to_process:
                max_value = hcom_stat_subset[col].max()
                max_value_percentile = (hcom_full_list_subset[col].rank(pct=True) * 100).loc[
                    hcom_full_list_subset[col] == max_value].values[0]
                annotation_dict[col] = {"max_value": max_value, "percentile": round(max_value_percentile, 2)}
                hcom_distribution_plot_data["background"][col] = hcom_full_list_subset[col].tolist()
                hcom_distribution_plot_data["selected"][col] = hcom_stat_subset[col].tolist()
    else:
        annotation_dict["hcom_data_complete"] = False
        hcom_distribution_plot_data = None

    # Get proteome annotation table data
    proteomes = annotation_dict.pop("proteomes").split(";")
    lookup = {orig: orig.rstrip("_") for orig in proteomes}
    phage_meta_raw = app.config["phagescope_meta"]
    cleaned_ids = list(set(lookup.values()))  # unique cleaned IDs
    phagescope_meta_subset = phage_meta_raw.loc[cleaned_ids]
    phagescope_meta_subset = phagescope_meta_subset.rename(
        index={v: k for k, v in lookup.items() if v in phagescope_meta_subset.index})
    host_counts = phagescope_meta_subset["Host"].value_counts()
    annotation_dict["host_labels"] = host_counts.index.tolist()
    annotation_dict["host_values"] = host_counts.values.tolist()
    proteome_annot_subset = app.config["ilund4u-proteome_annotation"].loc[proteomes]
    merged_proteome_data = pd.merge(proteome_annot_subset, phagescope_meta_subset, left_index=True, right_index=True,
                                    how="inner")[["p_size", "length", "n_islands", "n_hotspots", "Host"]]
    merged_proteome_data = merged_proteome_data.rename(columns={"p_size": "Proteome size", "length": "Genome Length",
                                                                "n_islands": "# Islands", "n_hotspots": "# Hotspots",
                                                                "Host": "Host"})
    merged_proteome_data.reset_index(inplace=True)
    merged_proteome_data.rename(columns={"index": "Proteome"}, inplace=True)
    merged_proteome_data["Proteome"] = merged_proteome_data.apply(
        lambda row: f'<a href="/ilund4udb/phages/p/'
                    f'{app.config["proteome_index_map"].get(row["Proteome"], 0)}"'
                    f'>{row["Proteome"]}</a>', axis=1)
    merged_proteome_data = merged_proteome_data.to_html(classes="table table-hover table-sm table-bordered",
                                                        header="true",
                                                        index=False,
                                                        table_id="proteome_data", escape=False, border=0)
    return flask.render_template("ilund4u_proteome_community.html", community_id=community_index,
                                 annotation_dict=annotation_dict, merged_proteome_data=merged_proteome_data,
                                 hcom_distribution_plot_data=hcom_distribution_plot_data)


@app.route("/ilund4udb/<database>/p/<proteome_index>")
def ilund4u_proteome(database, proteome_index):
    if database not in ["phages"]:
        return flask.render_template("404.html"), 404
    table = app.config["ilund4u-proteome_annotation"]
    n_entries = len(table.index)
    if int(proteome_index) >= n_entries:
        return flask.render_template("404.html"), 404

    # Get proteome annotation table data
    table_row = table.iloc[int(proteome_index)]
    proteome_data_dict = table.iloc[int(proteome_index)].to_dict()
    proteome_id = table_row.name
    lovis4u_locus_svg = f"/files/ilund4udb/lovis4u_figures_svg/{proteome_id}.svg"
    try:
        meta_dict = app.config["phagescope_meta"].loc[proteome_id.strip("_")].to_dict()
        proteome_data_dict.update(meta_dict)
    except:
        proteome_data_dict["Host"] = "NA"
    # Get proteome composition:
    cds_classes = {"labels": ["Conserved", "Intermediate", "Variable"],
                   "data": [proteome_data_dict["conserved"], proteome_data_dict["intermediate"],
                            proteome_data_dict["variable"]]}

    # Get protein groups of the proteome
    cds_groups_table = pd.read_table(os.path.join(app.config["STATIC_FOLDER"],
                                                  "ilund4udb/IndProteomeTables", f"{proteome_id}.tsv"))
    cds_groups_table.fillna("-", inplace=True)
    cds_groups_table["protein_family"] = cds_groups_table.apply(
        lambda row: f'<a href="/ilund4udb/phages/pf/{row["family_index"]}">{row["protein_family"]}</a>', axis=1)
    cds_groups_table.drop(columns=["family_index"], inplace=True)
    cds_groups_table.columns = [
        "Family", "Name", "Class", "Presence", "HMMscan DB",
        "HMMscan hit", "Pfam Domains", "Topology", "# Proteome communities",
        "# Hotspot communities", "DGS quantile"]
    cds_groups_table = cds_groups_table.to_html(classes="table table-hover table-sm table-bordered", header="true",
                                                index=False,
                                                table_id="cds_groups", escape=False, border=0)

    return flask.render_template("ilund4u_proteome.html", proteome_id=proteome_id,
                                 proteome_data_dict=proteome_data_dict, lovis4u_locus_svg=lovis4u_locus_svg,
                                 cds_classes=json.dumps(cds_classes), cds_groups_table=cds_groups_table)


@app.route("/ilund4udb/<database>/pf/<family_index>")
def ilund4u_family(database, family_index):
    if database not in ["phages"]:
        return flask.render_template("404.html"), 404
    table = app.config[f"ilund4u-{database}-protein_families"]
    n_entries = len(table.index)
    if int(family_index) >= n_entries:
        return flask.render_template("404.html"), 404

    # Get family annotation table data
    table_row = table.iloc[int(family_index)]
    family_data_dict = table.iloc[int(family_index)].to_dict()
    family_id = table_row.name
    seq_record = app.config["ilund4u-phages-representative_fasta"][family_id]
    family_data_dict["fasta_sequence"] = ">{}\n{}".format(seq_record.id, seq_record.seq)
    family_data_dict["seq_length"] = len(seq_record.seq)
    community_classes = {
        "labels": ["Conserved", "Intermediate", "Variable"],
        "data": [family_data_dict["conserved"], family_data_dict["intermediate"], family_data_dict["variable"]]
    }
    family_data_dict["total_num_of_communities"] = sum([family_data_dict["conserved"], family_data_dict["intermediate"],
                                                        family_data_dict["variable"]])
    family_data_dict["N_island_neighbours_with_hits"] = sum([family_data_dict["N_defence_island_neighbours"],
                                                             family_data_dict["N_anti-defence_island_neighbours"],
                                                             family_data_dict["N_virulence_island_neighbours"],
                                                             family_data_dict["N_AMR_island_neighbours"]])
    family_data_dict["N_island_neighbours_others"] = family_data_dict["N_island_neighbours"] - family_data_dict[
        "N_island_neighbours_with_hits"]
    island_neighbours = {"labels": ["Defence", "Anti-defence", "Virulence", "AMR", "Others"],
                         "data": [family_data_dict["N_defence_island_neighbours"],
                                  family_data_dict["N_anti-defence_island_neighbours"],
                                  family_data_dict["N_virulence_island_neighbours"],
                                  family_data_dict["N_AMR_island_neighbours"],
                                  family_data_dict["N_island_neighbours_others"]]}
    # Get hmmscan results
    hmmscan_results = app.config["ilund4u-phages-hmmscan_results"].query("query == @family_id").drop(
        columns=["query", "qlen", "db_class", "t_name", "t_description", "di_evalue"])
    hmmscan_results["hit_evalue"] = hmmscan_results["hit_evalue"].apply(lambda x: f"{x:.1e}")
    if len(hmmscan_results.index) != 0:
        hmmscan_results = hmmscan_results.to_html(classes="table table-hover table-sm", header="true", index=False,
                                                  table_id="hmmscan_results", escape=False, border=0)
    else:
        hmmscan_results = "NA"

    pfam_results = app.config["ilund4u-phages-pfam_results"].query("query == @family_id").drop(
        columns=["query"])
    pfam_results["E-value"] = pfam_results["E-value"].apply(lambda x: f"{x:.1e}")
    pfam_results["Pfam id"] = pfam_results["Pfam id"].apply(
        lambda x: f'<a href="https://www.ebi.ac.uk/interpro/entry/pfam/{x.split(".")[0]}" target="_blank">{x}</a>')

    if len(pfam_results.index) != 0:
        pfam_results = pfam_results.to_html(classes="table table-hover table-sm", header="true", index=False,
                                            table_id="pfam_results", escape=False, border=0)
    else:
        pfam_results = "NA"

    # Get hcom data
    hcoms_list = family_data_dict["hcoms"].strip().split(',') if isinstance(family_data_dict["hcoms"], str) else []
    family_data_dict["filtered_hcom_num"] = len(hcoms_list)
    hcom_distribution_plot_data = "NA"
    family_data_dict["hcom_data_complete"] = False
    if len(hcoms_list) != 0:
        hcoms_list = [int(x) for x in hcoms_list]
        hcom_full_list_subset = app.config["ilund4u-hcom_annotation"][
            app.config["ilund4u-hcom_annotation"]["N_cargo_groups"] >= 50]
        hcoms_list_f = [hc for hc in hcoms_list if hc in hcom_full_list_subset.index]
        hcom_stat_subset = hcom_full_list_subset.loc[hcoms_list_f]
        if len(hcom_stat_subset.index) != 0:
            family_data_dict["hcom_data_complete"] = True
            columns_to_process = ["defence_cargo_normalised", "virulence_cargo_normalised",
                                  "anti_defence_cargo_normalised", "AMR_cargo_normalised"]
            hcom_distribution_plot_data = {"background": {}, "selected": {}}
            for col in columns_to_process:
                max_value = hcom_stat_subset[col].max()
                max_value_percentile = (hcom_full_list_subset[col].rank(pct=True) * 100).loc[
                    hcom_full_list_subset[col] == max_value].values[0]
                family_data_dict[col] = {
                    "max_value": max_value,
                    "percentile": round(max_value_percentile, 2)
                }
                hcom_distribution_plot_data["background"][col] = hcom_full_list_subset[col].tolist()
                hcom_distribution_plot_data["selected"][col] = hcom_stat_subset[col].tolist()

    # Defence score
    pf_table = app.config[f"ilund4u-{database}-protein_families"]
    family_data_dict["DS_bakcground"] = pf_table["defence_score"].dropna().to_list()
    family_data_dict["DS_of_defence"] = pf_table[pf_table["db"] == "defence"].defence_score.dropna().to_list()
    if pd.notna(family_data_dict["defence_score_quantile"]):
        family_data_dict["DS_data_complete"] = True
        family_data_dict["DS_percentile"] = round(family_data_dict["defence_score_quantile"] * 100, 2)
    else:
        family_data_dict["DS_data_complete"] = False

    # get taxinfo
    # taxinfo_family = app.config["ilund4u-taxinfo"].query(f"pid == @family_id").drop(columns=["pid"])
    # if len(taxinfo_family.index) > 0:
    #    family_data_dict["taxinfo_data_complete"] = True
    # else:
    #    family_data_dict["taxinfo_data_complete"] = False
    taxinfo_family = pd.DataFrame()
    family_data_dict["taxinfo_data_complete"] = False  # NOT UPDATED!

    # get pdb and foldseek results
    putative_path_to_pdb = os.path.join((os.path.join(app.config["STATIC_FOLDER"], "ilund4udb",
                                                      "PhageRepProteins_ESM_fold")), f"{family_id}.pdb")
    if os.path.exists(putative_path_to_pdb):
        pdb_path = f"/static/ilund4udb/PhageRepProteins_ESM_fold/{family_id}.pdb"
        esm_fold_stat = app.config["ilund4u-esmfold_stat"].loc[family_id].to_dict()
        family_data_dict["avg_pLDDT"] = round(esm_fold_stat["Average_pLDDT"], 1)
    else:
        pdb_path = "NA"
        foldseek_search = "NA"
    if pdb_path != "NA":
        foldseek_search = app.config["ilund4u-bfvd_foldseeksearch"].query(f"query == @family_id").drop(
            columns=["query", "qlen"])
        if len(foldseek_search) != 0:
            foldseek_search["evalue"] = foldseek_search["evalue"].apply(lambda x: f"{x:.1e}")
            foldseek_search["target"] = foldseek_search["target"].apply(
                lambda x: f'<a href="https://bfvd.foldseek.com/cluster/{x}" target="_blank">{x}</a>')
            foldseek_search = foldseek_search.to_html(classes="table table-hover table-sm", header="true", index=False,
                                                      table_id="foldseek_search", escape=False, border=0)
        else:
            foldseek_search = "NA"

    # Get phage genomes
    pf_locations = app.config["ilund4u-protein_family_to_phage"].query(f"group == @family_id").drop(columns=["group"])
    phage_table = app.config["ilund4u-proteome_annotation"]
    phage_subtable = phage_table[["proteome_community", "length"]]
    pf_locations = pf_locations.merge(phage_subtable, how="left", left_on="proteome_id", right_index=True)
    phage_meta_subtable = app.config["phagescope_meta"][["Host"]]
    pf_locations = pf_locations.merge(phage_meta_subtable, how="left", left_on="proteome_id", right_index=True)
    pf_locations["proteome_id"] = pf_locations.apply(
        lambda row: f'<a href="/ilund4udb/phages/p/'
                    f'{app.config["proteome_index_map"].get(row["proteome_id"], 0)}"'
                    f'>{row["proteome_id"]}</a>', axis=1)

    pf_locations["proteome_community"] = pf_locations.apply(
        lambda row: f'<a href="/ilund4udb/phages/pc/{row["proteome_community"]}">{row["proteome_community"]}</a>',
        axis=1)

    pf_locations = pf_locations[["proteome_id", "Host", "proteome_community", "length", "start", "end", "type"]].rename(
        columns={"proteome_id": "Proteome", "proteome_community": "Proteome community", "length": "Proteome Length",
                 "start": "Start", "end": "End", "type": "Type"})

    pf_locations = pf_locations.to_html(classes="table table-hover table-sm", header="true", index=False,
                                        table_id="pf_locations", escape=False, border=0)

    return flask.render_template("ilund4u_family.html", family_id=family_id, family_data_dict=family_data_dict,
                                 community_classes=json.dumps(community_classes), hmmscan_results=hmmscan_results,
                                 pfam_results=pfam_results,
                                 island_neighbours=json.dumps(island_neighbours),
                                 taxinfo=taxinfo_family.to_json(orient="records"),
                                 hcom_distribution_plot_data=json.dumps(hcom_distribution_plot_data),
                                 pdb_path=pdb_path, foldseek_search=foldseek_search, pf_locations=pf_locations)


@app.route("/netflax", methods=["GET"])
def netflax():
    version = flask.request.args.get("version", "pruned")
    if version != "pruned" and version != "unpruned":
        version = "pruned"
    netflax_nodes = sorted(
        [i[:-4] for i in os.listdir(os.path.join(app.config["STATIC_FOLDER"], "tables", "netflax_tables"))],
        key=atkinsonlab_web.methods.sort_by_number)
    if version == "pruned":
        with open(os.path.join(app.config["STATIC_FOLDER"], "txt", "netflax_pruned.txt"), "r") as f:
            not_included = [line.strip() for line in f.readlines()]
        netflax_nodes = [i for i in netflax_nodes if i not in not_included]
    return flask.render_template("netflax.html", netflax_nodes=netflax_nodes, version=version)


@app.route("/netflax/<node>")
def netflax_node(node):
    try:
        table = pd.read_table(os.path.join(app.config["STATIC_FOLDER"], "tables", "netflax_tables", f"{node}.tsv"),
                              sep="\t")
        table.columns = ["Taxa/Species", "Toxin", "Antitoxin", "AlphaFold2 pDockQ score"]
        table[''] = '<a  href="#" class="details-control text-decoration-none">Show structure</a>'
        table = table.to_html(classes="table table-hover", header="true", index=False,
                              table_id="myTable", escape=False, border=0)
        with open(os.path.join(app.config["STATIC_FOLDER"], "json", "netflax", f"{node}.json")) as f:
            json_data = json.load(f)
        with open(os.path.join(app.config["STATIC_FOLDER"], "txt", "netflax", f"{node}.txt")) as f:
            protein_clusters = f.read().strip()
        return flask.render_template("netflax_node.html", node=node, table=table, json_data=json_data,
                                     protein_clusters=protein_clusters)
    except:
        return flask.render_template("404.html"), 404


@app.errorhandler(404)
def page_not_found(error):
    return flask.render_template("404.html"), 404
