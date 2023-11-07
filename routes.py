import pandas as pd
import rq.job
import flask
import json
import os
import rq

import atkinsonlab_web.form_validation
import atkinsonlab_web.applications
import atkinsonlab_web.enqueuing
import atkinsonlab_web.methods

from atkinsonlab_web import app, redis_connection
from atkinsonlab_web import queues


@app.route("/")
def home():
    return flask.render_template("index.html")


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
        return flask.render_template(f"{tool}.html", form=form)
    else:
        return flask.render_template("404.html"), 404


@app.route("/netflax", methods=["GET"])
def netflax():
    version = flask.request.args.get("version", "pruned")
    if version != "pruned" and version != "unpruned":
        version = "pruned"
    netflax_nodes = sorted(
        [i[:-4] for i in os.listdir(os.path.join(app.config["STATIC_FOLDER"], "tables", "netflax_tables"))],
        key=atkinsonlab_web.methods.sort_by_number)
    if version == "pruned":
        with open(os.path.join(app.config["STATIC_FOLDER"], "txt", "netflax_pruned.txt"), 'r') as f:
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
        if full_status["status"] == "finished":
            results = job.result
        else:
            results = None
        additional_data = dict()
        return flask.render_template(f"{tool}_results.html", status=full_status, id=job.id, results=results,
                                     additional_data=additional_data)
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


@app.route("/jobs/<tool>/<id>/<filename>")
def getfile(id, tool, filename):
    job = rq.job.Job.fetch(id, connection=redis_connection)
    if job.get_status(refresh=True) == "finished":
        subfolder = "successful_jobs"
    else:
        subfolder = ""
    if tool == "webflags":
        innerfolder = "FlaGs_output"
    else:
        innerfolder = ""

    return flask.send_from_directory(app.config["JOBS_FOLDER"],
                                     os.path.join(tool, subfolder, job.id, innerfolder, filename))


@app.errorhandler(404)
def page_not_found(error):
    return flask.render_template("404.html"), 404
