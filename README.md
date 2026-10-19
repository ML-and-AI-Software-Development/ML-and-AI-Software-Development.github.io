# ML and AI Software Development

Intended site: <https://ml-and-ai-software-development.github.io/>

Local source only. This repository has not been created on GitHub and has not been deployed.

The site keeps the Jekyll layout, navigation, schedule table, weekly material pages, and Slidev sources from [Software Development Project 1](https://github.com/software-development-project-1/software-development-project-1.github.io). Previous course text, images, and slide PDFs are removed. Pages are placeholders based on the course description.

## Attribution

This site is adapted from [Software Development Project 1](https://software-development-project-1.github.io/) ([source repository](https://github.com/software-development-project-1/software-development-project-1.github.io)). The same note is in the site footer.

Dates, deadlines, the teacher line, the classroom, and session hours live in [`_config.yml`](_config.yml). The weekly session blurb is [`_includes/teaching_sessions.html`](_includes/teaching_sessions.html), and it reads those config values. Published pages use `{{ site.* }}` instead of repeating them.

## New implementation checklist

1. Update [teacher's information](_config.yml) and the [Flinga board link](_config.yml) for project team enrolment
2. Confirm the [deadline schedule](_config.yml)
3. Update the session fields in [`_config.yml`](_config.yml). [`_includes/teaching_sessions.html`](_includes/teaching_sessions.html) prints them.
4. When a page is ready for students, remove its path from `unpublished_pages` in [_config.yml](_config.yml). The GitHub Pages build omits that list. `preview-site.sh` still shows those pages.
5. Replace placeholder sections on each material page with the session instructions
6. Export slide PDFs from `slidev/` into `slides/` when the decks are ready

## Page map

| Schedule row | Material page | Slidev source |
| --- | --- | --- |
| `session_1_date` Week 1 | [material/week-1.md](material/week-1.md) | [slidev/week-1.md](slidev/week-1.md) |
| `session_2_date`, `session_3_date` Exercise 1 | [material/exercise-1.md](material/exercise-1.md) | [slidev/exercise-1.md](slidev/exercise-1.md) |
| `session_3_date`, `session_4_date` Exercise 2 | [material/exercise-2.md](material/exercise-2.md) | [slidev/exercise-2.md](slidev/exercise-2.md) |
| `session_5_date` Exercise 3 | [material/exercise-3.md](material/exercise-3.md) | [slidev/exercise-3.md](slidev/exercise-3.md) |
| `session_6_date` Exercise 4 | [material/exercise-4.md](material/exercise-4.md) | [slidev/exercise-4.md](slidev/exercise-4.md) |
| `session_6_date` Project kickoff | [material/project-kickoff.md](material/project-kickoff.md) | [slidev/project-kickoff.md](slidev/project-kickoff.md) |
| `session_7_date`, `session_8_date` Exercise 5 | [material/exercise-5.md](material/exercise-5.md) | [slidev/exercise-5.md](slidev/exercise-5.md) |

Supporting pages: [project description](material/project-description.md), [model deployment guide](material/model-deployment.md), [GenAI application guide](material/genai-application.md), [problems and solutions](material/problems-solutions.md). Supplementary notes live in `material/other/` and are not navigation pages.

## Local preview

From the parent directory, `preview-site.sh` builds the full site, including pages listed in `unpublished_pages`. The GitHub Pages workflow builds with `JEKYLL_ENV=production` and omits those pages.

```bash
../preview-site.sh
```
