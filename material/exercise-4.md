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

> Preview. This page is omitted from the public site until it is removed from `unpublished_pages`. The notes below are the assignment to write. They are not student instructions yet. Slide source: `slidev/exercise-4.md`.

### Learning focus

- Tool calling
- MCP as the interface an agent uses to reach a tool
- The Exercise 3 HTTP model staying a plain prediction service

### Notes for the assignment

Write this against the Exercise 2 application and the Exercise 3 FastAPI service. Exercise 3 stays in its own repository and its own two deployments. The agent is a new version of the Exercise 2 application, in the same Rahti project, so it can call the model on the in-project address.

```text
User
  ↓
Exercise 2 application, extended so the turn can call a tool
  ↓
MCP tool predict_quality
  ↓
POST http://exercise-3-fastapi:8000/predict
  header X-Course-Key
  body: the eleven raw measurements from contract.json
  ↓
{"quality": <number>}
  ↓
Answer that includes that number and still explains the wine notes
```

1. One MCP tool, `predict_quality`. The arguments are the eleven columns in Exercise 3 `contract.json`. The tool result is the `quality` number.
2. The tool handler is an HTTP client. It POSTs to the FastAPI Service, with `X-Course-Key` taken from an environment variable. The prompt does not carry the key.
3. The tool targets `http://exercise-3-fastapi:8000`. The BentoML deployment stays the Exercise 3 comparison and is not on this path. The public Route is the fallback only when the agent is not running in that project.
4. MCP is the interface the agent sees. The model server stays the HTTP service from Exercise 3. Introducing MCP here is the point of the week. A second MCP endpoint mounted on the model server can wait.
5. The Exercise 2 prompt tells the assistant to refuse a quality estimate. This exercise changes that instruction: a question that asks for a score calls the tool, and the answer uses the number the tool returned. The notes still explain what the measurements mean. The assistant has no other way to produce the score.
6. Students keep a trace of one tool call: the measurements sent, the quality returned, and a chat answer that contains that quality.
7. The checker, when it is written, can follow the Exercise 2 pattern: a branch on the Exercise 2 repository, a deployment URL, and the course key already collected for Exercise 3. It should call the model only through the student's running agent, or accept the saved trace plus a live chat, and it should not spend the shared Aitta token on a polling loop.

### Grading (20 points)

| Criterion | Points |
| --- | ---: |
| Model connected as tool | 5 |
| Tool invocation implemented | 5 |
| Prediction successfully retrieved | 4 |
| Prediction incorporated into response | 3 |
| End-to-end workflow operates correctly | 3 |
| **Total** | **20** |

The tool-connection points are the MCP tool whose handler calls the Exercise 3 FastAPI service. The invocation and retrieval points are one traced call. The last two points are an answer that contains the quality from that call and still answers from the wine notes.

### Tool contract

Placeholder until the assignment is opened. The contract to adopt is Exercise 3 `contract.json`: eleven raw measurements in, one `quality` float out, header `X-Course-Key` on the HTTP call the tool makes.

### How to submit

Placeholder until the assignment is opened. Expected shape: push the agent change on the Exercise 2 branch, keep the Exercise 3 FastAPI deployment running, and commit the tool-call trace plus one demonstration answer.
