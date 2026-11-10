---
layout: page
title: Model deployment
permalink: /model-deployment
nav_order: 11
---

{% include toc.html %}

# Model deployment

This guide is the deploy path for [Exercise 3](/exercise-3). The exercise page explains the saved model, the scaler, and the two servers. The commands below publish both on the Rahti project from Exercise 2.

{: .note }

> Preview. This page is omitted from the public site until it is removed from `unpublished_pages`.

Account, project, and the `oc` command are documented by Haaga-Helia. Follow those pages. This guide names the course values those pages do not know.

| Step | Page |
| --- | --- |
| CSC account and student start | [Opiskelijan aloitusohjeet]({{ site.csc_docs_student_start }}) |
| Create the Rahti project | [Projektin luonti]({{ site.csc_docs_rahti_project }}) |
| Install `oc` | [Komentorivityökalun asennus]({{ site.csc_docs_oc }}) |
| When a build or a pod fails | [Virheenjäljitys]({{ site.csc_docs_debug }}) |

## Access to the deployment platform

Use the Rahti project from Exercise 2. After a later login, select it again. Every command below writes into the project it selects.

```bash
oc project <your-project>
```

Clone `{{ site.exercise_3_repo_name }}`. `{{ site.exercise_3_base_branch }}` is the shared template. Create `{{ site.exercise_3_branch }}` from it. Replace `<id>` with the personal id from week 1. Do not commit on `{{ site.exercise_3_base_branch }}`.

```bash
git clone https://github.com/{{ site.exercise_1_github_org }}/{{ site.exercise_3_repo_name }}.git
cd {{ site.exercise_3_repo_name }}
git checkout {{ site.exercise_3_base_branch }}
git pull origin {{ site.exercise_3_base_branch }}
git checkout -b exercise-3-<id>
git push -u origin exercise-3-<id>
```

## Package the model

`contract.json` is the column order. `request.json` is the body you will send. The two files in `model/` are a stand-in. Replace them before you build.

