---
layout: page
title: Week 1 — Introduction and environment setup
permalink: /week-1
nav_order: 3
---

{% include toc.html %}

# Week 1: Introduction and environment setup

[Slides (PDF)](/slides/week-1.pdf)

Session: {{ site.session_1_date }}, {{ site.session_weekday }} {{ site.session_hours }}.

{: .note }

> Slide source: `slidev/week-1.md`. Repository setup for Exercise 1 is below. Other laboratory steps are still placeholders.

## Lecture topics

- AI software vs. traditional software
- AI and ML lifecycles
- AI system components
- MLOps and AIOps overview
- OSS MLOps Platform overview
- GAIK Toolkit overview
- Course project overview

## Laboratory activities

- Install JupyterLab Desktop
- Repository setup for [Exercise 1](/exercise-1)
- Open the pipeline notebook in JupyterLab
- Open the SSH tunnel to Kubeflow and MLflow

## JupyterLab Desktop

Install [JupyterLab Desktop]({{ site.jupyterlab_desktop_releases }}) for viewing and editing the pipeline notebook.

Download the installer for your machine from the [latest release]({{ site.jupyterlab_desktop_releases }}):

- Windows: `JupyterLab-Setup-Windows-x64.exe`
- macOS Apple silicon: `JupyterLab-Setup-macOS-arm64.dmg`
- macOS Intel: `JupyterLab-Setup-macOS-x64.dmg`
- Debian or Ubuntu: `JupyterLab-Setup-Debian-x64.deb`

On Debian or Ubuntu, after the download:

```bash
sudo apt install ./JupyterLab-Setup-Debian-x64.deb
```

## Repository setup for Exercise 1

The pipeline repository is [{{ site.exercise_1_github_org }}/{{ site.exercise_1_repo_name }}](https://github.com/{{ site.exercise_1_github_org }}/{{ site.exercise_1_repo_name }}). Clone it, start from the `{{ site.exercise_1_base_branch }}` branch, and create your own branch.

The teacher gives you an id at the start of the course. Name the branch `exercise-1-<id>`, with that id in place of `<id>`. Completed exercises are tracked from the branch name. If the id is missing from the branch name, the exercise cannot be graded.

```bash
git clone https://github.com/{{ site.exercise_1_github_org }}/{{ site.exercise_1_repo_name }}.git
cd {{ site.exercise_1_repo_name }}
git checkout {{ site.exercise_1_base_branch }}
git pull origin {{ site.exercise_1_base_branch }}
git checkout -b exercise-1-<id>
git push -u origin exercise-1-<id>
```

Open JupyterLab Desktop, choose this repository folder, and open `{{ site.exercise_1_notebook_path }}`.

Study what the pipeline does. While you read, ponder what each step will result in, and what compiling the pipeline does. A written answer is not part of the exercise.

## SSH tunnel to the OSS MLOps platform

The teacher gives you the private key file `{{ site.ossmlops_ssh_key }}` and the host name. The host name on this page is `{{ site.ossmlops_vm_address }}`. The connection forwards ports only.

```bash
chmod 600 {{ site.ossmlops_ssh_key }}

ssh -v -i {{ site.ossmlops_ssh_key }} -N \
  -L {{ site.kubeflow_port }}:{{ site.kubeflow_host }}:{{ site.kubeflow_port }} \
  -L {{ site.mlflow_port }}:{{ site.mlflow_host }}:{{ site.mlflow_port }} \
  {{ site.ossmlops_ssh_user }}@{{ site.ossmlops_vm_address }}
```

Leave that command running. Kubeflow is at <a href="http://{{ site.kubeflow_host }}:{{ site.kubeflow_port }}">http://{{ site.kubeflow_host }}:{{ site.kubeflow_port }}</a> and MLflow is at <a href="http://{{ site.mlflow_host }}:{{ site.mlflow_port }}">http://{{ site.mlflow_host }}:{{ site.mlflow_port }}</a>. [Exercise 1](/exercise-1) uses this tunnel to view the pipeline runs.

Look through the Kubeflow and MLflow pages and browse the runs already there from the demo notebook pipeline. Ponder what the pipeline is doing at the different steps shown in Kubeflow, and how MLflow relates to those notebook pipeline steps. A written answer is not part of the exercise.

{: .highlight }

> There is no graded submission in week 1. The branch has to exist before the [Exercise 1](/exercise-1) baseline run.

## Deliverable

No graded submission.

## Placeholder sections

### Environment setup

Placeholder. Document the required tools, accounts, and how to verify that the environment runs the OSS MLOps and GAIK examples.

### Course project overview

The later exercises build one path: adapt an ML pipeline, adapt a GenAI application, deploy the improved model, connect that model to the GenAI application as a tool, then build a new end-to-end system in a team. Details are on the [schedule](/schedule) and the {% include page_link.html path="material/project-description.md" url="/project-description" text="project description" %}.
