import subprocess
import Bio.SeqRecord
import Bio.Seq
import traceback
import datetime
import shutil
import uorf4u
import msa4u
import flask
import copy
import time
import json
import sys
import re
import io
import os
import rq

import atkinsonlab_web.methods
from atkinsonlab_web import app
from atkinsonlab_web import queues
import atkinsonlab_web.routes


def run_uorf4u(processed_arguments):
    try:
        job = rq.get_current_job()
        job_folder = os.path.join(app.config["JOBS_FOLDER"], "uorf4u", job.id)
        results_dict = dict()
        if not os.path.isdir(job_folder):
            os.mkdir(job_folder)
        job_request_file_folder = os.path.join(job_folder, "request_file")
        if not os.path.isdir(job_request_file_folder):
            os.mkdir(job_request_file_folder)
        with open(os.path.join(job_request_file_folder, "request.json"), "w") as request_json:
            json.dump({k: v for k, v in processed_arguments.items() if not isinstance(v, io.StringIO)}, request_json)
        for k, f in {k: v for k, v in processed_arguments.items() if isinstance(v, io.StringIO)}.items():
            file_path = os.path.join(job_request_file_folder, f.filename)
            with open(file_path, "w") as rf:
                rf.write(f.getvalue())
                f.close()
            processed_arguments[k] = file_path

        log_file_path = os.path.join(job_folder, "log.txt")
        log_file = io.StringIO()
        sys.stdout = log_file
        sys.stderr = log_file

        parameters = uorf4u.manager.Parameters()
        parameters.arguments["ncbi_entrez_api_key"] = "4e86f511aeb81a91767e8ab71dd6aa6caa09"
        parameters.arguments["debug"] = True
        if processed_arguments["config"] == "uploaded":
            parameters.load_config(processed_arguments["config_file"])
        else:
            parameters.load_config(processed_arguments["config"])

        parameters.arguments.update({k: v for k, v in processed_arguments.items() if k not in ["accept", "email",
                                                                                               "run_name", "queue_pass",
                                                                                               "config"]})
        processed_arguments["run_name"] = processed_arguments["run_name"].replace("{current_date}",
                                                                                  time.strftime("%Y_%m_%d-%H_%M"))
        job.meta["run_name"] = processed_arguments["run_name"]
        parameters.arguments["output_dir"] = os.path.join(job_folder, processed_arguments["run_name"])
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        if "fasta" not in parameters.arguments.keys():
            if "accession_number" in parameters.arguments.keys():
                refseq_protein = uorf4u.data_processing.RefSeqProtein(
                    accession_number=parameters.arguments['accession_number'],
                    parameters=parameters)
                atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
                homologues_list = refseq_protein.blastp_searching_for_homologues()
                atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
            if "homologues_list" in parameters.arguments.keys():
                homologues_list = parameters.arguments["homologues_list"]

            homologues = uorf4u.data_processing.Homologues(homologues_list, parameters)
            atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
            upstream_sequences_records = homologues.get_upstream_sequences()
            atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        else:
            upstream_sequences_records = uorf4u.methods.parse_fasta_file(parameters.arguments['fasta'], parameters)

        upstream_seqs = uorf4u.data_processing.UpstreamSequences(upstream_sequences_records, parameters)
        upstream_seqs.save_upstream_sequences()
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        upstream_seqs.annotate_orfs()
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        if parameters.arguments["filter_by_sd"]:
            upstream_seqs.filter_orfs_by_sd_annotation()
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        upstream_seqs.save_annotated_orfs()
        upstream_seqs.conserved_orf_searching()
        upstream_seqs.filter_out_similar_paths()
        upstream_seqs.run_msa()
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        upstream_seqs.save_orfs_sequences()
        upstream_seqs.save_msa()
        upstream_seqs.save_results_summary_table()
        upstream_seqs.plot_annotation()
        upstream_seqs.plot_logo_figs()
        upstream_seqs.plot_msa_figs()
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        results_dict["archive"] = os.path.basename(f"{parameters.arguments['output_dir']}.zip")
        shutil.make_archive(base_name=job_folder, format="zip", root_dir=job_folder)
        shutil.move(f"{job_folder}.zip", f"{parameters.arguments['output_dir']}.zip")
        with open(log_file_path, "w") as lf:
            lf.write(log_file.getvalue())
            log_file.close()
    except SystemExit:
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        results_dict["archive"] = os.path.basename(f"{parameters.arguments['output_dir']}.zip")
        shutil.make_archive(base_name=job_folder, format="zip", root_dir=job_folder)
        shutil.move(f"{job_folder}.zip", f"{parameters.arguments['output_dir']}.zip")
    except Exception as e:
        with open(os.path.join(job_folder, "traceback.txt"), "w") as traceback_f:
            traceback_f.write(traceback.format_exc())
        for i in ((traceback.format_exc()).split('\n')):
            if 'uORF4uError:' in i:
                print(f"uORF4uError 💔: {i.split(':')[1]}", file=sys.stderr)
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        raise e

    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__
    return results_dict