With the [week 1 tunnel](/week-1#ssh-tunnel-to-the-oss-mlops-platform) open, open your own week 2 run. Kubeflow and MLflow list every student's runs together, so find yours by the git commit of that push. On your `exercise-1-<id>` branch, that commit is the one from `git rev-parse HEAD` after the week 2 push. The Kubeflow run name ends with your branch and the first 7 characters of that commit. In MLflow the same commit is the parameter `git_commit_hash`.

From that one run, copy the scaling file from the preprocess step to `model/scaler.pkl`. Copy the model file from the train step to `model/model.pkl`. Commit them. The week 3 run is the one you compared in Exercise 1. It is not the pair you deploy.

A model file is often too large to keep in a git repository. MLflow stores those files in separate storage, such as S3, and the git commit only records which run produced them. These two files are small, so this exercise commits them. The branch can then be built as it is, and the committed files can be compared with the run that saved them.

The images install scikit-learn 1.0.2, the version that saved those files.

`runtime.py` is the wrapper both servers import. Four functions still raise `NotImplementedError`. Replace each body.

`load_artifacts` runs when the process starts. `joblib.load` reads a pickle back into a scaler object and a model object. The paths are already defined at the top of the file.

```python
def load_artifacts():
    if not SCALER_PATH.is_file() or not MODEL_PATH.is_file():
        raise FileNotFoundError("model/scaler.pkl and model/model.pkl are required")
    scaler = joblib.load(SCALER_PATH)
    model = joblib.load(MODEL_PATH)
    return scaler, model
```

`features_in_order` is the contract. The JSON object names each measurement. The model sees a list of numbers in the saved column order. `KeyError` becomes HTTP 400 in the servers.

```python
def features_in_order(payload: dict) -> list[float]:
    contract = json.loads(CONTRACT_PATH.read_text(encoding="utf-8"))
    row = []
    for name in contract["columns"]:
        if name not in payload:
            raise KeyError(name)
        row.append(float(payload[name]))
    return row
```

`quality_from_row` is the inference step. The incoming numbers are raw measurements. `transform` repeats the Exercise 1 preprocess step. `predict` scores the scaled row. `float` is the value the HTTP response can encode.

```python
def quality_from_row(scaler, model, row: list[float]) -> float:
    scaled = scaler.transform(np.array([row], dtype=float))
    return float(model.predict(scaled)[0])
```

`require_course_key` is the gate. The header arrives as a string. The expected value arrives as the environment variable `COURSE_KEY`, which the deployment sets from the Rahti secret. Do not print the key.

```python
def require_course_key(header_value: str | None) -> None:
    expected = os.environ.get("COURSE_KEY", "")
    if not expected:
        raise CourseKeyError("COURSE_KEY is not set")
    if header_value is None or header_value != expected:
        raise CourseKeyError("missing or wrong course key")
```

Read `fastapi_server/app.py` and `bentoml_server/service.py`. Both call these four functions. The Dockerfiles copy `runtime.py` and both pickle files into the image. That copy is what puts the model binary on the server.

Commit the filled `runtime.py` before you build.

## Deploy the model

Choose a key for this deployment. Use a key you do not use anywhere else.

Email that same key to {{ site.email }}. The subject is `For exercise 3 check`.

Do not commit it, and do not put it in `deployment.txt`.

Put the key in `exercise-3-access` before `oc apply` of the deployments. The commands run from the repository.

```bash
oc create secret generic exercise-3-access \
  --from-literal=COURSE_KEY='<key you chose>'

oc apply -f openshift/buildconfigs.yaml
oc apply -f openshift/services.yaml
oc apply -f openshift/deployment-fastapi.yaml
oc apply -f openshift/deployment-bentoml.yaml
oc apply -f openshift/route.yaml
```

`oc create` is for the first time. When the secret already exists, replace the value and start the containers again. A running container keeps the previous key until that restart. Email the value that is running.

```bash
oc set data secret/exercise-3-access --from-literal=COURSE_KEY='<key you chose>'
oc rollout restart deployment/exercise-3-fastapi deployment/exercise-3-bentoml
```

In `openshift/buildconfigs.yaml`, replace `exercise-3-ID` with your branch name if a build is started from GitHub. To build the checkout you already have:

```bash
oc start-build exercise-3-fastapi --from-dir=. --follow
oc start-build exercise-3-bentoml --from-dir=. --follow
```

A new build after a change to `runtime.py` is the same pair of commands.

## Expose a prediction endpoint

Read the route hosts:

```bash
oc get route exercise-3-fastapi -o jsonpath='{.spec.host}{"\n"}'
oc get route exercise-3-bentoml -o jsonpath='{.spec.host}{"\n"}'
```

| Server | Health | Predict |
| --- | --- | --- |
| FastAPI | `GET /health` returns `{"status":"ok"}` | `POST /predict` |
| BentoML | `GET /healthz` returns 200 | `POST /predict` |

The predict body is a JSON object whose keys are the `contract.json` columns. The response is `{"quality": <number>}`. The header on predict is `{{ site.exercise_3_key_header }}`. Health does not use the header.

Inside the project, Exercise 4 will call `http://exercise-3-fastapi:8000`. The public route is how you show the endpoint from your own machine.

## Example request and response

```bash
curl -sS https://<fastapi-host>/health
curl -sS -H "Content-Type: application/json" -H "X-Course-Key: <key you chose>" \
  --data @request.json https://<fastapi-host>/predict

curl -sS https://<bentoml-host>/healthz
curl -sS -H "Content-Type: application/json" -H "X-Course-Key: <key you chose>" \
  --data @request.json https://<bentoml-host>/predict
```

Save the two prediction bodies as `response-fastapi.json` and `response-bentoml.json`. Write `deployment.txt`:

```text
fastapi https://exercise-3-fastapi-your-project.2.rahtiapp.fi
bentoml https://exercise-3-bentoml-your-project.2.rahtiapp.fi
```

Write `comparison.md` with both quality numbers. Commit and push `runtime.py`, `deployment.txt`, both response files, and `comparison.md` on `exercise-3-<id>`.

## Logs and troubleshooting

A stub left in `runtime.py` raises `NotImplementedError` during startup. The pod then stays unready. A missing secret does the same: the deployment refers to `exercise-3-access`, and the pod waits until that secret exists.

```bash
oc logs deployment/exercise-3-fastapi
oc logs deployment/exercise-3-bentoml
oc get pods
```

A 401 on predict means the header is missing or differs from the key in the running container. Restart after `oc set data` before trying the new key.

## Triggering deployment

The trigger is `oc start-build --from-dir=.` for the server you changed. A change in `runtime.py` needs both builds, because each image copies that file. A change in one server file needs only that server's build. Pushing the branch updates git. It does not start a build.
