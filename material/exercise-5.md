---
layout: page
title: Exercise 5 — Team project
permalink: /exercise-5
nav_order: 9
---

{% include toc.html %}

# Weeks 7–8: Exercise 5 (30 points)

[Slides (PDF)](/slides/exercise-5.pdf)

## A new application for a new problem

Sessions: {{ site.session_7_date }} and {{ site.session_8_date }}.

{: .highlight }

> Submission deadline: {{ site.exercise_5_deadline }}.

{: .warning }

> Each of these cuts 5 points from the total. A submission after the deadline. A team of one. A README that does not use the required headings, in the required order, spelled as specified. Each rule is repeated where it applies.

Apply what you did in [Exercise 1](/exercise-1), [Exercise 2](/exercise-2), [Exercise 3](/exercise-3), and [Exercise 4](/exercise-4). Build an application of the same kind as Exercise 4, for a new problem. There is no template repository and no template application. You may reuse code from the earlier exercises. Repurpose it and customize it for this problem. The submission shows that you can apply that code.

The problem, the dataset, and the use case are new. The wine-quality exercise is the pattern, not the topic.

### Team

A team has 2 or 3 students. Agree the team in the course Microsoft Teams space. A pair stays open for a third student to join.

{: .warning }

> A team of one loses 5 points. This is the same 5-point reduction as a late submission.

### What you build

The application is an agent in the Exercise 4 sense: a harness, a system prompt, and tools. The chat model answers. The trained model is one tool.

```text
User
  ↓
Agent
  ↓
Tools
  ↓
Deployed model
  ↓
Answer
```

- The trained model is required. Train it the way you trained in Exercise 1. Run a few rounds, log them in MLflow, compare them, and deploy the best one before you connect it to the agent. Deploy it the way you deployed in Exercise 3.
- RAG is optional. It does not earn the extra-tool points. If you add a RAG index, keep it small and do not put personal data in it. Do not put personal data in the dataset either.
- One further tool, other than the special model and other than RAG, earns its own points. Online search qualifies. A tool you design qualifies. A second extra tool does not add points. A tool you include has to work.
- Guardrails keep the agent on this problem. Write a scope rule, as in Exercise 4, for the new problem. A question outside the problem is declined. The chat model does not invent the prediction. That number comes from the tool. The model only gets the tools the harness offers.
- The harness logic and the system prompt are written for this problem. Leaving the wine-exercise text in place does not earn those points.
- Hosting and the agent loop stay on the path from Exercises 3 and 4.

A few training rounds and a small tool set are enough. The aim is a working application, not a maximized score.

### Example ideas

- Customer churn advisor
- Equipment failure assistant
- House price assistant
- Recommendation assistant
- Risk assessment assistant
- Kaggle-based prediction assistant

Start from a small tabular dataset that you can train the way Exercise 1 trained:

- [Kaggle](https://www.kaggle.com/datasets)
- [UCI Machine Learning Repository](https://archive.ics.uci.edu/)
- [OpenML](https://www.openml.org/)
- [Hugging Face Datasets](https://huggingface.co/datasets)
- [data.europa.eu](https://data.europa.eu/) and [avoindata.fi](https://www.avoindata.fi/)

### Presentation on {{ site.session_8_date }} (3 points)

Present in this session. Show the problem, the chosen model, and the application running one call to that model. That presentation is 3 points. The remaining tools and the prompt polish can land in the version you submit by {{ site.exercise_5_deadline }}.

The team needs to tell:

- why this problem was selected
- which model was trained, how the rounds were compared, and which one was deployed
- what kind of Exercise 4 application this became
- which tools are integrated: the special model, and RAG and/or online search and/or other tools
- how the guardrails keep the assistant on this problem

That same account is in the README of the submitted repository, under the headings below.

### Grading (30 points)

| Criterion | Points | What earns it |
| --- | ---: | --- |
| Training rounds and the deployed model | 7 | A few MLflow experiments on the team's dataset, the `## Experiments` section with which one was selected and why, and that model deployed |
| Classroom presentation | 3 | The presentation on {{ site.session_8_date }}: the problem, the chosen model, one call to that model, and the account the team needs to tell |
| Model integrated into the agent | 5 | The agent can call the deployed model when the question needs it, and the answer uses that result |
| Working application | 6 | The application runs end to end and can be demonstrated |
| Customized logic and system prompts | 3 | The harness logic and the system prompt are written for this problem, not left as the wine-exercise text |
| One extra tool | 3 | One working tool that is neither the special model nor RAG |
| Guardrails | 3 | A scope rule for this problem: an outside question is declined, and the prediction comes from the tool |
| **Total** | **30** | |

### How to submit

Create a repository in [{{ site.exercise_1_github_org }}](https://github.com/{{ site.exercise_1_github_org }}) and push the application there. Name it `exercise-5-<name>`, with the name your team chooses in place of `<name>`. The work is evaluated from that repository. Without a repository in that org, no points can be given.

{: .warning }

> The README has to use these headings, in this order, spelled like this. Failure to do so loses 5 points. This is the same 5-point reduction as a late submission or a team of one.

The README uses these headings, in this order:

```markdown
## Team
## Why this problem
## Model
## Application
## Tools
## Guardrails
## Experiments
```

| Heading | What to write |
| --- | --- |
| `## Team` | GitHub usernames of the students on the team |
| `## Why this problem` | Why this problem was selected, and the purpose and problem domain |
| `## Model` | Which model was trained, how the rounds were compared, and which one was deployed |
| `## Application` | What kind of Exercise 4 application this is |
| `## Tools` | Which tools are integrated: the special model, and RAG and/or online search and/or other tools |
| `## Guardrails` | How the guardrails keep the assistant on this problem |
| `## Experiments` | The MLflow experiments, which one was selected, and why |

That is the same account the team needs to tell on {{ site.session_8_date }}. Grading and testing use it. `## Experiments` is how the training rounds are checked.

Each student emails {{ site.email }}, even when the team work is the same. The subject is `For exercise 5 check`. One message contains:

- the password for the deployed application
- the login URL of the deployed application
- the link to the team repository

The password is the login password for the running application, as in Exercises 2 and 4. Do not commit it. The application has to be open at that URL. It is tested for the purpose and the problem domain under `## Why this problem`.

The version that is graded is the one submitted by {{ site.exercise_5_deadline }}.
