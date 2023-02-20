import werkzeug.utils
import email.message
import unicodedata
import Bio.SeqIO
import datetime
import smtplib
import shutil
import copy
import io
import os
from atkinsonlab_web import app


def preprocess_request(request, request_ip, old_request_files=None):
    if old_request_files:
        old_request_files.update(
            {k: io.StringIO(v.read().decode("utf-8")) for k, v in request.files.items() if v})
        request_files = old_request_files
    else:
        request_files = {k: io.StringIO(v.read().decode("utf-8")) for k, v in request.files.items() if v}
    for k, v in request_files.items():
        if request.files[k]:
            v.filename = werkzeug.utils.secure_filename(request.files[k].filename)
    preprocessed_request = {k: v for k, v in {**request.form, **request_files}.items()}
    preprocessed_request["request_ip"] = request_ip
    return preprocessed_request


def get_full_job_status(job):
    full_status = dict(status=job.get_status(refresh=True), position=str(job.get_position()),
                       enqueued_at=job.enqueued_at, started_at=job.started_at, ended_at=job.ended_at,
                       meta=job.get_meta(refresh=True))
    full_status["stored_until"] = None
    for k, v in full_status.items():
        if k in ["enqueued_at", "started_at", "ended_at"] and v:
            full_status[k] = v.strftime("%m.%d %H:%M UTC")
            if k == "ended_at":
                full_status["stored_until"] = (
                        v + datetime.timedelta(hours=int(app.config["RESULTS_TTL"][:-1]))).strftime(
                    "%m.%d %H:%M UTC")
    return full_status


def clean_text(text):
    normalized_text = unicodedata.normalize("NFKD", text)
    cleaned_text = "".join(c for c in normalized_text if c.isalnum())
    return cleaned_text


def update_meta_with_logs(job, log_file):
    job.meta["log"] = log_file.getvalue().strip()
    job.meta["cleanlog"] = clean_text(log_file.getvalue())
    job.save_meta()


def remove_results(job_folder):
    shutil.rmtree(job_folder)
    return None


def send_email(html, to_address, results_link, subject):
    with open(html) as file:
        html_body = file.read().replace("%link%", results_link)
    msg = email.message.EmailMessage()
    msg["Subject"] = subject
    msg["From"] = "atkinson-lab@med.lu.se"
    msg["To"] = to_address
    msg.set_content(html_body, subtype="html")

    with smtplib.SMTP("smtps.lu.se", 587) as server:
        server.starttls()
        server.login("smtps_med-atkin@lu.se", app.config["EMAIL_PASS"])
        server.send_message(msg)


def uorf4u_demo_form():
    request = {'accession_number': '', 'homologues_list': ' ', 'blastp_hit_list_size': '200',
               'blastp_pident_to_query_length_cutoff': '0.5', 'max_number_of_assemblies': '1',
               'upstream_region_length': '400', 'downstream_region_length': '100', 'check_assembly_annotation': 'true',
               'filter_by_sd': 'true', 'alignment_type': 'aa', 'orfs_presence_cutoff': '0.4', 'config': 'bacteria',
               'email': '', 'run_name': 'uorf4u_{current_date}', 'queue_pass': ''}
    form = copy.deepcopy(app.config["DEFAULT_FORM_uorf4u"])
    for k, v in request.items():
        if k in form["float_variables"]:
            request[k] = float(v)
        if k in form["int_variables"]:
            request[k] = int(v)
    hl_demo = "\n".join(["WP_034984371.1", "WP_159316313.1", "WP_095341278.1", "WP_150861853.1", "WP_011382144.1",
                         "WP_081624258.1 "])
    form["elements"]["homologues_list"]["textarea_value"] = hl_demo
    form["elements"]["homologues_list"]["textarea"]["rows"] = hl_demo.count("\n") + 1
    form["elements"]["homologues_list"]["textarea"]["class"] += " is-valid"
    optional_arguments = {k: v for k, v in request.items() if
                          (k not in form["mandatory_arguments"] and k not in ["email", "run_name", "queue_pass",
                                                                              "request_ip"])}
    checkboxes = ["check_assembly_annotation", "alternative_start_codons", "filter_by_sd"]
    for checkbox in checkboxes:
        if checkbox not in optional_arguments.keys():
            optional_arguments[checkbox] = False
        optional_arguments[checkbox] = bool(optional_arguments[checkbox])
    for key, value in optional_arguments.items():
        if "input" in form["elements"][key].keys():
            if "pattern" in form["elements"][key]["input"] or (
                    "min" in form["elements"][key]["input"] and "max" in form["elements"][key]["input"]):
                form["elements"][key]["input"]["value"] = str(value)
                form["elements"][key]["input"]["class"] += " is-valid"
        if "check-input" in form["elements"][key].keys():
            form["elements"][key]["check-input"]["class"] += " is-valid"
        if "select" in form["elements"][key].keys():
            form["elements"][key]["select"]["class"] += " is-valid"
            form["elements"][key]["selected"] = value

    return form


