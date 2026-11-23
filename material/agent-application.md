---
layout: page
title: Agent application
permalink: /agent-application
nav_order: 14
---

{% include toc.html %}

# Agent application

This guide is the deploy path for [Exercise 4](/exercise-4). You publish it on the Rahti project from Exercise 2, finish the agent and the MCP tool, and record four chat trials.

Account, project, the `oc` command, and debugging are documented by Haaga-Helia. Follow those pages. This guide names the course values those pages do not know.

| Step | Page |
| --- | --- |
| CSC account and student start | [Opiskelijan aloitusohjeet]({{ site.csc_docs_student_start }}) |
| Create the Rahti project | [Projektin luonti]({{ site.csc_docs_rahti_project }}) |
| Install `oc` | [Komentorivityökalun asennus]({{ site.csc_docs_oc }}) |
| When a build or a pod fails | [Virheenjäljitys]({{ site.csc_docs_debug }}) |

The project already exists. Exercise 2 and Exercise 3 deployed into it. Do not create a second project. A student project holds one course project at a time.

## What stays running

Leave the Exercise 2 route up. Leave the `exercise-3-fastapi` deployment up. Exercise 4 calls it inside the project at `{{ site.exercise_4_quality_url }}`.

BentoML is not used here. The project CPU limit is 4. Exercise 2 already uses part of it, and each build pod is charged another 500m, because a build that sets no CPU limit receives the project default of 500m. A pod that is still in `ImagePullBackOff` holds its CPU limit too.

When a build or a new pod cannot be created, scale the BentoML deployment to zero and leave FastAPI running:

```bash
oc scale deployment/exercise-3-bentoml --replicas=0
```

That frees 500m. `Pending` is one thing you may see on a pod. The failure this project hits is often a build that never starts. `oc get builds` shows `New`. `oc describe build <name>` says `CannotCreateBuildPod` and `exceeded quota`. `oc get pods` does not list that build.

## Run the provided example

Clone `{{ site.exercise_4_repo_name }}`. `{{ site.exercise_4_base_branch }}` is the shared template. Create `{{ site.exercise_4_branch }}` from it and do all of the work on that branch. Replace `<id>` with the personal id from week 1. Do not commit on `{{ site.exercise_4_base_branch }}`.

```bash
git clone https://github.com/{{ site.exercise_1_github_org }}/{{ site.exercise_4_repo_name }}.git
cd {{ site.exercise_4_repo_name }}
git checkout {{ site.exercise_4_base_branch }}
git pull origin {{ site.exercise_4_base_branch }}
git checkout -b exercise-4-<id>
git push -u origin exercise-4-<id>
```

Log in with the command on the `oc` page. After a later login, select the project again. Every command below writes into the project it selects.

```bash
oc project <your-project>
```

The Aitta token and the Exercise 3 key are already in this project. Do not create those secrets again. Choose a new password for this application. Use a password you do not use anywhere else.

Email that password to {{ site.email }}. The subject is `For exercise 4 check`. Do not commit it, and do not put it in `{{ site.exercise_4_deployment_file }}`.

```bash
oc create secret generic exercise-4-access \
  --from-literal=COURSE_PASSWORD='<password you chose>'

oc apply -f openshift/buildconfigs.yaml
oc apply -f openshift/services.yaml
oc apply -f openshift/deployment-agent.yaml
oc apply -f openshift/deployment-mcp.yaml
oc apply -f openshift/deployment-web.yaml
oc apply -f openshift/route.yaml
```

When the password secret already exists, replace the value and start the agent again. A running container keeps the previous password until that restart. Email the value that is running, with the same subject.

```bash
oc set data secret/exercise-4-access --from-literal=COURSE_PASSWORD='<password you chose>'
oc rollout restart deployment/exercise-4-agent
```

Build from the checkout you have:

```bash
oc start-build exercise-4-agent --from-dir=. --follow
oc start-build exercise-4-mcp --from-dir=. --follow
oc start-build exercise-4-web --from-dir=. --follow
```

Run these one at a time. Wait until the pod named `exercise-4-agent-N-build`, `exercise-4-mcp-N-build`, or `exercise-4-web-N-build` is gone before you start the next. Two build pods at once do not fit once Exercise 2, both Exercise 3 servers, and the three Exercise 4 pods are already charged.

`oc start-build --follow` can exit with `Unable to connect to the server: unexpected EOF` while the build is still `New`. The upload finished. The build did not. Run `oc describe build <name>`. When the quota line is still there, wait for the previous build pod to disappear, or scale BentoML to zero as above. Start that build again after the line is gone.

Read the route host:

```bash
oc get route exercise-4-web -o jsonpath='{.spec.host}{"\n"}'
```

Open `https://<host>{{ site.exercise_4_health_path }}`. A successful check returns a JSON object whose `status` is `ok`. That address stays open. The chat does not. Open `https://<host>/`, enter the password, then open `{{ site.exercise_4_chat_path }}`.

