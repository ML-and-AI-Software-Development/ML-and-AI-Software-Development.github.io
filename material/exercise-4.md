---
layout: page
title: Exercise 4 — GenAI and ML integration
permalink: /exercise-4
nav_order: 7
---

{% include toc.html %}

# Week 6: Exercise 4 (20 points)

## GenAI and ML integration

Session: {{ site.session_6_date }}. The same session includes the [team project kickoff](/project-kickoff).

{: .highlight }

> Submission deadline: {{ site.exercise_4_deadline }}.

{: .note }

> Placeholder page. Tool-calling instructions will be added before week 6. Slide source: `slidev/exercise-4.md`.

### Learning focus

- Tool calling
- Agentic AI systems
- AI system orchestration
- Integration of AI components

### Activities

Combine:

- Exercise 2 GenAI application
- Exercise 3 deployed ML model

Target architecture:

```text
User
  ↓
GAIK Application
  ↓
Prediction Tool
  ↓
ML Model Endpoint
  ↓
Prediction Result
  ↓
Generated Response
```

### Submission

- Integrated application
- Tool implementation
- Tool invocation trace
- Demonstration interaction

### Grading (20 points)

| Criterion | Points |
| --- | ---: |
| Model connected as tool | 5 |
| Tool invocation implemented | 5 |
| Prediction successfully retrieved | 4 |
| Prediction incorporated into response | 3 |
| End-to-end workflow operates correctly | 3 |
| **Total** | **20** |

## Placeholder sections

### Tool contract

Placeholder. Describe the prediction tool inputs and outputs students must implement.

### How to submit

Placeholder. State where the integrated application, tool trace, and demonstration interaction are submitted.
