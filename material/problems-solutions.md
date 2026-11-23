---
layout: page
title: Problems and solutions
permalink: /problems-and-solutions
nav_order: 13
---

# Problems and solutions

Common problems for this implementation will be collected here. Each heading is a placeholder.

## Environment setup

Placeholder. Failures while installing or configuring the course environment.

## OSS MLOps platform examples

Placeholder. Failures while running the provided pipeline used in [Exercise 1](/exercise-1).

## GAIK toolkit examples

Failures while running the wine-quality study assistant in [Exercise 2](/exercise-2). The deploy steps are on the [GenAI application](/genai-application) guide. Account, project, `oc`, and pod debugging stay on the Haaga-Helia CSC pages linked from that guide.

- `/api/health` is `ok` and the chat still waits. The cloud vendor AI API service is loading `google/gemma-4-31b-it`. The route allows 15 minutes for that first answer.
- The chat returns `429`. The shared course token was called too often in one minute. Wait and ask the question again.
- The build cannot pull or cannot start. Use the CSC debugging page linked from the guide. The API image is large.
- Do not commit the API token. A token in git is not a valid submission.

## Model deployment

Placeholder. Failures while packaging or calling the endpoint from [Exercise 3](/exercise-3). See also the [deployment guide](/model-deployment).

## Tool integration

Failures while connecting the agent in [Exercise 4](/exercise-4) to the FastAPI service from [Exercise 3](/exercise-3). The deploy steps are on the [agent application](/agent-application) guide.

- Every mode returns an empty trace. `MODES` in `api/routers/agent.py` is still empty.
- The trace shows a tool result and the chat API then returns an error. `run_turn` did not append that result as a tool message. Rebuild the agent image.
- Notes mode answers, and Estimate mode does not. The schema in `mcp_server/predict_quality.py` is still empty, the handler still raises `NotImplementedError`, or the `exercise-4-mcp` pod is not running. Rebuild that image after the edit.
- Estimate mode returns an error about the key. The MCP pod reads `COURSE_KEY` from the secret `exercise-3-access`. That is the Exercise 3 key.
- The agent cannot reach the model. The FastAPI deployment has to stay running. Inside the project the address is `http://exercise-3-fastapi:8000`.
- A new pod stays `Pending`, or `oc describe build <name>` says `CannotCreateBuildPod` or `exceeded quota`. Scale `exercise-3-bentoml` to zero. Leave the FastAPI deployment running. `oc start-build --follow` can exit with `unexpected EOF` while that build is still `New`. Describe the build before you upload the directory again. Each build pod is charged 500m CPU, and the project limit is 4.
- The chat returns `429`. The shared course token was called too often in one minute. Wait and ask again.
