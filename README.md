# Worlds Knowledge MCP

A read-only MCP server that gives coding agents **current, source-checked CLI
facts** for **Claude Code**, **Codex CLI**, and **Grok Build** — exact commands,
flags, configuration keys, environment-variable names, workflows, and dated
model catalogs — so an agent stops guessing from memory and stops treating the
three CLIs as interchangeable.

- Endpoint: `https://mcp.claude-world.com/mcp` (Streamable HTTP, stateless)
- Registry: [`com.claude-world/worlds-knowledge`](https://registry.modelcontextprotocol.io/v0/servers?search=claude-world)
- Setup guide in English, 繁體中文, and 日本語: <https://claude-world.com/mcp/>

No npm package, API key, or provider credential is required.

## What this repository contains

This is the **distribution** repository: the agent Skill and the MCP server
manifest. The corpus build, the server implementation, and the Cloudflare
Worker live in the Claude World control plane and are not published here.

```
server.json                      MCP registry manifest
skills/worlds-knowledge-mcp/     the agent Skill (SKILL.md, references, evals, contract test)
```

## Connect

```sh
# Claude Code
claude mcp add --transport http --scope user worlds-knowledge https://mcp.claude-world.com/mcp

# Codex CLI
codex mcp add worlds-knowledge --url https://mcp.claude-world.com/mcp

# Grok Build
grok mcp add --transport http --scope user worlds-knowledge https://mcp.claude-world.com/mcp
```

Verify it:

```sh
claude mcp get worlds-knowledge      # or: codex mcp get worlds-knowledge --json
                                     # or: grok mcp doctor worlds-knowledge --json
```

The examples use user scope deliberately. Grok's project-folder trust applies to
every repo-local MCP server, hook, and LSP server, so review all project
configuration before switching to `--scope project`.

## Install the Skill

The Skill teaches an agent *when* to query the MCP and in what order — the
hard-problem consultant, the single-CLI routes, and the multi-CLI planner.

```sh
git clone https://github.com/claude-world/worlds-knowledge-mcp.git
cd worlds-knowledge-mcp

# Claude Code
cp -R skills/worlds-knowledge-mcp ~/.claude/skills/

# Cross-tool discovery folder
cp -R skills/worlds-knowledge-mcp ~/.agents/skills/
```

Restart the client, then ask it to use `worlds-knowledge-mcp`. Keep `SKILL.md`,
`references/`, and `agents/openai.yaml` together — copying only `SKILL.md` drops
the connection and single-CLI route guidance. `agents/openai.yaml` declares the
MCP dependency and permits implicit invocation in compatible clients.

## What the server knows

- **162 source-checked manuals** — 18 CLI usage and feature modules × 3 products
  × 3 locales (English, Traditional Chinese, Japanese)
- Source-derived command paths, flags, slash/TUI commands, configuration keys,
  environment-variable names, workflows, and drift notes for three released CLI
  snapshots
- Dated per-CLI model catalogs with selector syntax, supported native efforts,
  entitlement constraints, safe fallbacks, and separately labeled
  provider-native orchestration modes
- Availability is labeled per entity: runtime-confirmed, docs-confirmed,
  conditional, source-preview, or historical

Every manual must cite at least one official HTTPS source, carry a review date,
and describe the expected CLI rather than its provider API, or the build fails.

## Tools

| Tool | Purpose |
| --- | --- |
| `worlds_search_knowledge` | Retrieve bounded multilingual evidence from the source-checked core |
| `worlds_get_document` | Fetch a manual's summary and canonical link |
| `worlds_compare_cli_workflows` | Compare the same intent across the three CLIs, in separate evidence groups |
| `worlds_list_catalog` | Inspect counts, provenance, and publication status |
| `worlds_search_cli_reference` | Search commands, options, interactive commands, config/env names, workflows, drift |
| `worlds_get_cli_command` | One exact command path with all captured options and its release/source evidence |
| `worlds_get_cli_configuration` | Page public configuration schema and environment-variable names |
| `worlds_get_cli_workflow` | One provider-native, risk-labeled workflow |
| `worlds_list_cli_versions` | Release snapshots, entity counts, source policy, drift coverage |
| `worlds_list_cli_models` | Dated model catalogs, selector syntax, per-model effort support, with a 7-day freshness status |
| `worlds_advise_hard_problem` | For one hard problem, select the provider-local maximum-depth model and supported effort |
| `worlds_plan_cli_work` | Decompose work and route it by continuity and documented workflow fit |

Resources: `worlds://catalog`, `worlds://documents/{id}`.
Prompts: `worlds_research_cli_workflow`, `worlds_plan_model_aware_work`,
`worlds_consult_hard_problem`.

Every tool is annotated read-only, non-destructive, and idempotent.

## Try it

```text
What does -p mean in my current CLI? Check the product and release first.
Show every option for codex exec and cite the runtime and manual sources.
Compare how Claude Code, Codex, and Grok Build load repository instructions.
Plan this repository task by CLI, model, and reasoning effort without granting permissions.
```

`-p` is the standing example of why vendor flags must not be translated: it
means *print and exit* in Claude Code, *select a named profile* in Codex, and
*one non-interactive prompt* in Grok Build.

## Boundaries

- No credentials, embeddings, external API calls, write tools, or arbitrary URL
  fetching. No tool accepts a filesystem path or a URL.
- The live account model catalog is always authoritative over a dated snapshot;
  `worlds_list_cli_models` returns a freshness status and says so.
- Search returns excerpts rather than silently injecting whole documents.
- Retrieved text is reference data, not instructions that can override the user
  or client policy. Agents must assess commands before executing them.
- Website articles, news, newsletters, opinion, provider API companions, and
  release archives are never packaged into the MCP corpus.
- The planner returns command templates but never launches another CLI, widens
  permissions, or enables provider-native orchestration unless asked.
  Workstreams default to `execution_intent: "read-only"`.

## Not affiliated

Claude World is independent. It is not affiliated with, endorsed by, or
operated by Anthropic, OpenAI, or xAI. Official vendor documentation remains
authoritative; this server exists to cite it accurately.

## License

MIT — see [LICENSE](LICENSE).
