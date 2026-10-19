---
layout: page
title: Exercise 1 — ML pipeline
permalink: /exercise-1
nav_order: 4
---

{% include toc.html %}

# Weeks 2–3: Exercise 1 (15 points)

[Slides (PDF)](/slides/exercise-1.pdf)

## ML pipeline adaptation and improvement

Sessions: {{ site.session_2_date }} and {{ site.session_3_date }}.

{: .highlight }

> Full submission deadline: {{ site.exercise_1_deadline }}.

{: .warning }

> **Required to continue the course.** By {{ site.week_2_deadline }}, run the pipeline as provided and submit the baseline results: evidence that the provided pipeline ran, and the baseline metrics. This submission shows that you are continuing on the course. Students who do not submit it by the deadline are removed from the course.

{: .note }

> Slide source: `slidev/exercise-1.md`.

### Learning focus

- Pipeline structures
- AI/ML lifecycle
- Experimentation and iteration
- MLOps fundamentals

The pipeline notebook is `{{ site.exercise_1_notebook_path }}` on the `exercise-1-<id>` branch created in [week 1](/week-1).

### Week 2: run the pipeline as provided

Due {{ site.week_2_deadline }}. On `exercise-1-<id>`, add `Baseline run. Pipeline arguments are unchanged.` under the title `# Demo KFP pipeline` in `{{ site.exercise_1_notebook_path }}` and save the file. Use either option.

**JupyterLab Desktop.** Open the notebook with the [JupyterLab Desktop](/week-1) install from week 1. In the first cell, under `# Demo KFP pipeline`, add the line and save the notebook.

**Notebook source file.** In the first cell, extend the `source` list:

```json
"source": [
    "# Demo KFP pipeline\n",
    "Baseline run. Pipeline arguments are unchanged.\n"
]
```

Commit and push:

```bash
git add {{ site.exercise_1_notebook_path }}
git commit -m "Record the Exercise 1 baseline."
git push
```

#### GitHub Actions for your commit

After the push, open the [Actions tab](https://github.com/{{ site.exercise_1_github_org }}/{{ site.exercise_1_repo_name }}/actions) and select the workflow run for your commit. A successful run means that commit went through CI/CD.

Follow the run from start to finish:

1. The push starts `.github/workflows/run-notebook-in-development-environment.yml` for that commit.
2. The self-hosted runner checks out the commit and executes `{{ site.exercise_1_notebook_path }}`.
3. The notebook submits the pipeline. Kubeflow runs the pipeline Python in its step containers.
4. The training step stores `rmse`, `r2`, `mae`, and the git commit id in MLflow. `run_name` includes the branch name.

#### View the pipeline in Kubeflow

Open the [SSH tunnel from week 1](/week-1#ssh-tunnel-to-the-oss-mlops-platform). In the browser, open Kubeflow at <a href="http://{{ site.kubeflow_host }}:{{ site.kubeflow_port }}">http://{{ site.kubeflow_host }}:{{ site.kubeflow_port }}</a> and find the pipeline run for this commit:

```bash
git rev-parse HEAD
```

In MLflow at <a href="http://{{ site.mlflow_host }}:{{ site.mlflow_port }}">http://{{ site.mlflow_host }}:{{ site.mlflow_port }}</a>, the experiment is `{{ site.mlflow_experiment_name }}` and the commit id is the parameter `git_commit_hash`. Record the Actions run and the three metrics. That is the baseline.

### Week 3: modify the pipeline and compare

Due {{ site.exercise_1_deadline }}. Change `{{ site.exercise_1_notebook_path }}` on `exercise-1-<id>`, commit, and push. Then compare the new metrics with the week 2 baseline.

One example for each kind of modification:

- **Model parameters.** In the pipeline arguments, `alpha` is `0.5` and `l1_ratio` is `0.5`. Set `"alpha": 0.2` and run again.
- **Preprocessing.** The preprocess step fits a `StandardScaler` on every column except the target. Skip scaling and train on the unscaled columns.
- **Features.** Training uses every column except `quality`. Also drop `residual sugar` before `model.fit`, in both the train and test frames.
- **Evaluation metrics.** The train step logs `rmse`, `mae`, and `r2`. Also log the maximum absolute error between the test labels and the predictions.
- **Train/test split.** The split is `train_test_split(data)`, which keeps about 25% of the rows for testing. Change it to `train_test_split(data, test_size=0.3, random_state=42)`.

Implement at least one of these. Commit and push the modified notebook. Repeat both checks from week 2 for this commit: open the GitHub Actions run, then view the pipeline in Kubeflow with the [week 1 tunnel](/week-1#ssh-tunnel-to-the-oss-mlops-platform).

Compare that run with the week 2 baseline. Save this script as `compare_runs.py` in the repository. The tunnel must be open, because the script reads MLflow at `http://{{ site.mlflow_host }}:{{ site.mlflow_port }}`.

```python
import sys
from mlflow.tracking import MlflowClient

TRACKING_URI = "http://{{ site.mlflow_host }}:{{ site.mlflow_port }}"
EXPERIMENT = "{{ site.mlflow_experiment_name }}"
METRICS = ("rmse", "r2", "mae")

def row(client, experiment_id, label, commit):
    runs = client.search_runs(
        [experiment_id],
        # Stored hashes are full SHAs. A short prefix such as 34d91b5 still matches.
        filter_string=f"params.git_commit_hash LIKE '{commit}%'",
        max_results=1,
    )
    values = [f"{label} `{commit}`"]
    metrics = runs[0].data.metrics if runs else {}
    values.extend(str(metrics.get(name, "")) for name in METRICS)
    return "| " + " | ".join(values) + " |"

baseline, modified = sys.argv[1], sys.argv[2]
client = MlflowClient(TRACKING_URI)
experiment = client.get_experiment_by_name(EXPERIMENT)
lines = [
    "# Exercise 1 comparison",
    "",
    "| run | rmse | r2 | mae |",
    "| --- | ---: | ---: | ---: |",
    row(client, experiment.experiment_id, "baseline", baseline),
    row(client, experiment.experiment_id, "modified", modified),
    "",
]
text = "\n".join(lines)
open("comparison.md", "w", encoding="utf-8").write(text)
print(text)
```

```bash
pip install mlflow
python compare_runs.py BASELINE_COMMIT MODIFIED_COMMIT
git add compare_runs.py comparison.md
git commit -m "Compare the Exercise 1 runs."
git push
```

`BASELINE_COMMIT` is the week 2 commit from `git rev-parse --short HEAD` after that push. `MODIFIED_COMMIT` is the week 3 commit. `comparison.md` on `exercise-1-<id>` is the short comparison of the results.

### Submission by {{ site.week_2_deadline }}

- The `exercise-1-<id>` branch on the remote repository
- The GitHub Actions run for the baseline commit
- The Kubeflow run and the MLflow metrics `rmse`, `r2`, and `mae` for that commit id

### Submission by {{ site.exercise_1_deadline }}

- The modified notebook on `exercise-1-<id>`
- The GitHub Actions run for the modified commit
- The Kubeflow run and the MLflow metrics for that commit id
- `comparison.md` on `exercise-1-<id>`

### Grading (15 points)

| Criterion | Points |
| --- | ---: |
| Baseline pipeline executed successfully | 3 |
| Required modification implemented | 4 |
| Modified pipeline executed successfully | 3 |
| Evaluation metrics generated | 3 |
| Baseline and modified results compared | 2 |
| **Total** | **15** |

### How to submit

Push the branch `exercise-1-<id>` to the pipeline repository. The comparison is `comparison.md` on that branch.
