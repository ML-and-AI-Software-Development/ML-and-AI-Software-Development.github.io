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

Placeholder. Failures while connecting the GenAI application to the model in [Exercise 4](/exercise-4).
