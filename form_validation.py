import Bio.SeqIO
import subprocess
import copy
import time
import json
import sys
import re
import io
import os
import rq

from atkinsonlab_web import app
from atkinsonlab_web import queues


def uorf4u_form_validation(request):
    job = rq.get_current_job()
    files_to_keep = dict()
    form = copy.deepcopy(app.config["DEFAULT_FORM_uorf4u"])
    parsed_arguments = dict(accept=True)
    for k, v in request.items():
        if k in form["float_variables"]:
            request[k] = float(v)
        if k in form["int_variables"]:
            request[k] = int(v)

    # Check mandatory arguments:
    mandatory_arguments = {k: v for k, v in request.items() if
                           k in form["mandatory_arguments"]}
    if not mandatory_arguments["homologues_list"].strip():
        del mandatory_arguments["homologues_list"]
    selected_mandatory_arguments = {k: v for k, v in mandatory_arguments.items() if bool(v)}
    if len(selected_mandatory_arguments) != 1:
        form["elements"]["mandatory_arguments_error"][
            "error_text"] = "Please, select <b>one</b> mandatory argument."
        parsed_arguments["accept"] = False
    if len(selected_mandatory_arguments) > 1:
        form["elements"]["mandatory_arguments_error"]["error_text"] = "Please, select <b>only one</b> argument."
        for key, value in selected_mandatory_arguments.items():
            if key != "homologues_list":
                form["elements"][key]["input"]["class"] += " is-invalid"
                form["elements"][key]["input"]["value"] = value
            else:
                form["elements"][key]["textarea"]["class"] += " is-invalid"
                form["elements"][key]["textarea_value"] = value
    if len(selected_mandatory_arguments) == 1:
        key, value = selected_mandatory_arguments.popitem()
        an_pattern = re.compile(r"^[ANYXW]P_\d+\.\d$")
        if key == "homologues_list" or key == "homologues_list_file":
            if key == "homologues_list":
                form["elements"][key]["textarea_value"] = value
                form["elements"][key]["textarea"]["rows"] = value.count("\n") + 1
                splitted_text = value.split()
            elif key == "homologues_list_file":
                # splitted_text = value.read().decode('utf-8').split()
                splitted_text = value.getvalue().split()
            if len(splitted_text) > 200:
                form["elements"][key]["invalid_feedback"] = f"You entered {len(splitted_text)} values" \
                                                            "While no more than 200 is available"
                parsed_arguments["accept"] = False
                if key == "homologues_list":
                    form["elements"][key]["textarea"]["class"] += " is-invalid"
                elif key == "homologues_list_file":
                    form["elements"][key]["input"]["class"] += " is-invalid"
            else:
                match_pattern = [re.fullmatch(an_pattern, i) for i in splitted_text]
                values_that_doesnt_match = [f"<b>{splitted_text[i]}</b>" for i in range(len(splitted_text)) if
                                            not match_pattern[i]]
                if len(values_that_doesnt_match) != 0:
                    form["elements"][key]["invalid_feedback"] = f"The following values: " \
                                                                f"{', '.join(values_that_doesnt_match)}" \
                                                                " don't look like proper protein accession numbers.<br> " \
                                                                "<i>The requested pattern: ^[ANYXW]P_[0-9.]*$</i>"
                    if key == "homologues_list":
                        form["elements"][key]["textarea"]["class"] += " is-invalid"
                    elif key == "homologues_list_file":
                        form["elements"][key]["input"]["class"] += " is-invalid"
                else:
                    parsed_arguments["homologues_list"] = splitted_text
                    if key == "homologues_list":
                        form["elements"][key]["textarea"]["class"] += " is-valid"
                    elif key == "homologues_list_file":
                        form["elements"][key]["input"]["class"] += " is-valid"
                        form["elements"][key]["valid_feedback"] = f"Your file was successfully " \
                                                                  "validated and loaded."
                        files_to_keep[key] = value

        elif key == "accession_number":
            form["elements"][key]["input"]["value"] = value
            if re.fullmatch(an_pattern, value):
                form["elements"][key]["input"]["class"] += " is-valid"
                parsed_arguments["accession_number"] = value
            else:
                form["elements"][key]["input"]["class"] += " is-invalid"
        elif key == "fasta":
            if sys.getsizeof(value.getvalue()) > 512000:
                form["elements"][key]["input"]["class"] += " is-invalid"
                form["elements"][key]["invalid_feedback"] = f"Your fasta file is too big (> 500KB)."
            else:
                # parsed_fasta = io.StringIO(value.read().decode("UTF-8"))
                string_value = value.getvalue()
                string_file = io.StringIO(string_value)
                record_dict = Bio.SeqIO.to_dict(Bio.SeqIO.parse(string_file, "fasta"))
                string_file.close()
                if len(record_dict) > 1000:
                    form["elements"][key]["input"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"Your fasta file has more than 1000 sequences."
                elif len(record_dict) == 1 or len(record_dict) == 0:
                    form["elements"][key]["input"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"You need to upload more than 1 sequence."
                else:
                    long_records = [k for k, v in record_dict.items() if len(v.seq) > 1000]
                    if len(long_records) > 0:
                        form["elements"][key]["input"]["class"] += " is-invalid"
                        form["elements"][key]["invalid_feedback"] = f"{len(long_records)} sequence(s) " \
                                                                    f"are longer than allowed."
                    else:
                        form["elements"][key]["input"]["class"] += " is-valid"
                        form["elements"][key]["valid_feedback"] = f"Your file was successfully " \
                                                                  "validated and uploaded."
                        parsed_arguments["fasta"] = value
                        request["check_assembly_annotation"] = False
                        files_to_keep[key] = value

    # Check optional
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
                parsed_arguments[key] = value
        if "check-input" in form["elements"][key].keys():
            form["elements"][key]["check-input"]["class"] += " is-valid"
            parsed_arguments[key] = value
            if value:
                form["elements"][key]["checked"] = 1
            else:
                form["elements"][key]["checked"] = 0
        if "select" in form["elements"][key].keys():
            form["elements"][key]["select"]["class"] += " is-valid"
            form["elements"][key]["selected"] = value
            parsed_arguments[key] = value
        if key == "assemblies_list":
            if value:
                if sys.getsizeof(value.getvalue()) > 512000:
                    form["elements"][key]["input"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"Your file is too big (>500KB)"
                else:
                    # parsed_file = io.StringIO(value.read().decode("UTF-8"))
                    form["elements"][key]["input"]["class"] += " is-valid"
                    form["elements"][key]["valid_feedback"] = f"Your file was successfully " \
                                                              "loaded."
                    parsed_arguments[key] = value
                    files_to_keep[key] = value
        if key == "config_file":
            if optional_arguments["config"] == "uploaded" and not value:
                form["elements"][key]["input"]["class"] += " is-invalid"
                form["elements"][key]["invalid_feedback"] = f"You need to upload a config file"
            elif optional_arguments["config"] == "uploaded" and value:
                if sys.getsizeof(value.getvalue()) > 512000:
                    form["elements"][key]["input"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"Your file is too big (>500KB)"
                else:
                    form["elements"][key]["input"]["class"] += " is-valid"
                    form["elements"][key]["valid_feedback"] = f"Your config file was " \
                                                              "successfully loaded."
                    parsed_arguments[key] = value
                    files_to_keep[key] = value

            elif optional_arguments["config"] != "uploaded" and value:
                form["elements"][key]["input"]["class"] += " is-invalid"
                form["elements"][key]["invalid_feedback"] = f"You have to select <i>uploaded</i> option in " \
                                                            "<i>Config file type</i> input."

    # Check run parameters:
    run_parameters = {k: v for k, v in request.items() if
                      k in ["email", "run_name", "queue_pass"]}
    if request["email"].split("@")[1] == "gmail.com":
        request["email"] = f"{request['email'].split('@')[0].replace('.', '')}@gmail.com"
    for key, value in run_parameters.items():
        form["elements"][key]["input"]["value"] = value
        parsed_arguments[key] = value
        if key == "queue_pass":
            if value:
                if value == app.config["QUEUE_KEY"]:
                    form["elements"][key]["input"]["class"] += " is-valid"
                    parsed_arguments["queue"] = "uorf4u_prioritised"
                else:
                    form["elements"][key]["input"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"Wrong key 🙅🏻"
            else:
                parsed_arguments["queue"] = "uorf4u_standard"
        else:
            form["elements"][key]["input"]["class"] += " is-valid"

    for key, value in form["elements"].items():
        in_cl = ""
        if "input" in value["subelements"]:
            in_cl = "input"
        if "textarea" in value["subelements"]:
            in_cl = "textarea"
        if in_cl and "is-invalid" in value[in_cl]["class"]:
            parsed_arguments["accept"] = False
    if not parsed_arguments["accept"]:
        form["top_warning_message"] = "Your request didn't pass the validation. " \
                                      "Please, fix the highlighted errors and resubmit."
    parsed_arguments["request_ip"] = request["request_ip"]
    # Check if user request already in the queue:
    if parsed_arguments["accept"] and parsed_arguments["queue"] == "uorf4u_standard":
        jobs = queues["uorf4u_standard"].get_jobs()
        workers = rq.Worker.all(queue=queues["uorf4u_standard"])
        for worker in workers:
            if worker.get_current_job():
                jobs.append(worker.get_current_job())
        jobs_request_ips = [job.args[0]["request_ip"] for job in jobs]
        jobs_emails = [job.args[0]["email"] for job in jobs]
        if request["request_ip"] in jobs_request_ips or request["email"] in jobs_emails:
            parsed_arguments["accept"] = False
            form["top_warning_message"] = "It seems you already have a job that's not finished yet. " \
                                          "Currently we can handle only one job per user, sorry."
            if request["email"] not in jobs_emails:
                form["top_warning_message"] += "<br><span class='fst-italic'>" \
                                               "Changing e-mail address doesn't help 👻</span>"
    return form, parsed_arguments, files_to_keep


def msa4u_form_validation(request):
    job = rq.get_current_job()
    files_to_keep = dict()
    form = copy.deepcopy(app.config["DEFAULT_FORM_msa4u"])
    parsed_arguments = dict(accept=True)
    # Check mandatory arguments:
    mandatory_arguments = {k: v for k, v in request.items() if
                           k in form["mandatory_arguments"]}
    selected_mandatory_arguments = {k: v for k, v in mandatory_arguments.items() if bool(v)}
    if len(selected_mandatory_arguments) != 1:
        form["elements"]["mandatory_arguments_error"][
            "error_text"] = "Please, select <b>one</b> mandatory argument."
        parsed_arguments["accept"] = False
    if len(selected_mandatory_arguments) > 1:
        form["elements"]["mandatory_arguments_error"]["error_text"] = "Please, select <b>only one</b> argument."
        for key, value in selected_mandatory_arguments.items():
            if key != "homologues_list":
                form["elements"][key]["input"]["class"] += " is-invalid"
                form["elements"][key]["input"]["value"] = value
            else:
                form["elements"][key]["textarea"]["class"] += " is-invalid"
                form["elements"][key]["textarea_value"] = value
    if len(selected_mandatory_arguments) == 1:
        key, value = selected_mandatory_arguments.popitem()
        if sys.getsizeof(value.getvalue()) > 5242880:
            form["elements"][key]["input"]["class"] += " is-invalid"
            form["elements"][key]["invalid_feedback"] = f"Your fasta file is too big (> 5MB)."
        else:
            string_value = value.getvalue()
            string_file = io.StringIO(string_value)
            record_dict = Bio.SeqIO.to_dict(Bio.SeqIO.parse(string_file, "fasta"))
            string_file.close()
            if len(record_dict) > 2000:
                form["elements"][key]["input"]["class"] += " is-invalid"
                form["elements"][key]["invalid_feedback"] = f"Your fasta file has more than 2000 sequences."
            elif len(record_dict) == 1 or len(record_dict) == 0:
                form["elements"][key]["input"]["class"] += " is-invalid"
                form["elements"][key]["invalid_feedback"] = f"You need to upload more than 1 sequence."
            else:
                long_records = [k for k, v in record_dict.items() if len(v.seq) > 1000]
                if len(long_records) > 0:
                    form["elements"][key]["input"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"{len(long_records)} sequence(s) " \
                                                                f"are longer than allowed."
                else:
                    form["elements"][key]["input"]["class"] += " is-valid"
                    form["elements"][key]["valid_feedback"] = f"Your file was successfully " \
                                                              "validated and uploaded."
                    parsed_arguments["fasta"] = value
                    request["check_assembly_annotation"] = False
                    files_to_keep[key] = value
    # Check optional
    optional_arguments = {k: v for k, v in request.items() if
                          (k not in form["mandatory_arguments"] and k not in ["email", "run_name", "request_ip"])}

    for key, value in optional_arguments.items():
        if "select" in form["elements"][key].keys():
            form["elements"][key]["select"]["class"] += " is-valid"
            form["elements"][key]["selected"] = value
            parsed_arguments[key] = value
        if "input" in form["elements"][key].keys():
            if form["elements"][key]["input"]["type"] == "file":
                if value:
                    if sys.getsizeof(value.getvalue()) > 512000:
                        form["elements"][key]["input"]["class"] += " is-invalid"
                        form["elements"][key]["invalid_feedback"] = f"Your file is too big (>500KB)"
                    else:
                        # parsed_file = io.StringIO(value.read().decode("UTF-8"))
                        form["elements"][key]["input"]["class"] += " is-valid"
                        form["elements"][key]["valid_feedback"] = f"Your file was successfully " \
                                                                  "loaded."
                        parsed_arguments[key] = value
                        files_to_keep[key] = value
    # Check run parameters:
    run_parameters = {k: v for k, v in request.items() if k in ["email", "run_name"]}
    if request["email"].split("@")[1] == "gmail.com":
        request["email"] = f"{request['email'].split('@')[0].replace('.', '')}@gmail.com"
    for key, value in run_parameters.items():
        form["elements"][key]["input"]["value"] = value
        parsed_arguments[key] = value

    for key, value in form["elements"].items():
        in_cl = ""
        if "input" in value["subelements"]:
            in_cl = "input"
        if "textarea" in value["subelements"]:
            in_cl = "textarea"
        if in_cl and "is-invalid" in value[in_cl]["class"]:
            parsed_arguments["accept"] = False
    if not parsed_arguments["accept"]:
        form["top_warning_message"] = "Your request didn't pass the validation. " \
                                      "Please, fix the highlighted errors and resubmit."

    parsed_arguments["request_ip"] = request["request_ip"]
    parsed_arguments["queue"] = "msa4u"

    return form, parsed_arguments, files_to_keep


def webflags_form_validation(request):
    job = rq.get_current_job()
    files_to_keep = dict()
    form = copy.deepcopy(app.config["DEFAULT_FORM_webflags"])
    parsed_arguments = dict(accept=True)
    for k, v in request.items():
        if k in form["float_variables"]:
            request[k] = float(v)
        if k in form["int_variables"]:
            request[k] = int(v)

    # Check mandatory arguments:
    mandatory_arguments = {k: v for k, v in request.items() if
                           k in form["mandatory_arguments"]}
    if not mandatory_arguments["homologues_list"].strip():
        del mandatory_arguments["homologues_list"]
    if not mandatory_arguments["protein_sequence"].strip():
        del mandatory_arguments["protein_sequence"]
    selected_mandatory_arguments = {k: v for k, v in mandatory_arguments.items() if bool(v)}
    if len(selected_mandatory_arguments) != 1:
        form["elements"]["mandatory_arguments_error"][
            "error_text"] = "Please, select <b>one</b> mandatory argument."
        parsed_arguments["accept"] = False
    if len(selected_mandatory_arguments) > 1:
        form["elements"]["mandatory_arguments_error"]["error_text"] = "Please, select <b>only one</b> argument."
        for key, value in selected_mandatory_arguments.items():
            if key != "homologues_list":
                form["elements"][key]["input"]["class"] += " is-invalid"
                form["elements"][key]["input"]["value"] = value
            else:
                form["elements"][key]["textarea"]["class"] += " is-invalid"
                form["elements"][key]["textarea_value"] = value
    if len(selected_mandatory_arguments) == 1:
        key, value = selected_mandatory_arguments.popitem()
        an_pattern = re.compile(r"^[ANYXW]P_\d+\.\d$")
        as_pattern = re.compile(r"^GCF_\d+\.\d$")
        if key == "homologues_list" or key == "list_file":
            if key == "homologues_list":
                form["elements"][key]["textarea_value"] = value
                form["elements"][key]["textarea"]["rows"] = value.count("\n") + 1
                splitted_text = [i.strip() for i in value.strip().split("\n")]
            elif key == "list_file":
                splitted_text = [i.strip() for i in value.getvalue().strip().split("\n")]
            if len(splitted_text) > 200:
                form["elements"][key]["invalid_feedback"] = f"You entered {len(splitted_text)} values" \
                                                            "While no more than 200 is available"
                parsed_arguments["accept"] = False
                if key == "homologues_list":
                    form["elements"][key]["textarea"]["class"] += " is-invalid"
                elif key == "list_file":
                    form["elements"][key]["input"]["class"] += " is-invalid"
            else:
                if set([len(i.strip().split()) for i in splitted_text]) == {1}:
                    match_pattern = [re.fullmatch(an_pattern, i.strip()) for i in splitted_text]
                    values_that_doesnt_match = [f"<b>{splitted_text[i]}</b>" for i in range(len(splitted_text)) if
                                                not match_pattern[i]]
                    if len(values_that_doesnt_match) != 0:
                        form["elements"][key]["invalid_feedback"] = f"The following values: " \
                                                                    f"{', '.join(values_that_doesnt_match)}" \
                                                                    " don't look like proper protein accession numbers.<br> " \
                                                                    "<i>The requested pattern: ^[ANYXW]P_[0-9]+.[0-9]$</i>"
                        if key == "homologues_list":
                            form["elements"][key]["textarea"]["class"] += " is-invalid"
                        elif key == "list_file":
                            form["elements"][key]["input"]["class"] += " is-invalid"
                    else:
                        print("HI", splitted_text)
                        parsed_arguments["homologues_list"] = splitted_text
                        if key == "homologues_list":
                            form["elements"][key]["textarea"]["class"] += " is-valid"
                        elif key == "list_file":
                            form["elements"][key]["input"]["class"] += " is-valid"
                            form["elements"][key]["valid_feedback"] = f"Your file was successfully " \
                                                                      "validated and loaded."
                            files_to_keep[key] = value
                elif set([len(i.strip().split()) for i in splitted_text]) == {2}:
                    match_pattern = [(bool(re.fullmatch(as_pattern, i.strip().split()[0])) and bool(
                        re.fullmatch(an_pattern, i.strip().split()[1]))) for i in splitted_text]
                    values_that_doesnt_match = [f"<b>{splitted_text[i]}</b>" for i in range(len(splitted_text)) if
                                                not match_pattern[i]]
                    if len(values_that_doesnt_match) != 0:
                        form["elements"][key]["invalid_feedback"] = f"The following lines: " \
                                                                    f"{', '.join(values_that_doesnt_match)}" \
                                                                    " don't look like proper protein accession numbers" \
                                                                    " or assemblies.<br> "
                        if key == "homologues_list":
                            form["elements"][key]["textarea"]["class"] += " is-invalid"
                        elif key == "list_file":
                            form["elements"][key]["input"]["class"] += " is-invalid"
                    else:
                        parsed_arguments["homologues_list"] = splitted_text
                        if key == "homologues_list":
                            form["elements"][key]["textarea"]["class"] += " is-valid"
                        elif key == "list_file":
                            form["elements"][key]["input"]["class"] += " is-valid"
                            form["elements"][key]["valid_feedback"] = f"Your file was successfully " \
                                                                      "validated and loaded."
                            files_to_keep[key] = value
                else:
                    form["elements"][key]["invalid_feedback"] = f"You should use either one protein accession number " \
                                                                f"per line or one pair of assembly id and accession" \
                                                                f" number."
                    if key == "homologues_list":
                        form["elements"][key]["textarea"]["class"] += " is-invalid"
                    elif key == "list_file":
                        form["elements"][key]["input"]["class"] += " is-invalid"
        elif key == "accession_number":
            form["elements"][key]["input"]["value"] = value
            if re.fullmatch(an_pattern, value):
                form["elements"][key]["input"]["class"] += " is-valid"
                parsed_arguments["accession_number"] = value
            else:
                form["elements"][key]["input"]["class"] += " is-invalid"

        elif key == "protein_sequence":
            try:
                form["elements"][key]["textarea_value"] = value.strip()
                form["elements"][key]["textarea"]["rows"] = value.count("\n") + 1
                if value.count(">") == 0:
                    value = ">query_sequence\n" + value.strip()
                records = Bio.SeqIO.parse(io.StringIO(value.strip()), "fasta")
                num_of_records = 0
                for record in records:
                    num_of_records += 1
                if num_of_records > 1:
                    form["elements"][key]["textarea"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"Your input has more than one sequence; "
                elif num_of_records == 0:
                    form["elements"][key]["textarea"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"No correct sequence in was found; Please, " \
                                                                f"check your input. "
                else:
                    record = Bio.SeqIO.read(io.StringIO(value), "fasta")
                    if len(record.seq) < 9:
                        form["elements"][key]["textarea"]["class"] += " is-invalid"
                        form["elements"][key]["invalid_feedback"] = f"Your sequence is too short. At least 9 amino" \
                                                                    f" acids are needed."
                    else:
                        form["elements"][key]["textarea"]["class"] += " is-valid"
                        parsed_arguments["protein_sequence"] = value.strip()
            except:
                form["elements"][key]["textarea"]["class"] += " is-invalid"
                form["elements"][key]["invalid_feedback"] = f"Unable to build a record. Please, " \
                                                            f"check your input. "

    # Check optional
    optional_arguments = {k: v for k, v in request.items() if
                          (k not in form["mandatory_arguments"] and k not in ["email", "run_name", "queue_pass",
                                                                              "request_ip"])}
    for key, value in optional_arguments.items():
        if "input" in form["elements"][key].keys():
            if "pattern" in form["elements"][key]["input"] or (
                    "min" in form["elements"][key]["input"] and "max" in form["elements"][key]["input"]):
                form["elements"][key]["input"]["value"] = str(value)
                form["elements"][key]["input"]["class"] += " is-valid"
                parsed_arguments[key] = value
        if "select" in form["elements"][key].keys():
            form["elements"][key]["select"]["class"] += " is-valid"
            form["elements"][key]["selected"] = value
            parsed_arguments[key] = value

    # Check run parameters:
    run_parameters = {k: v for k, v in request.items() if
                      k in ["email", "run_name", "queue_pass"]}
    if request["email"].split("@")[1] == "gmail.com":
        request["email"] = f"{request['email'].split('@')[0].replace('.', '')}@gmail.com"
    for key, value in run_parameters.items():
        form["elements"][key]["input"]["value"] = value
        parsed_arguments[key] = value
        if key == "queue_pass":
            if value:
                if value == app.config["QUEUE_KEY"]:
                    form["elements"][key]["input"]["class"] += " is-valid"
                    parsed_arguments["queue"] = "webflags_prioritised"
                else:
                    form["elements"][key]["input"]["class"] += " is-invalid"
                    form["elements"][key]["invalid_feedback"] = f"Wrong key 🙅🏻"
            else:
                parsed_arguments["queue"] = "webflags_standard"
        else:
            form["elements"][key]["input"]["class"] += " is-valid"

    for key, value in form["elements"].items():
        if key != "empty":
            in_cl = ""
            if "input" in value["subelements"]:
                in_cl = "input"
            if "textarea" in value["subelements"]:
                in_cl = "textarea"
            if in_cl and "is-invalid" in value[in_cl]["class"]:
                parsed_arguments["accept"] = False
    if not parsed_arguments["accept"]:
        form["top_warning_message"] = "Your request didn't pass the validation. " \
                                      "Please, fix the highlighted errors and resubmit."
    parsed_arguments["request_ip"] = request["request_ip"]
    # Check if user request already in the queue:

    if parsed_arguments["accept"] and parsed_arguments["queue"] == "webflags_standard":
        jobs = queues["webflags_standard"].get_jobs()
        workers = rq.Worker.all(queue=queues["webflags_standard"])
        for worker in workers:
            if worker.get_current_job():
                jobs.append(worker.get_current_job())
        jobs_request_ips = [job.args[0]["request_ip"] for job in jobs]
        jobs_emails = [job.args[0]["email"] for job in jobs]
        if request["request_ip"] in jobs_request_ips or request["email"] in jobs_emails:
            parsed_arguments["accept"] = False
            form["top_warning_message"] = "It seems you already have a job that's not finished yet. " \
                                          "Currently we can handle only one job per user, sorry."
            if request["email"] not in jobs_emails:
                form["top_warning_message"] += "<br><span class='fst-italic'>" \
                                               "Changing e-mail address doesn't help 👻</span>"

    return form, parsed_arguments, files_to_keep
