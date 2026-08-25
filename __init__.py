import flask

import dotenv
import redis
import json
import rq
import pandas as pd
import rq_scheduler
import os
import Bio.SeqIO

app = flask.Flask(__name__)
app.config["STATIC_FOLDER"] = os.path.join(os.path.dirname(__file__), "static")
app.config["JOBS_FOLDER"] = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, "jobs"))
app.config["TOOLS"] = ["uorf4u", "msa4u", "webflags", "ilund4u"]

env_config = dotenv.dotenv_values(".env")
app.config["MAINTENANCE_MODE"] = int(env_config["maintenance_mode"])
app.config["QUEUE_KEY"] = env_config["queue_pass"]
app.config["EMAIL_PASS"] = env_config["email_pass"]
app.config["FLAGS_PATH"] = env_config["flags_path"]
app.config["RESULTS_TTL"] = "120h"

from werkzeug.security import generate_password_hash
app.config["PAGE_PASS_HASH"] = generate_password_hash(env_config["page_pass"])

if not app.config["MAINTENANCE_MODE"]:
    app.config["DEFAULT_FORM_uorf4u"] = json.load(
        open(os.path.join(app.config["STATIC_FOLDER"], "json/uorf4u_form.json")))
    app.config["DEFAULT_FORM_msa4u"] = json.load(
        open(os.path.join(app.config["STATIC_FOLDER"], "json/msa4u_form.json")))
    app.config["DEFAULT_FORM_webflags"] = json.load(
        open(os.path.join(app.config["STATIC_FOLDER"], "json/webflags_form.json")))
    app.config["DEFAULT_FORM_ilund4u"] = json.load(
        open(os.path.join(app.config["STATIC_FOLDER"], "json/ilund4u_form.json")))

    # iLund4uDB data loading
    protein_stat_table = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/protein_stat_phages_scol_with_classes_and_hcom_web.tsv"),
        low_memory=False).set_index("representative_protein")
    protein_stat_table = protein_stat_table[protein_stat_table["N_Hotpot_islands"] > 0]

    app.config["ilund4u-phages-protein_families"] = protein_stat_table
    app.config["family_index_map"] = {family: i for i, family in
                                      enumerate(app.config["ilund4u-phages-protein_families"].index)}

    # db tables
    protein_families_list_iLund4u_DB = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/protein_families_list_iLund4u_DB.tsv"), low_memory=False)
    protein_families_list_iLund4u_DB["Family"] = (protein_families_list_iLund4u_DB.apply(lambda row: (
        f'<a href="/ilund4udb/phages/pf/{row.name}" target="_blank">{row["Family"]}</a>'), axis=1))
    protein_families_list_iLund4u_DB.rename(columns={"Family": "Cluster"}, inplace=True)
    protein_families_list_iLund4u_DB.sort_values(by="# Hotspot com.", ascending=False, inplace=True)
    protein_families_list_iLund4u_DB = protein_families_list_iLund4u_DB.where(
        pd.notna(protein_families_list_iLund4u_DB),
        "-")
    app.config["ilund4udb_phage_protein_families"] = protein_families_list_iLund4u_DB

    phage_list_iLund4u_DB = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/phage_list_iLund4u_DB.tsv"), low_memory=False)

    phage_list_iLund4u_DB["ID"] = (phage_list_iLund4u_DB.apply(lambda row: (
        f'<a href="/ilund4udb/phages/p/{row.name}" target="_blank">{row["ID"]}</a>'), axis=1))
    phage_list_iLund4u_DB["Proteome Community"] = (phage_list_iLund4u_DB.apply(lambda row: (
        f'<a href="/ilund4udb/phages/pc/{row["Proteome Community"]}" target="_blank">{row["Proteome Community"]}</a>'),
                                                                               axis=1))
    phage_list_iLund4u_DB = phage_list_iLund4u_DB.where(pd.notna(phage_list_iLund4u_DB), "-")
    app.config["ilund4udb_phages"] = phage_list_iLund4u_DB

    app.config["ilund4u-phages-representative_fasta"] = Bio.SeqIO.to_dict(
        Bio.SeqIO.parse(os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/representative_seqs_phages.fa"), "fasta"))
    app.config["ilund4u-phages-hmmscan_results"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/phage_proteins_hmmscan_merged.tsv"), low_memory=False)
    app.config["ilund4u-phages-pfam_results"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/pfam_search_phage_proteins.tsv"), low_memory=False)
    hcom_annotation = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/hotspot_community_annotation.tsv"),
        low_memory=False).set_index("com_id")
    hcom_annotation.rename(columns={'anti-defence_cargo_normalised': 'anti_defence_cargo_normalised'}, inplace=True)
    app.config["ilund4u-hcom_annotation"] = hcom_annotation
    app.config["ilund4u-hotspot_annotation"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/hotspot_annotation.tsv")).set_index("hotspot_id")

    app.config["ilund4u-esmfold_stat"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/esmfold_pdb_statistics.tsv")).set_index("Sequence_ID")
    app.config["ilund4u-bfvd_foldseeksearch"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/PhageProteinsVersusBFVD.tsv"))
    # app.config["ilund4u-taxinfo"] = pd.read_table(
    #    os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/taxinfo_family_level_filtered.tsv"))
    app.config["ilund4u-proteome_annotation"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/phage_proteome_annotation.tsv")).set_index("id")
    app.config["proteome_index_map"] = {proteome: i for i, proteome in
                                        enumerate(app.config["ilund4u-proteome_annotation"].index)}
    app.config["phagescope_meta"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/PhageScope_merged_meta.tsv"),
        low_memory=False).set_index("Phage_ID")
    app.config["ilund4u-protein_family_to_phage"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/protein_family_to_phages.tsv"))
    app.config["ilund4u-proteom_comminities"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ilund4udb/proteome_communities.tsv")).set_index("id")
    
    # ad4udb data loading
    app.config["ad4udb-verified_gene_description"] = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/experimentally_verified_systems_description.csv"), sep=",")
    app.config["ad4udb-verified_gene_pairs"] = pd.read_table(
            os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/experimentally_verified_systems.csv"), sep=",")
    
    app.config["ad4udb-candidate_ids"] = pd.read_table(
                os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/candidate_id_dict.tsv"), sep="\t").set_index("id_lower")
    app.config["ad4udb-DF_ids"] = pd.read_table(
                os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/DF_gene_names.tsv"), sep="\t").set_index("Record_id_lower")
    app.config["ad4udb-candidate_table"] = pd.read_table(
                    os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/candidate_table_hits.tsv"), sep="\t")
    app.config["ad4udb-candidate_ilund4u_stat"] = pd.read_table(
                    os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/novel_list_put_anti_d_families_V2_jan26.tsv"), sep="\t").set_index("representative_protein")
    app.config["ad4udb-defence_table"] = pd.read_table(
                        os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/defence_table_hits.tsv"), sep="\t")
    app.config["ad4udb-candidate_vs_defence"] = pd.read_table(
                            os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/Candidate_and_Defence_stat.tsv"), sep="\t")
    app.config["ad4udb-models_scores"] = pd.read_table(
                            os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/All_model_scores_DF.tsv"), sep="\t")
    app.config["ad4udb-candidate_seqs"] = Bio.SeqIO.to_dict(
            Bio.SeqIO.parse(os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/Candidate_sequences.fa"), "fasta"))
    app.config["ad4udb-DF_seqs"] = Bio.SeqIO.to_dict(
            Bio.SeqIO.parse(os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/DF_sequences.fa"), "fasta"))
    app.config["ad4udb-pfam_candidates"] = pd.read_table(
                            os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/pfam_annot_candidates.tsv"), sep="\t")
    app.config["ad4udb-pfam_DF"] = pd.read_table(
                            os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/pfam_annot_DF.tsv"), sep="\t")
    
    #db table
    phage_protein_binders = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/candidate_table_hits.tsv"), low_memory=False)
    phage_protein_binders["Protein id"] = (phage_protein_binders.apply(lambda row: (
        f'<a href="/ad4udb/pc/{row["Protein id"]}" target="_blank">{row["Protein id"]}</a>'), axis=1))
    app.config["ad4udb-phage_protein_families"] = phage_protein_binders
    
    defence_proteins = pd.read_table(
        os.path.join(app.config["STATIC_FOLDER"], "ad4udb/Data/defence_table_hits.tsv"), low_memory=False)
    defence_proteins["Defence protein id"] = (defence_proteins.apply(lambda row: (
        f'<a href="/ad4udb/df/{row["Defence protein id"]}" target="_blank">{row["Defence protein id"]}</a>'), axis=1))
    app.config["ad4udb-defence_proteins"] = defence_proteins
    
redis_connection = redis.Redis()

queues = dict(uorf4u_standard=rq.Queue(name="uorf4u_standard", connection=redis_connection),
              uorf4u_prioritised=rq.Queue(name="uorf4u_prioritised", connection=redis_connection),
              msa4u=rq.Queue(name="msa4u", connection=redis_connection),
              webflags_prioritised=rq.Queue(name="webflags_prioritised", connection=redis_connection),
              webflags_standard=rq.Queue(name="webflags_standard", connection=redis_connection),
              ilund4u_standard=rq.Queue(name="ilund4u_standard", connection=redis_connection),
              helper=rq.Queue(name="helper", connection=redis_connection))
scheduler = rq_scheduler.Scheduler(queue=queues["helper"], connection=redis_connection)

from . import routes
from . import methods
from . import form_validation
from . import applications
from . import enqueuing

if not app.config["MAINTENANCE_MODE"]:
    app.config["DEMO_FORM_uorf4u"] = methods.uorf4u_demo_form()
    app.config["DEMO_FORM_msa4u"] = methods.msa4u_demo_form()
    app.config["DEMO_FORM_webflags"] = methods.webflags_demo_form()
