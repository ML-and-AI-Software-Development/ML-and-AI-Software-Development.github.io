---
layout: home
title: About the course
permalink: /
nav_order: 1
---

# {{ site.title }}

Welcome to the {{ site.title }} course ({{ site.credits }} ECTS). In Finnish the course is {{ site.course_name_fi }}.

A short hybrid course in machine learning and AI software development on MLOps platforms, using typical frameworks, technologies, and libraries. It combines in-class teaching, independent exercises, and team work.

The implementation period is {{ site.period_start }}–{{ site.period_end }}. The course follows a continuous development path:

```text
ML Pipeline (for training a specialized AI model)
    ↓
Evaluate & Improve (the specialized AI model)
    ↓
Deploy Model (the specialized AI model)
    ↓
GenAI Application (with a general purpose large-language model, LLM)
    ↓
Evaluate & Improve (the GenAI Application)
    ↓
Integrate Model as Tool (the specialized AI model used by the GenAI Application)
    ↓
Build End-to-End AI System
    ↓
Evaluate & Improve
```

Students use AI-assisted development tools throughout the course. Assessment focuses on implementing, operating, integrating, and improving AI systems.

{% include teaching_sessions.html %}

Week 1 is an introduction and environment setup, with no graded submission. Exercises 1–4 are individual. Exercise 5 is a team project. See the [schedule](/schedule) and the {% include page_link.html path="material/project-description.md" url="/project-description" text="project description" %}.

In week 1, clone the Exercise 1 pipeline repository and create a branch named `exercise-1-<id>`. The teacher gives you the id. Completed exercises are tracked from that branch name, and a branch without the id cannot be graded.

Continuing after week 2 requires the [Exercise 1](/exercise-1) baseline submission by {{ site.week_2_deadline }}: the provided pipeline run, and its results. Students who do not submit it by the deadline are removed from the course.

## Course description

| | |
| --- | --- |
| Code | {{ site.course_code }} |
| Credits | {{ site.credits }} ECTS |
| Degree programme | {{ site.degree_programme }} |
| Teaching language | {{ site.teaching_language }} |
| Course type | {{ site.course_type }} |
| Classification | {{ site.classification }} |
| Responsible teacher | {{ site.teacher_text }} |

### Learning outcomes

After the course, the student:

- recognizes differences between AI software and traditional software
- understands AI and ML lifecycles
- can develop pipelines in an AI context
- understands the role of MLOps and AIOps and typical technologies used in them
- understands AI systems and their components, including agentic AI
- knows how to build a small AI system

Osaamistavoitteet:

- tunnistaa AI-ohjelmiston ja perinteisen ohjelmiston erot
- hahmottaa elinkaaret AI- ja ML-yhteyksissä
- osaa rakentaa prosessointiputkia AI-kontekstissa
- ymmärtää MLOpsin ja AIOpsin roolin ja tyypillisiä niissä käytettyjä teknologioita
- ymmärtää AI-järjestelmiä ja niiden komponentteja, mukaan lukien agenttinen AI
- osaa toteuttaa pienen AI-järjestelmän

### Contents

- Differences between AI software and traditional software
- AI and ML lifecycles
- Pipeline structures in an AI context
- MLOps and AIOps
- AI systems and their components, including agentic AI
- Team exercise: build a small AI system

### Implementation

Hybrid implementation: in-class sessions, Moodle, and team work. Individual assignments and a team deliverable. There is no exam. Sessions are weekly, and teams also meet on their own. A use case may come from a company. Guest lectures are possible and will be announced separately.

Course materials are in Moodle, together with selected articles and documentation. References are announced at the start of the course.

### Prerequisites

Programming fundamentals in Python, Git, and the basics of containers or cloud. Basics of AI, or equivalent skills.

## Teacher

{{ site.teacher_text }}

## Completion via recognition of learning

Recognition of prior learning (RPL / AHOT) is available by agreement. Contact {{ site.teacher_text }} during the first course week. The general process is described on the [recognition of learning](https://www.haaga-helia.fi/en/career-planning/recognition-learning) page.

## Assessment

{: .highlight }

> Week 1 has no graded submission. Graded work starts with Exercise 1. BUT: [week 1](/week-1) has important setups you need to do before you can do Exercise 1 - DO THOSE SETUPS DURING WEEK 1 RIGHT AFTER THE FIRST CLASS ROOM SESSION!

| Activity | Points |
| --- | ---: |
| Exercise 1: ML Pipeline Adaptation and Improvement | 15 |
| Exercise 2: GenAI Application Adaptation and Improvement | 15 |
| Exercise 3: Model Deployment | 20 |
| Exercise 4: GenAI and ML Integration | 20 |
| Exercise 5: Team Project | 30 |
| **Total** | **100** |

Completing an assignment after its deadline can lead to a reduction of 5 points for that exercise.

| Points | Grade |
| --- | ---: |
| 90–100 | 5 |
| 80–89 | 4 |
| 70–79 | 3 |
| 60–69 | 2 |
| 40–59 | 1 |
| 0–39 | 0 |

Qualitative criteria for selected grades:

- **Grade 1.** Basic understanding, a minimum completion, and participation in team work.
- **Grade 3.** The student applies the topics, a pipeline works, and the team work produces a solution.
- **Grade 5.** A comprehensive implementation, including agentic components, and excellent documentation.

{{ site.session_attendance }}

### Estimated workload

| Activity | Estimated hours |
| --- | ---: |
| Exercise 1 | 10–12 |
| Exercise 2 | 10–12 |
| Exercise 3 | 12–15 |
| Exercise 4 | 12–15 |
| Exercise 5 | 35–40 |
| Lectures, demonstrations, project meetings, independent study | 40–50 |
| **Total** | **120–140** |

The target workload matches a {{ site.credits }} ECTS course (about 135 hours).

{: .highlight }

> Passing the course requires a passing grade on the point scale above. {{ site.session_attendance }} Exercise-specific submission rules are on each exercise page.
