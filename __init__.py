import flask
import dotenv
import redis
import json
import rq
import os

app = flask.Flask(__name__)
app.config["STATIC_FOLDER"] = os.path.join(os.path.dirname(__file__), "static")
app.config["JOBS_FOLDER"] = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, "jobs"))
app.config["TOOLS"] = ["uorf4u", "msa4u", "webflags"]

app.config["DEFAULT_FORM_uorf4u"] = json.load(open(os.path.join(app.config["STATIC_FOLDER"], "json/uorf4u_form.json")))
app.config["DEFAULT_FORM_msa4u"] = json.load(open(os.path.join(app.config["STATIC_FOLDER"], "json/msa4u_form.json")))
app.config["DEFAULT_FORM_webflags"] = json.load(
    open(os.path.join(app.config["STATIC_FOLDER"], "json/webflags_form.json")))

env_config = dotenv.dotenv_values(".env")
app.config["QUEUE_KEY"] = env_config["queue_pass"]
app.config["EMAIL_PASS"] = env_config["email_pass"]
app.config["FLAGS_PATH"] = env_config["flags_path"]
app.config["RESULTS_TTL"] = "168h"

redis_connection = redis.Redis()

queues = dict(uorf4u_standard=rq.Queue(name="uorf4u_standard", connection=redis_connection),
              uorf4u_prioritised=rq.Queue(name="uorf4u_prioritised", connection=redis_connection),
              msa4u=rq.Queue(name="msa4u", connection=redis_connection),
              webflags_prioritised=rq.Queue(name="webflags_prioritised", connection=redis_connection),
              webflags_standard=rq.Queue(name="webflags_standard", connection=redis_connection),
              helper=rq.Queue(name="helper", connection=redis_connection))

from . import routes
from . import methods
from . import form_validation
from . import applications
from . import enqueuing

app.config["DEMO_FORM_uorf4u"] = methods.uorf4u_demo_form()
app.config["DEMO_FORM_msa4u"] = methods.msa4u_demo_form()
app.config["DEMO_FORM_webflags"] = methods.webflags_demo_form()
