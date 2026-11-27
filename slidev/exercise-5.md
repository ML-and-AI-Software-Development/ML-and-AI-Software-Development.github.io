---
colorSchema: light
fonts:
  sans: Roboto
  weights: "200,400,600,700"
---

# Exercise 5

A new application for a new problem — 30 points

Sessions {{ site.session_7_date }} and {{ site.session_8_date }}.

Deadline {{ site.exercise_5_deadline }}.

<div class="mt-6 p-4 border-4 border-red-700 text-red-800 font-bold text-xl">

Each of these cuts 5 points from the total: a late submission, a team of one, and a README that does not use the required headings in the required order.

</div>

---

## What you build

An Exercise 4 application for a new problem.

A harness, a system prompt, and tools. The chat model answers. The trained model is one tool.

There is no template. Reuse earlier exercise code only by repurposing and customizing it.

The wine-quality exercise is the pattern, not the topic.

---

## Teams

2 or 3 students. Agree the team in the course Microsoft Teams space.

A pair stays open for a third student to join.

<div class="mt-4 p-4 border-4 border-red-700 text-red-800 font-bold">

A team of one loses 5 points. This is the same 5-point reduction as a late submission.

</div>

---

## Training

A few rounds, logged in MLflow. Compare them. Deploy the best model before you connect it to the agent.

Deploy it the way Exercise 3 deployed a model.

The README lists the experiments, which one was selected, and why.

---

## Shape

User → agent → tools → deployed model → answer

Hosting and the agent loop stay on the path from Exercises 3 and 4.

---

## Tools

The trained model is required.

RAG is optional. It does not earn the extra-tool points.

One further tool, other than the special model and other than RAG: online search, or a tool you design. A second extra tool does not add points. A tool you include has to work.

---

## Guardrails

A scope rule for this problem, as in Exercise 4.

A question outside the problem is declined.

The chat model does not invent the prediction. That number comes from the tool.

The model only gets the tools the harness offers.

---

## Ideas

- Customer churn advisor
- Equipment failure assistant
- House price assistant
- Recommendation assistant
- Risk assessment assistant
- Kaggle-based prediction assistant

A small tabular dataset. Kaggle, UCI, OpenML, Hugging Face Datasets, data.europa.eu, avoindata.fi.

No personal data in the dataset or in a RAG index.

---

## Presentation on {{ site.session_8_date }} — 3 points

Present in this session. Show the problem, the chosen model, and one call to that model.

The team needs to tell why this problem, which model was trained and which was deployed, what kind of application this is, which tools are integrated, and how the guardrails keep it on the problem.

That same account is in the README under fixed headings. The remaining tools and the prompt polish can land in the submitted version.

---

## Points

| | |
| --- | ---: |
| Training rounds, the MLflow list, and the deployed model | 7 |
| Classroom presentation on {{ site.session_8_date }} | 3 |
| Model integrated into the agent | 5 |
| Working application | 6 |
| Logic and system prompts for this problem | 3 |
| One extra tool, not the model and not RAG | 3 |
| Guardrails | 3 |
| **Total** | **30** |

---

## Repository

In `{{ site.exercise_1_github_org }}`. Name: `exercise-5-<name>`.

Without that repository, no points can be given.

<div class="mb-4 p-4 border-4 border-red-700 text-red-800 font-bold">

These headings, in this order, spelled like this. Failure to do so loses 5 points. This is the same 5-point reduction as a late submission or a team of one.

</div>

The README uses these headings, in this order:

- `## Team` — GitHub usernames
- `## Why this problem` — why it was selected, and the purpose and problem domain
- `## Model` — what was trained, how the rounds were compared, which one was deployed
- `## Application` — what kind of Exercise 4 application this is
- `## Tools` — the special model, and RAG and/or online search and/or other tools
- `## Guardrails` — how they keep the assistant on this problem
- `## Experiments` — the MLflow experiments, which one was selected, and why

---

## Email

Each student sends it, even when the team work is the same.

Subject: `For exercise 5 check`.

The password, the login URL, and the link to the repository.

Do not commit the password.