def uorf4u_on_success(job, connection, result, *args, **kwargs):
    job_folder = os.path.join(app.config["JOBS_FOLDER"], "uorf4u", job.id)
    success_folder = os.path.join(app.config["JOBS_FOLDER"], "uorf4u", "successful_jobs", job.id)
    shutil.move(job_folder, success_folder)
    request_email = job.args[0]["email"]
    atkinsonlab_web.methods.send_email(os.path.join(app.config['STATIC_FOLDER'], "email", "uorf4u_job_finished.html"),
                                       request_email,
                                       f"https://server.atkinson-lab.com/results/uorf4u/{job.id}",
                                       job.meta["run_name"],
                                       "uORF4u results")
    cleaning_job = queues["helper"].enqueue_in(datetime.timedelta(hours=int(app.config["RESULTS_TTL"][:-1])),
                                               atkinsonlab_web.methods.remove_results, success_folder)
    return None


def uorf4u_on_failure(job, connection, type, value, traceback):
    job_folder = os.path.join(app.config["JOBS_FOLDER"], "uorf4u", job.id)
    failure_folder = os.path.join(app.config["JOBS_FOLDER"], "uorf4u", "failed_jobs", job.id)
    shutil.move(job_folder, failure_folder)
    request_email = job.args[0]["email"]
    atkinsonlab_web.methods.send_email(os.path.join(app.config['STATIC_FOLDER'], "email", "uorf4u_job_failed.html"),
                                       request_email,
                                       f"https://server.atkinson-lab.com/results/uorf4u/{job.id}",
                                       job.meta["run_name"],
                                       "uORF4u results")

    cleaning_job = queues["helper"].enqueue_in(datetime.timedelta(hours=int(app.config["RESULTS_TTL"][:-1])),
                                               atkinsonlab_web.methods.remove_results, failure_folder)

    return None


