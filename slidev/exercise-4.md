---
colorSchema: light
fonts:
  sans: Roboto
  weights: "200,400,600,700"
---

# Exercise 4

GenAI and ML integration — 20 points

Week 6. Deadline is `exercise_4_deadline` in `_config.yml`.

Preview notes. This deck is not the assignment yet.

---

## Path

User → Exercise 2 app, with a tool → MCP `predict_quality` → Exercise 3 FastAPI → quality → answer

---

## Notes to turn into the assignment

- One MCP tool. Arguments are the eleven raw measurements.
- The handler POSTs to `http://exercise-3-fastapi:8000/predict` with `X-Course-Key`.
- BentoML stays the Exercise 3 comparison.
- The answer uses the tool's number and still explains the wine notes.
- Save the tool trace and one demonstration answer.
