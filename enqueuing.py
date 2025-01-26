import os.path
import rq

import atkinsonlab_web.methods
import atkinsonlab_web.applications
from atkinsonlab_web import queues
from atkinsonlab_web import app


def enqueue_for_validation(request, request_ip, tool, previous_request_files=None):
    preprocessed_request = atkinsonlab_web.methods.preprocess_request(request, request_ip, previous_request_files)
    if tool == "uorf4u":
        validation_job = queues["helper"].enqueue(atkinsonlab_web.form_validation.uorf4u_form_validation,
                                                  preprocessed_request,
                                                  job_timeout="10m", result_ttl="1h", failure_ttl="1h")
    elif tool == "msa4u":
        validation_job = queues["helper"].enqueue(atkinsonlab_web.form_validation.msa4u_form_validation,
                                                  preprocessed_request,
                                                  job_timeout="10m", result_ttl="1h", failure_ttl="1h")
    elif tool == "webflags":
        validation_job = queues["helper"].enqueue(atkinsonlab_web.form_validation.webflags_form_validation,
                                                  preprocessed_request,
                                                  job_timeout="10m", result_ttl="1h", failure_ttl="1h")
    elif tool == "ilund4u":
        validation_job = queues["helper"].enqueue(atkinsonlab_web.form_validation.ilund4u_form_validation,
                                                  preprocessed_request,
                                                  job_timeout="10m", result_ttl="1h", failure_ttl="1h")
    return validation_job


def enqueue_for_run(parsed_arguments, tool):
    if tool == "uorf4u":
        job = queues[parsed_arguments["queue"]].enqueue(atkinsonlab_web.applications.run_uorf4u, parsed_arguments,
                                                        job_timeout="3h", result_ttl=app.config["RESULTS_TTL"],
                                                        failure_ttl=app.config["RESULTS_TTL"],
                                                        meta=dict(log="", cleanlog=""),
                                                        on_success=atkinsonlab_web.applications.uorf4u_on_success,
                                                        on_failure=atkinsonlab_web.applications.uorf4u_on_failure)
    elif tool == "msa4u":
        job = queues[parsed_arguments["queue"]].enqueue(atkinsonlab_web.applications.run_msa4u, parsed_arguments,
                                                        job_timeout="30m", result_ttl=app.config["RESULTS_TTL"],
                                                        failure_ttl=app.config["RESULTS_TTL"],
                                                        meta=dict(log="", cleanlog=""),
                                                        on_success=atkinsonlab_web.applications.msa4u_on_success,
                                                        on_failure=atkinsonlab_web.applications.msa4u_on_failure)
    elif tool == "webflags":
        job = queues[parsed_arguments["queue"]].enqueue(atkinsonlab_web.applications.run_webflags, parsed_arguments,
                                                        job_timeout="2h", result_ttl=app.config["RESULTS_TTL"],
                                                        failure_ttl=app.config["RESULTS_TTL"],
                                                        meta=dict(log="", cleanlog=""),
                                                        on_success=atkinsonlab_web.applications.webflags_on_success,
                                                        on_failure=atkinsonlab_web.applications.webflags_on_failure)
    elif tool == "ilund4u":
        job = queues[parsed_arguments["queue"]].enqueue(atkinsonlab_web.applications.run_ilund4u, parsed_arguments,
                                                        job_timeout="2h", result_ttl=app.config["RESULTS_TTL"],
                                                        failure_ttl=app.config["RESULTS_TTL"],
                                                        meta=dict(log="", cleanlog=""),
                                                        on_success=atkinsonlab_web.applications.ilund4u_on_success,
                                                        on_failure=atkinsonlab_web.applications.ilund4u_on_failure)

    return job