def run_msa4u(processed_arguments):
    try:
        job = rq.get_current_job()
        job_folder = os.path.join(app.config["JOBS_FOLDER"], "msa4u", job.id)
        log_file_path = os.path.join(job_folder, "log.txt")
        log_file = io.StringIO()
        sys.stdout = log_file
        sys.stderr = log_file

        results_dict = dict()
        if not os.path.isdir(job_folder):
            os.mkdir(job_folder)
        job_request_file_folder = os.path.join(job_folder, "request_files")
        if not os.path.isdir(job_request_file_folder):
            os.mkdir(job_request_file_folder)
        with open(os.path.join(job_request_file_folder, "request.json"), "w") as request_json:
            json.dump({k: v for k, v in processed_arguments.items() if not isinstance(v, io.StringIO)}, request_json)
        for k, f in {k: v for k, v in processed_arguments.items() if isinstance(v, io.StringIO)}.items():
            file_path = os.path.join(job_request_file_folder, f.filename)
            with open(file_path, "w") as rf:
                rf.write(f.getvalue())
                f.close()
            processed_arguments[k] = file_path

        parameters = msa4u.manager.Parameters(api=False)
        if "config_file" in processed_arguments.keys():
            parameters.load_config(processed_arguments["config_file"])
        else:
            parameters.load_config()

        if processed_arguments["run_name"] == "auto":
            if "fasta" in processed_arguments.keys():
                processed_arguments["run_name"] = os.path.basename(processed_arguments["fasta"])
            if "alignments" in processed_arguments.keys():
                processed_arguments["run_name"] = os.path.basename(processed_arguments["alignments"])
        job.meta["run_name"] = processed_arguments["run_name"]
        parameters.arguments["label"] = processed_arguments["label"]
        if "fasta" in processed_arguments.keys():
            aln_filename = os.path.join(job_folder,
                                        f"{os.path.splitext(os.path.basename(processed_arguments['fasta']))[0]}.aln.fa")
            vis_filename = os.path.join(job_folder,
                                        f"{os.path.splitext(os.path.basename(processed_arguments['fasta']))[0]}.pdf")
            parameters.arguments["output_filename_aln"] = aln_filename
            fasta = msa4u.manager.Fasta(processed_arguments["fasta"], parameters)
            msa = msa4u.manager.MSA(fasta.run_mafft(), parameters)
            results_dict["alignments"] = os.path.basename(aln_filename)
        if "alignments" in processed_arguments.keys():
            vis_filename = os.path.join(job_folder, f"{os.path.basename(processed_arguments['alignments'])}.pdf")
            msa = msa4u.manager.MSA(processed_arguments["alignments"], parameters)
        results_dict["pdf_filename"] = os.path.basename(vis_filename)
        parameters.arguments["output_filename"] = vis_filename
        msa.plot()
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)

        with open(log_file_path, "w") as lf:
            lf.write(log_file.getvalue())
            log_file.close()

    except Exception as e:
        with open(os.path.join(job_folder, "traceback.txt"), "w") as traceback_f:
            traceback_f.write(traceback.format_exc())
        for i in ((traceback.format_exc()).split('\n')):
            if 'MSA4uError:' in i:
                print(f"MSA4uError 💔: {i.split(':')[1]}", file=sys.stderr)
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__
        raise e
    return results_dict


def msa4u_on_success(job, connection, result, *args, **kwargs):
    job_folder = os.path.join(app.config["JOBS_FOLDER"], "msa4u", job.id)
    success_folder = os.path.join(app.config["JOBS_FOLDER"], "msa4u", "successful_jobs", job.id)
    shutil.move(job_folder, success_folder)
    request_email = job.args[0]["email"]
    atkinsonlab_web.methods.send_email(os.path.join(app.config["STATIC_FOLDER"], "email", "msa4u_job_finished.html"),
                                       request_email,
                                       f"https://server.atkinson-lab.com/results/msa4u/{job.id}",
                                       job.meta["run_name"],
                                       "MSA4u results")

    cleaning_job = queues["helper"].enqueue_in(datetime.timedelta(hours=int(app.config["RESULTS_TTL"][:-1])),
                                               atkinsonlab_web.methods.remove_results, success_folder)
    return None


def msa4u_on_failure(job, connection, type, value, traceback):
    job_folder = os.path.join(app.config["JOBS_FOLDER"], "msa4u", job.id)
    failure_folder = os.path.join(app.config["JOBS_FOLDER"], "msa4u", "failed_jobs", job.id)
    shutil.move(job_folder, failure_folder)
    request_email = job.args[0]["email"]
    atkinsonlab_web.methods.send_email(os.path.join(app.config["STATIC_FOLDER"], "email", "msa4u_job_failed.html"),
                                       request_email,
                                       f"https://server.atkinson-lab.com/results/msa4u/{job.id}",
                                       job.meta["run_name"],
                                       "MSA4u results")

    cleaning_job = queues["helper"].enqueue_in(datetime.timedelta(hours=int(app.config["RESULTS_TTL"][:-1])),
                                               atkinsonlab_web.methods.remove_results, failure_folder)
    return None


