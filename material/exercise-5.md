---
layout: page
title: Exercise 5 — Team project
permalink: /exercise-5
nav_order: 9
---

{% include toc.html %}

# Weeks 7–8: Exercise 5 (30 points)

## Team project: end-to-end AI system

Sessions: {{ site.session_7_date }} and {{ site.session_8_date }}. The implementation period ends on {{ site.period_end }}.

{: .highlight }

> Submission deadline: {{ site.exercise_5_deadline }}.

{: .note }

> Placeholder page. Demonstration slots and the submission checklist will be added before week 7. Slide source: `slidev/exercise-5.md`.

### Goal

Build a complete AI system using a new dataset and a new use case.

Students apply the workflow learned during Exercises 1–4. The kickoff deliverable is the [project proposal](/project-kickoff).

### Required system components

1. Dataset preparation
2. Training pipeline
3. Model evaluation
4. Improvement iteration
5. Model deployment
6. Tool/API integration
7. GenAI application
8. End-to-end workflow

### Notes for the GenAI application

Exercise 2 answers from notes that are already indexed. This project uses the team's own sources.

Choose a small set of texts the use case is allowed to quote. Split them into short passages. Embed each passage and store the vectors. A question then selects a few passages, those passages are written into the prompt, and the model answers once. That is the same context enrichment as Exercise 2. The team does the embedding and storing for its own text. Name the sources, keep the index small, and do not put personal data in it.

### Required improvement loop

Teams must demonstrate:

```text
Version 1
    ↓
Measurement
    ↓
Improvement
    ↓
Re-measurement
```

Examples:

- Better prediction performance
- Better prompt performance
- Better tool success rate
- Improved system accuracy

The objective is to demonstrate iterative improvement, not to maximize performance.

### Final demonstration

Teams demonstrate:

- Training pipeline
- Evaluation results
- Improvement iteration
- Model deployment
- Tool integration
- GenAI application
- End-to-end workflow

### Grading (30 points)

| Criterion | Points |
| --- | ---: |
| Dataset prepared | 3 |
| Training pipeline implemented | 5 |
| Model trained and evaluated | 5 |
| Improvement iteration completed | 4 |
| Model deployed | 4 |
| Tool/API integration implemented | 4 |
| End-to-end workflow functions correctly | 5 |
| **Total** | **30** |

## Placeholder sections

### Teamwork expectations

Placeholder. State team size, how work is divided, and what each member must be able to explain in the demonstration.

### How to submit

Placeholder. State the repository contents and what is shown in the final demonstration on {{ site.session_8_date }}.
