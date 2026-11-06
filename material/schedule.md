---
layout: page
title: 📅 Schedule
permalink: /schedule
nav_order: 2
---

# Schedule

{% include teaching_sessions.html %}

Sessions are on {{ site.session_weekday }}. Exercise 1 runs across weeks 2–3. Exercise 2 runs across weeks 4–5: the baseline is due {{ site.exercise_2_baseline_deadline }}, and the prompt change is due {{ site.exercise_2_deadline }}. Exercise 3 starts in week 5 while Exercise 2 is still open. The team project starts with a kickoff on week 6 and is implemented on weeks 7–8.

{: .note }

> Deadlines below are proposed placeholders (`_config.yml`). Confirm them before the period starts.

| Date | Topics | Exercises |
| --- | --- | --- |
| {{ site.session_1_date }} | [Week 1: Introduction and environment setup](/week-1) | Install JupyterLab Desktop. Clone the Exercise 1 repository, create branch `exercise-1-<id>`, and open the SSH tunnel. No graded submission |
| {{ site.session_2_date }} | [Exercise 1](/exercise-1) starts: ML pipeline adaptation and improvement | [Exercise 1](/exercise-1) baseline run and results, ⚠️ deadline: {{ site.week_2_deadline }}. Required to continue the course. Full exercise deadline: {{ site.exercise_1_deadline }} |
| {{ site.session_3_date }} | [Exercise 1](/exercise-1) continues: ML pipeline adaptation and improvement | [Exercise 1](/exercise-1), ⚠️ deadline: {{ site.exercise_1_deadline }} |
| {{ site.session_4_date }} | {% include page_link.html path="material/exercise-2.md" url="/exercise-2" text="Exercise 2" %} starts: deploy the ready GenAI application | {% include page_link.html path="material/exercise-2.md" url="/exercise-2" text="Exercise 2" %} baseline, ⚠️ deadline: {{ site.exercise_2_baseline_deadline }} |
| {{ site.session_5_date }} | {% include page_link.html path="material/exercise-2.md" url="/exercise-2" text="Exercise 2" %} continues: prompt change and comparison. {% include page_link.html path="material/exercise-3.md" url="/exercise-3" text="Exercise 3" %} starts: Model deployment | {% include page_link.html path="material/exercise-2.md" url="/exercise-2" text="Exercise 2" %} modification, ⚠️ deadline: {{ site.exercise_2_deadline }}. {% include page_link.html path="material/exercise-3.md" url="/exercise-3" text="Exercise 3" %}, ⚠️ deadline: {{ site.exercise_3_deadline }} |
| {{ site.session_6_date }} | {% include page_link.html path="material/exercise-4.md" url="/exercise-4" text="Exercise 4" %}: GenAI and ML integration; {% include page_link.html path="material/project-kickoff.md" url="/project-kickoff" text="team project kickoff" %} | {% include page_link.html path="material/exercise-4.md" url="/exercise-4" text="Exercise 4" %}, ⚠️ deadline: {{ site.exercise_4_deadline }}. Project proposal, ⚠️ deadline: {{ site.project_proposal_deadline }} |
| {{ site.session_7_date }} | {% include page_link.html path="material/exercise-5.md" url="/exercise-5" text="Exercise 5" %} starts: end-to-end AI system | {% include page_link.html path="material/exercise-5.md" url="/exercise-5" text="Exercise 5" %}, ⚠️ deadline: {{ site.exercise_5_deadline }} |
| {{ site.session_8_date }} | {% include page_link.html path="material/exercise-5.md" url="/exercise-5" text="Exercise 5" %} continues: improvement iteration and demonstration | {% include page_link.html path="material/exercise-5.md" url="/exercise-5" text="Exercise 5" %}, ⚠️ deadline: {{ site.exercise_5_deadline }}. Period ends {{ site.period_end }}. |