def run_webflags(processed_arguments):
    try:
        job = rq.get_current_job()
        job_folder = os.path.join(app.config["JOBS_FOLDER"], "webflags", job.id)
        log_file_path = os.path.join(job_folder, "log.txt")
        log_file = io.StringIO()
        sys.stdout = log_file
        sys.stderr = log_file
        results_dict = dict()

        if not os.path.isdir(job_folder):
            os.mkdir(job_folder)
        job_request_file_folder = os.path.join(job_folder, "request_file")
        if not os.path.isdir(job_request_file_folder):
            os.mkdir(job_request_file_folder)
        with open(os.path.join(job_request_file_folder, "request.json"), "w") as request_json:
            json.dump({k: v for k, v in processed_arguments.items() if not isinstance(v, io.StringIO)}, request_json)
        for k, f in {k: v for k, v in processed_arguments.items() if isinstance(v, io.StringIO)}.items():
            file_path = os.path.join(job_request_file_folder, f.filename)
            with open(file_path, "w") as rf:
                rf.write(f.getvalue())
                f.close()
            processed_arguments[k] = file_path

        processed_arguments["run_name"] = processed_arguments["run_name"].replace("{current_date}",
                                                                                  time.strftime("%Y_%m_%d-%H_%M"))
        job.meta["run_name"] = processed_arguments["run_name"]
        webflags_folder = os.path.join(job_folder, "FlaGs_output")
        if not os.path.isdir(webflags_folder):
            os.mkdir(webflags_folder)
        if "accession_number" in processed_arguments.keys() or "protein_sequence" in processed_arguments.keys():
            uorf4u_parameters = uorf4u.manager.Parameters()
            uorf4u_parameters.arguments["ncbi_entrez_api_key"] = "4e86f511aeb81a91767e8ab71dd6aa6caa09"
            uorf4u_parameters.arguments["debug"] = True
            uorf4u_parameters.load_config("bacteria")
            uorf4u_parameters.arguments["blastp_evalue_cutoff"] = processed_arguments["blastp_evalue"]
            uorf4u_parameters.arguments["blastp_hit_list_size"] = processed_arguments["blastp_hit_list_size"]
            uorf4u_parameters.arguments["blastp_max_number_of_alignments"] = processed_arguments["blastp_hit_list_size"]
            uorf4u_parameters.arguments["blastp_pident_to_query_length_cutoff"] = 0
            uorf4u_parameters.arguments["output_dir"] = os.path.join(job_folder)
            if "accession_number" in processed_arguments.keys():
                refseq_protein = uorf4u.data_processing.RefSeqProtein(
                    accession_number=processed_arguments["accession_number"],
                    parameters=uorf4u_parameters)
                refseq_protein.get_record()
            if "protein_sequence" in processed_arguments.keys():
                record = Bio.SeqIO.read(io.StringIO(processed_arguments["protein_sequence"]), "fasta")
                refseq_protein = uorf4u.data_processing.RefSeqProtein(accession_number=record.id,
                                                                      parameters=uorf4u_parameters)
                refseq_protein.add_record(record)

            if processed_arguments["blastp_database"] == "reduced":
                local_db = "/home/webapp/WebServer/atkinsonlab_web/static/databases/reducedDB/reducedRefseqDbAA"
                homologues_list = refseq_protein.local_blastp_searching_for_homologues(local_db)
            else:
                uorf4u_parameters.arguments["blastp_database"] = processed_arguments["blastp_database"]
                homologues_list = refseq_protein.blastp_searching_for_homologues()
            processed_arguments["homologues_list"] = homologues_list

        hl_input = processed_arguments["homologues_list"]
        processed_arguments["input_type"] = set([len(i.strip().split()) for i in hl_input])
        input_file_p = os.path.join(job_request_file_folder, "request.txt")
        input_file = open(input_file_p, "w")
        if processed_arguments["input_type"] == {2}:
            input_file_txt = "\n".join(["\t".join(i.strip().split()) for i in hl_input])
        elif processed_arguments["input_type"] == {1}:
            input_file_txt = "\n".join(hl_input)
        else:
            input_file_txt = ""
        input_file.write(input_file_txt)
        input_file.close()
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        command = f"python3 {app.config['FLAGS_PATH']} -u {processed_arguments['email']} " \
                  f"-o results -g {processed_arguments['num_of_flanking_genes']}  " \
                  f"-n {processed_arguments['jackhmmer_iterations']} -e {processed_arguments['flags_evalue']} "

        results_dict["pdf"] = "results_operon.pdf"
        if "output_type" in processed_arguments.keys():
            if processed_arguments["output_type"] == "tree_tree_order":
                command += " -t -to "
                results_dict["pdf"] = "results_TreeOrder_output.pdf"
            elif processed_arguments["output_type"] == "tree_input_order":
                command += " -t "

        if processed_arguments["input_type"] == {2}:
            command += f" -a {input_file_p} "
        else:
            command += f" -p {input_file_p} "
        full_command = ["/bin/bash", "-c",
                        f"source /home/ar4622eg/miniconda3/etc/profile.d/conda.sh && "
                        f"conda activate eFlaGs2 && {command}"]

        cwd = os.getcwd()
        os.chdir(webflags_folder)
        output = subprocess.run(full_command, check=True, capture_output=True)
        log_file.write(re.sub(r'\n+', '\n', output.stdout.decode().split("<<")[0].strip()))
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        print(output.stderr.decode().strip())
        subprocess.run(["rm", "genBank.db"])
        subprocess.run(["rm", "refSeq.db"])

        try:
            outdesc_file_name = [f for f in os.listdir(webflags_folder) if f.endswith("_outdesc.txt")][0]
            outdesc_file = open(os.path.join(outdesc_file_name))
            results_dict["outdesc"] = re.sub(r"\n{3,}", "\n\n", outdesc_file.read()).strip()
            outdesc_file.close()
        except:
            results_dict["outdesc"] = "Not found"

        os.chdir(job_folder)
        results_dict["archive"] = os.path.basename(f"{processed_arguments['run_name']}.zip")
        shutil.make_archive(base_name=job_folder, format="zip", root_dir=job_folder)
        shutil.move(f"{job_folder}.zip", f"{processed_arguments['run_name']}.zip")
        with open(log_file_path, "w") as lf:
            lf.write(log_file.getvalue())
            log_file.close()
        os.chdir(cwd)
    except Exception as e:
        with open(os.path.join(job_folder, "traceback.txt"), "w") as traceback_f:
            traceback_f.write(traceback.format_exc())
        for i in ((traceback.format_exc()).split('\n')):
            print(f"{i.split(':')[1]}", file=sys.stderr)
        atkinsonlab_web.methods.update_meta_with_logs(job, log_file)
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__
        raise e
    return results_dict