The agent indexes the wine notes when the process starts. The pod stays unready for a few minutes while that index is built. In a trial run the wait was about four minutes, and the log ended with `Indexed 17 wine-note sections`. That wait is startup. The chat model is `{{ site.exercise_2_chat_model }}` and the embedding model is `{{ site.exercise_2_embedding_model }}`, both called through the cloud vendor AI API service at `{{ site.exercise_2_aitta_base_url }}`. This term that service is CSC Aitta. The first question can sit for several minutes while the service loads the chat model.

Write the host into `{{ site.exercise_4_deployment_file }}` as one line:

```text
web https://<host>
```

No path on that line.

## Finish the agent

`{{ site.exercise_4_agent_file }}` has three unfinished parts. The exercise page says what each one must do.

`MODES` offers no tools. Notes offers `search_notes`. Estimate offers `predict_quality`. Both offers both. Model alone stays empty.

`run_turn` records a tool result and does not send it back. Append a tool message for that call before the next model call. Until you do, a turn that uses a tool fails on the next model call.

`SCOPE_RULE` is empty. Write the scope rule there, in your own words.

A change to this file is in the agent image. Rebuild it:

```bash
oc start-build exercise-4-agent --from-dir=. --follow
```

## Finish the MCP tool

`{{ site.exercise_4_mcp_file }}` holds the quality tool. Two names in that file are unfinished.

`INPUT_SCHEMA` is empty. Fill it with the eleven measurement names from `contract.json`, in that order. The agent sees this schema. It does not see the Python function.

`call_quality_service` raises `NotImplementedError`. Replace that with a POST. The URL is `QUALITY_URL` plus `{{ site.exercise_3_predict_path }}`. `QUALITY_URL` is already `{{ site.exercise_4_quality_url }}` inside the project. The header is `{{ site.exercise_3_key_header }}`. The header value is the environment variable `COURSE_KEY`. The body is the measurements the tool received. The return value is the `quality` field of the JSON response.

Rebuild the MCP image after the edit, and start it again:

```bash
oc start-build exercise-4-mcp --from-dir=. --follow
```

The agent image does not contain this file. A prompt-only change does not need a new agent build. A change to `{{ site.exercise_4_mcp_file }}` does need a new MCP build.

## Record the four trials

Use `{{ site.exercise_4_chat_path }}`. The page shows the tool trace under the answer. Run one turn in each mode and paste it into `{{ site.exercise_4_trials_file }}`. The headings are already there: Notes, Estimate, Both, Model alone. Under each, fill Prompt, Trace, Answer, and What this mode changed.

The situations for the four prompts are on the [exercise page](/exercise-4). The sentences are yours.

Commit and push:

```bash
git add {{ site.exercise_4_agent_file }} {{ site.exercise_4_mcp_file }} {{ site.exercise_4_trials_file }} {{ site.exercise_4_deployment_file }}
git commit -m "Wire the agent modes, the scope rule, and the quality tool."
git push
```

`{{ site.exercise_4_workflow }}` runs on each push to `{{ site.exercise_4_branch }}`. A green run means the branch has the mode table, the tool message in the loop, the scope rule, the schema, the handler, the four trials, and a well-formed `{{ site.exercise_4_deployment_file }}`. It does not call Aitta and it does not call FastAPI.

## If a mode does not behave

- `{{ site.exercise_4_health_path }}` returns `ok`, and the chat still waits. The cloud vendor AI API service is loading the model. Leave the question in flight.
- The chat returns `429`. The shared course token was used too many times in one minute. Wait a minute and ask again.
- Every mode answers with an empty trace. `MODES` is still empty, so no tools are offered.
- A tool is listed in the trace and the next reply is an error from the chat API. `run_turn` recorded the result and did not append the tool message. Rebuild the agent image after that edit.
- Notes answers, and Estimate does not. `INPUT_SCHEMA` is still empty, `call_quality_service` still raises `NotImplementedError`, or the `exercise-4-mcp` pod is not running. Rebuild that image after editing the file.
- Estimate returns an error about the key. The MCP pod reads `COURSE_KEY` from the secret `exercise-3-access`. That is the key you already chose for Exercise 3.
- The agent cannot reach the model. `oc get deployment exercise-3-fastapi` should show a ready pod. The address inside the project is `{{ site.exercise_4_quality_url }}`.
- A new pod stays `Pending`, or `oc describe build <name>` says `CannotCreateBuildPod` or `exceeded quota`. Scale `exercise-3-bentoml` to zero, as above. Leave FastAPI running. `oc start-build --follow` can exit with `unexpected EOF` while that build is still `New`. Describe the build before you upload the directory again.
- The route is missing. `oc get route exercise-4-web` and the [debugging page]({{ site.csc_docs_debug }}).

Do not put personal data in the chat. Do not commit the API token, the course key, or the password you chose.
