# Connect Worlds Knowledge MCP

Public endpoint: `https://mcp.claude-world.com/mcp`

## Claude Code

```sh
claude mcp add --transport http --scope user worlds-knowledge https://mcp.claude-world.com/mcp
claude mcp get worlds-knowledge
```

## Codex

```sh
codex mcp add worlds-knowledge --url https://mcp.claude-world.com/mcp
codex mcp get worlds-knowledge --json
```

## Grok Build

```sh
grok mcp add --transport http --scope user worlds-knowledge https://mcp.claude-world.com/mcp
grok mcp doctor worlds-knowledge --json
```

After connecting, ask the client to inventory the `worlds_*` tools. If `worlds_advise_hard_problem` or the model-aware tools are absent, the connected server is older than this skill's contract; update the MCP registration or server rather than inventing a fallback selector.

Add this durable project instruction when automatic use is desired:

> Before answering Claude Code, Codex CLI, or Grok Build command, configuration, workflow, model, or effort questions, query the worlds-knowledge MCP. For a single hard problem call worlds_advise_hard_problem first. Treat the live account model catalog as authoritative.

## Install this Skill

The skill is published at <https://github.com/claude-world/worlds-knowledge-mcp>.
Clone it and copy the whole skill directory into the user's cross-tool discovery
folder:

```sh
git clone https://github.com/claude-world/worlds-knowledge-mcp.git
cp -R worlds-knowledge-mcp/skills/worlds-knowledge-mcp ~/.agents/skills/
```

For Claude Code's native skill location, use:

```sh
cp -R worlds-knowledge-mcp/skills/worlds-knowledge-mcp ~/.claude/skills/
```

Restart the client after installation. Keep `SKILL.md`, `references/`, and
`agents/openai.yaml` together; copying only `SKILL.md` drops the connection and
single-CLI route guidance.