def webflags_on_success(job, connection, result, *args, **kwargs):
    job_folder = os.path.join(app.config["JOBS_FOLDER"], "webflags", job.id)
    success_folder = os.path.join(app.config["JOBS_FOLDER"], "webflags", "successful_jobs", job.id)
    shutil.move(job_folder, success_folder)
    request_email = job.args[0]["email"]
    atkinsonlab_web.methods.send_email(os.path.join(app.config["STATIC_FOLDER"], "email", "webflags_job_finished.html"),
                                       request_email,
                                       f"https://server.atkinson-lab.com/results/webflags/{job.id}",
                                       job.meta["run_name"],
                                       "webFlaGs results")

    cleaning_job = queues["helper"].enqueue_in(datetime.timedelta(hours=int(app.config["RESULTS_TTL"][:-1])),
                                               atkinsonlab_web.methods.remove_results, success_folder)
    return None


def webflags_on_failure(job, connection, type, value, traceback):
    job_folder = os.path.join(app.config["JOBS_FOLDER"], "webflags", job.id)
    failure_folder = os.path.join(app.config["JOBS_FOLDER"], "webflags", "failed_jobs", job.id)
    shutil.move(job_folder, failure_folder)
    request_email = job.args[0]["email"]
    atkinsonlab_web.methods.send_email(os.path.join(app.config["STATIC_FOLDER"], "email", "webflags_job_failed.html"),
                                       request_email,
                                       f"https://server.atkinson-lab.com/results/webflags/{job.id}",
                                       job.meta["run_name"],
                                       "webFlaGs results")

    cleaning_job = queues["helper"].enqueue_in(datetime.timedelta(hours=int(app.config["RESULTS_TTL"][:-1])),
                                               atkinsonlab_web.methods.remove_results, failure_folder)

    return None