def msa4u_demo_form():
    request = {'label': 'id', 'email': '', 'run_name': 'Default', 'request_ip': '127.0.0.1'}
    form = copy.deepcopy(app.config["DEFAULT_FORM_msa4u"])
    # Check mandatory arguments:
    with open(os.path.join(app.config['STATIC_FOLDER'], "demo/demo_msa4u.fa"), "r") as fa:
        demo_file = io.StringIO(fa.read())
        demo_file.filename = "demo.fa"
    form["files_to_keep"] = dict(fasta=demo_file)
    form["elements"]["fasta"]["input"]["class"] += " is-valid"
    form["elements"]["fasta"]["valid_feedback"] = f"Demo fasta file was successfully uploaded."
    optional_arguments = {k: v for k, v in request.items() if
                          (k not in form["mandatory_arguments"] and k not in ["email", "run_name", "request_ip"])}

    for key, value in optional_arguments.items():
        if "select" in form["elements"][key].keys():
            form["elements"][key]["select"]["class"] += " is-valid"
            form["elements"][key]["selected"] = value

    return form


def webflags_demo_form():
    request = {'accession_number': '', 'homologues_list': ' ', 'blastp_hit_list_size': '15',
               'blastp_pident_to_query_length_cutoff': '0.5', 'blastp_evalue': '1e-3', 'flags_evalue': '1e-10',
               'jackhmmer_iterations': '3', 'num_of_flanking_genes': '4', 'output_type': 'tree_tree_order', 'email': '',
               'run_name': 'webFlaGs_{current_date}', 'queue_pass': ''}
    form = copy.deepcopy(app.config["DEFAULT_FORM_webflags"])
    # Check mandatory arguments:
    with open(os.path.join(app.config['STATIC_FOLDER'], "demo/demo_webflags.txt"), "r") as hlt:
        demo_list = hlt.read()
    form["elements"]["homologues_list"]["textarea_value"] = demo_list
    form["elements"]["homologues_list"]["textarea"]["rows"] = demo_list.count("\n") + 1
    form["elements"]["homologues_list"]["textarea"]["class"] += " is-valid"

    optional_arguments = {k: v for k, v in request.items() if
                          (k not in form["mandatory_arguments"] and k not in ["email", "run_name", "request_ip"])}

    for key, value in optional_arguments.items():
        if "input" in form["elements"][key].keys():
            if "pattern" in form["elements"][key]["input"] or (
                    "min" in form["elements"][key]["input"] and "max" in form["elements"][key]["input"]):
                form["elements"][key]["input"]["value"] = str(value)
                form["elements"][key]["input"]["class"] += " is-valid"
        if "check-input" in form["elements"][key].keys():
            form["elements"][key]["check-input"]["class"] += " is-valid"
        if "select" in form["elements"][key].keys():
            form["elements"][key]["select"]["class"] += " is-valid"
            form["elements"][key]["selected"] = value

    return form
