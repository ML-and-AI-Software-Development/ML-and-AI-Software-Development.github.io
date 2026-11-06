---
layout: page
title: GenAI application
permalink: /genai-application
nav_order: 12
---

{% include toc.html %}

# GenAI application

This guide is the deploy-and-modify path for [Exercise 2](/exercise-2). The application is already built. You publish it on your own Rahti project and then change one prompt.

Account, project, the `oc` command, a private Git repository, and debugging are documented by Haaga-Helia. Follow those pages. This guide does not replace them. It names the course values those pages do not know.

| Step | Page |
| --- | --- |
| CSC account and student start | [Opiskelijan aloitusohjeet]({{ site.csc_docs_student_start }}) |
| Create the Rahti project | [Projektin luonti]({{ site.csc_docs_rahti_project }}) |
| Install `oc` | [Komentorivityökalun asennus]({{ site.csc_docs_oc }}) |
| Build from a private repository | [Julkaisu yksityisestä repositoriosta]({{ site.csc_docs_private_repo }}) |
| When a build or a pod fails | [Virheenjäljitys]({{ site.csc_docs_debug }}) |

The Spring and React recipes on the [CSC services site]({{ site.csc_docs_home }}) are the usual shape of a student project. This application is a Next.js site plus a FastAPI service, so use those pages for the account and the project, and use the commands below for the two builds.

## Run the provided example

Clone `{{ site.exercise_2_repo_name }}`. `{{ site.exercise_2_base_branch }}` is the ready application, shared by the class. Create `{{ site.exercise_2_branch }}` from it and do all of the work on that branch. Replace `<id>` with the personal id from week 1. Do not commit on `{{ site.exercise_2_base_branch }}`.

```bash
git clone https://github.com/{{ site.exercise_1_github_org }}/{{ site.exercise_2_repo_name }}.git
cd {{ site.exercise_2_repo_name }}
git checkout {{ site.exercise_2_base_branch }}
git pull origin {{ site.exercise_2_base_branch }}
git checkout -b exercise-2-<id>
git push -u origin exercise-2-<id>
```

Log in with the command on the `oc` page. `oc new-project` on the project page selects the project it creates. Those pages do not show how to select that project again. After a later login, run this first. Every command below writes into the project it selects.

```bash
oc project <your-project>
```

Choose a password for this deployment. Use a password you do not use anywhere else. The API token is the value given in class.

Put the password in `exercise-2-access` before `oc apply` of the deployments.

Email that same password to {{ site.email }}. The subject is `For exercise 2 check`.

Do not commit it, and do not put it in `deployment.txt`.

Open the site later with the password you chose. The commands below run from the repository.

```bash
oc create secret generic exercise-2-aitta \
  --from-literal=AITTA_API_KEY='<token given in class>'
oc create secret generic exercise-2-access \
  --from-literal=COURSE_PASSWORD='<password you chose>'

oc apply -f openshift/buildconfigs.yaml
oc apply -f openshift/services.yaml
oc apply -f openshift/deployment-api.yaml
oc apply -f openshift/deployment-frontend.yaml
oc apply -f openshift/route.yaml
```

`oc create` is for the first time. When the secret already exists, replace the value and start the containers again. A running container keeps the previous password until that restart. Email the value that is running, with the same subject.

```bash
oc set data secret/exercise-2-aitta --from-literal=AITTA_API_KEY='<token given in class>'
oc set data secret/exercise-2-access --from-literal=COURSE_PASSWORD='<password you chose>'
oc rollout restart deployment/exercise-2-api deployment/exercise-2-web
```

In `openshift/buildconfigs.yaml`, replace `exercise-2-ID` with your branch name if a build is started from GitHub. To build the checkout you already have:

```bash
oc start-build exercise-2-api --from-dir=. --follow
oc start-build exercise-2-web --from-dir=. --follow
```

Read the route host:

```bash
oc get route exercise-2-web -o jsonpath='{.spec.host}{"\n"}'
```

Open `https://<host>{{ site.exercise_2_health_path }}`. A successful check returns a JSON object whose `status` is `ok`. That address stays open so you can see that the process is up. The chat does not. Open `https://<host>/` and enter the password you chose. Then open `/rag`. A request without that password is rejected, including a direct call to the chat API.

The API indexes three short notes when it starts. The chat model is `{{ site.exercise_2_chat_model }}` and the embedding model is `{{ site.exercise_2_embedding_model }}`, both called through the cloud vendor AI API service at `{{ site.exercise_2_aitta_base_url }}`. This term that service is CSC Aitta. The first question can sit for several minutes while the service loads the chat model. The route waits up to 15 minutes for that.

## Record baseline behavior

Ask this question in the chat. Do not change the prompt first.

```text
{{ site.exercise_2_fixed_question }}
```

Save the question and the reply as `baseline-answer.md`. Put the route URL, with no path, in `deployment.txt`. Create `BASELINE.md` containing only this sentence:

```text
{{ site.exercise_2_baseline_marker }}
```

Commit and push those three files on `exercise-2-<id>`. The prompt file at this commit must not yet contain the required paragraph. `git push` updates that branch. It does not update `{{ site.exercise_2_base_branch }}`.

```bash
git add BASELINE.md deployment.txt baseline-answer.md
git commit -m "Record the Exercise 2 baseline."
git push
```

## Modify the application

Edit `CUSTOM_RAG_PROMPT` in `{{ site.exercise_2_prompt_file }}`. The paragraph below is a starting point. Change it in your own words before you add it. The text in the file must not be this paragraph unchanged. Leave the two model ids unchanged. Your wording is what makes this answer differ from the baseline answer.

{: .note }

> The changed prompt has to be your own original version. A copy of another student's prompt is not allowed. The 4 points for the required modification require that original version.

```text
{{ site.exercise_2_required_prompt }}
```

Commit and push, then build again:

```bash
git add {{ site.exercise_2_prompt_file }}
git commit -m "Change the prompt in my own words."
git push
oc start-build exercise-2-api --from-dir=. --follow
```

The frontend does not need a new build for a prompt change. The API does.

## Re-run and compare

Ask the same fixed question. Save the question and the reply as `modified-answer.md`.

Write `comparison.md`. Name the baseline answer and the modified answer, and say what changed in the wording or the citation. The two replies should differ because the prompts differ. Commit and push.

```bash
git add modified-answer.md comparison.md
git commit -m "Compare the Exercise 2 answers."
git push
```

`{{ site.exercise_2_workflow }}` runs on each push to `{{ site.exercise_2_branch }}`. A green run means that branch has the prompt file, the pinned model ids, and well-formed submission files when those files are present. It does not call the cloud vendor AI API service.

## If the answer does not arrive

- `{{ site.exercise_2_health_path }}` returns `ok`, and the chat still waits. The cloud vendor AI API service is loading the model. Leave the question in flight.
- The chat returns `429`. The shared course token was used too many times in one minute. Wait a minute and ask again.
- The route is missing. `oc get route exercise-2-web` and the [debugging page]({{ site.csc_docs_debug }}).
- A pod is `OOMKilled` or `ImagePullBackOff`. The same debugging page. The API image is large because it installs the course RAG library.

Do not put personal data in the chat. Do not commit the API token or the password you chose.

## Connect a prediction tool

Exercise 4 adds one tool to this same assistant. The tool calls the Exercise 1 quality model, reached through an MCP service, and the assistant reports that estimate next to the cited note. The Exercise 2 repository does not contain that tool. Deploying the quality model itself is [Exercise 3](/exercise-3), on the OSS MLOps platform, which is a different step from this Rahti application.
