---
layout: page
title: Extra reading — agent systems
permalink: /agent-reading
nav_order: 15
---

{% include toc.html %}

{% comment %}
Teacher: external URLs below were not fetched when this page was written.
OpenCode has a docs home only. Its hooks page was not confirmed.
{% endcomment %}

# Extra reading: agent systems

[Exercise 4](/exercise-4) writes, in one file, what can nowadays be called an "agent harness": a loop, a tool list, a scope rule, and one MCP tool. That is enough to see an agent choose a tool, and to see what the answer does when the notes, the tool, both, or neither are available.

A code library and an engine are two other arrangements people call a harness. A library is a harness your program calls. An engine is a harness that already runs, which you configure. You do not need either of them for the exercise. They are the usual next step when the system grows past one file you want to maintain by hand.

## Code-based frameworks

A code-based framework is a library your program calls. You still write the application. The library owns pieces that get expensive to reinvent: the tool loop, conversation memory, retries, tracing, and the adapters for many model vendors. The application passes in the tools and the instructions.

Use one when the hand-written loop is no longer the thing you want to maintain. A second tool, a longer memory, or a requirement to record every step are the usual reasons. The Exercise 4 loop stays visible on purpose. These libraries hide that loop behind their own API, which is what you want once the loop itself is no longer the lesson.

The documentation homes below are the places to start. Names move. Open the site and follow its current introduction.

| Library | What people use it for | Documentation |
| --- | --- | --- |
| LangChain | Model calls, tools, and retrieval wired as ordinary Python | <https://python.langchain.com/> |
| LangGraph | An agent as a graph of steps, with explicit state and branches | <https://langchain-ai.github.io/langgraph/> |
| LlamaIndex | Indexes and query engines over a document collection | <https://docs.llamaindex.ai/> |
| CrewAI | Several role-shaped agents working on one task | <https://docs.crewai.com/> |
| Pydantic AI | Tool calls with typed inputs and outputs | <https://ai.pydantic.dev/> |
| OpenAI Agents SDK | A small agent loop aimed at OpenAI-compatible models | <https://openai.github.io/openai-agents-python/> |
| Google Agent Development Kit | Agents, tools, and evaluation around Gemini and other models | <https://google.github.io/adk-docs/> |
| Semantic Kernel | Plugins and planners used from Python, C#, and Java | <https://learn.microsoft.com/semantic-kernel/> |
| smolagents | A short agent loop from Hugging Face, close to the code | <https://huggingface.co/docs/smolagents> |

MCP is the tool interface, independent of which library runs the loop. The specification is at <https://modelcontextprotocol.io/>. The Python SDK used by the kind of server Exercise 4 contains is at <https://github.com/modelcontextprotocol/python-sdk>.

Exercise 2 already uses a document type from LangChain, inside the GAIK index. That is not the LangChain agent stack. Exercise 4 does not add it.

## Engine-based agents

An engine-based agent is a product that already contains the loop. Claude Code and OpenCode are two of them. Codex CLI and similar coding agents work the same way. You do not write the turn that calls the model, runs a tool, and calls the model again. You describe the job, and you configure what the engine is allowed to see and do.

The configuration is a set of files in the project:

- **Instructions.** A file such as `CLAUDE.md`, or a skill file `SKILL.md`, tells the engine who it is for this repository and what it must do before it edits anything.
- **Skills.** A skill is a folder the engine can open when the task matches its description. Long reference material stays beside the skill and is read only when needed.
- **MCP servers.** The engine connects to tools you did not write into its own process. Exercise 4's quality tool is the same idea, with the server deployed next to the agent instead of started by a desktop application.
- **Hooks.** A hook is a command the engine runs at a fixed moment, such as before a tool call or after an edit. The hook can allow the step, record it, or stop it. The engine's own documentation is where the event names live.

The engine already has the file tools, the permission prompts, and the conversation. The project supplies the context and the rules.

| Engine | What it is | Documentation |
| --- | --- | --- |
| Claude Code | Anthropic's coding agent. Instructions, skills, MCP, and hooks are project files. | <https://code.claude.com/docs> |
| Claude Agent SDK | The same agent runtime, driven from your own program | <https://platform.claude.com/docs/en/agent-sdk/overview> |
| OpenCode | An open coding agent. The project configures the agent, its tools, and its permissions. | <https://opencode.ai/docs/> |
| Codex CLI | OpenAI's coding agent, configured from the repository | <https://developers.openai.com/codex/> |

Two descriptions that several of these engines share:

- Agent Skills, the `SKILL.md` layout: <https://agentskills.io/specification>
- Agent Plugins, one package of skills and MCP servers for more than one engine: <https://agent-plugins.org>

### The GAIK solution wizard

The [GAIK toolkit](https://github.com/GAIK-project/gaik-toolkit) contains a configuration wizard that uses Claude Code as the engine. You do not write an agent loop for it. You start the engine and let the skill lead.

In Claude Code or Claude Desktop the command is:

```text
/solution-wizard
```

The skill the engine loads is `implementation_layer/solution_wizard/SKILL.md`. A short entry point lives at `.claude/skills/solution-wizard/SKILL.md` and points at that file. The skill collects a use case, selects GAIK components from a registry, and asks the engine to write a JSON blueprint, a BPMN diagram, a small proof of concept, and a documentation set.

The split inside the wizard is the point of an engine-based design. The agent, following `SKILL.md`, is the only layer that talks to the user. It interprets the request, chooses components, and drafts the blueprint. The Python scripts under `implementation_layer/solution_wizard/scripts/` check the blueprint and render the files. They do not hold a conversation. A completeness gate in the skill asks for missing requirements instead of inventing them.

The same skill can be driven without the Claude Code terminal UI. `implementation_layer/solution_wizard/run_wizard_interactive.py` keeps a session open through the Claude Agent SDK. The toolkit install for that runner is `gaik[wizard]`. The wizard README in that directory is the setup note: `implementation_layer/solution_wizard/README.md`.

The wizard's configuration is the skill, the component registry, and the reference cards. It does not use hooks. The toolkit's agent plugin is where skills, MCP files, and hooks are described side by side: `implementation_layer/no-code-assets/agent-plugin/README.md`. Claude Code reads `hooks/hooks.json` at the plugin root when a plugin ships one. That plugin documents the path. It does not ship a hooks file. MCP servers for Claude Code are declared in `.mcp.json`. Other engines read a sibling `mcp.json`. The README lists which file each engine loads.

The course site does not ask you to run the wizard for Exercise 4. It is the nearby example of configuring an engine instead of writing the loop the exercise makes you look at.

## Guardrails

The model will answer a question it was not given the means to answer. The reply can be fluent and wrong. A guardrail is the bound you put on that. Inside an agent harness, a guardrail is one such bound. It is not another name for the harness.

In Exercise 4 the bound is the scope rule in the system prompt: the wine-quality notes and the quality estimate, and a refusal outside that. The mode table is a second bound. A mode that does not offer a tool cannot call it.

A code library puts the same bounds in code. The tool list for a step is an allow list. A check before a tool runs can reject the call.

An engine puts them in configuration. The instructions and the skill say what the agent may do. A hook can stop a tool call or an edit. The Claude Code documentation linked above is where those hook events are described. The GAIK wizard's completeness gate is a guardrail of the other kind: the skill asks for a missing requirement instead of inventing one.
