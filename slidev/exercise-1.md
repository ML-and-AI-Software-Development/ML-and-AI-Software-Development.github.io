---
colorSchema: light
fonts:
  sans: Roboto
  weights: "200,400,600,700"
---

# Exercise 1

ML pipeline adaptation and improvement — 15 points

Sessions {{ site.session_2_date }} and {{ site.session_3_date }}.

The baseline run is due {{ site.week_2_deadline }}. The full exercise is due {{ site.exercise_1_deadline }}.

The baseline is required to continue the course.

---

## Learning focus

- Pipeline structure
- The ML lifecycle as a loop
- Experimentation: many runs, then one comparison
- MLOps: the run is tracked, not only the code

---

## ML work is experimental

Application code: build one version, ship many copies.

ML: try many candidates, and ship one that is good enough.

Each try changes preparation, features, parameters, the split, or the metrics. The evaluation metrics decide which candidate stays.

---

## Where MLOps sits

MLOps is the engineering around that loop: experiment, run, record, compare, iterate.

In this exercise:

- The notebook defines the pipeline
- GitHub Actions runs that notebook for your commit
- Kubeflow executes the steps in containers
- MLflow records parameters, metrics, and the git commit

---

## The pipeline

Data, then preprocess, then train, then evaluate.

Writing the steps down makes the run reproducible. The same commit produces the same pipeline.

You need that for the first working model, and again when performance has to be compared after a change.

---

## What a run records

The training step logs `rmse`, `r2`, and `mae`.

It also stores `git_commit_hash`. The MLflow experiment is `demo-notebook`. The run name includes your branch.

That commit id is how you find the run in Kubeflow and in MLflow.

---

## Week 2 — baseline, unchanged

On `exercise-1-<id>`, under `# Demo KFP pipeline`, add:

`Baseline run. Pipeline arguments are unchanged.`

Commit and push. Then check three things:

1. The GitHub Actions run for that commit
2. The Kubeflow run, through the week 1 SSH tunnel
3. `rmse`, `r2`, and `mae` in MLflow for that commit id

Due {{ site.week_2_deadline }}.

---

## Week 3 — one change, then compare

Change the notebook on the same branch. Commit and push.

Repeat both checks for the new commit: Actions, then Kubeflow.

Save `compare_runs.py` from the exercise page. Run it with the baseline commit and the modified commit. Commit `comparison.md`.

Due {{ site.exercise_1_deadline }}.

---

## Choose at least one change

- Parameters: `alpha` and `l1_ratio` are `0.5`. One example is `"alpha": 0.2`
- Preprocessing: skip `StandardScaler` and train on the unscaled columns
- Features: also drop `residual sugar` before `model.fit`
- Metrics: also log the maximum absolute error
- Split: `test_size=0.3` and `random_state=42`

---

## Points

- Baseline pipeline executed — 3
- Required modification implemented — 4
- Modified pipeline executed — 3
- Evaluation metrics generated — 3
- Baseline and modified results compared — 2

Push `exercise-1-<id>`. The comparison is `comparison.md` on that branch.

---

## While you watch a run

In Kubeflow, follow the step graph: what each step receives and what it produces.

In MLflow, the metrics are the decision. Say which change you made, and which of `rmse`, `r2`, and `mae` moved.
