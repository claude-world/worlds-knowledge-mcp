# Route playbook

## Claude Code only

- Set product and current CLI to `claude-code`.
- For one hard problem, call `worlds_advise_hard_problem` with `selection_scope="current-cli"`.
- For a general plan, call `worlds_list_cli_models` with `products=["claude-code"]`, then `worlds_plan_cli_work` with `available_clis=["claude-code"]`.
- Resolve commands through the Claude Code reference. Do not copy Codex or Grok flags.
- Remember that Claude `-p` is print mode. Use plan/read-oriented permissions for analysis and normal permission checks for authorized edits.

## Codex only

- Set product and current CLI to `codex`.
- For one hard problem, call `worlds_advise_hard_problem` with `selection_scope="current-cli"`.
- For a general plan, call `worlds_list_cli_models` with `products=["codex"]`, then `worlds_plan_cli_work` with `available_clis=["codex"]`.
- Resolve commands through the Codex reference.
- Remember that Codex `-p` selects a profile. Use `codex exec` for headless execution and keep model reasoning effort separate from profile selection.

## Grok Build only

- Set product and current CLI to `grok-build`.
- For one hard problem, call `worlds_advise_hard_problem` with `selection_scope="current-cli"`.
- For a general plan, call `worlds_list_cli_models` with `products=["grok-build"]`, then `worlds_plan_cli_work` with `available_clis=["grok-build"]`.
- Resolve commands through the Grok Build reference.
- Remember that Grok `-p` is a single non-interactive prompt. Preserve its native permission and sandbox vocabulary.

## Multiple CLIs

- Pass only installed, authenticated, user-authorized CLIs in `available_clis`.
- For one hard problem that may move providers, call `worlds_advise_hard_problem` first with `selection_scope="available-clis"`.
- For multiple workstreams, list the models for the available products before calling the planner.
- Prefer continuity. Switch only for a documented workflow fit, required capability, or independent review benefit.
- Hand off objective, acceptance criteria, repository and branch, dirty-tree state, ownership boundary, evidence, remaining risks, selected model/effort, and permission boundary into a new native receiving session.
- Parallelize only independent workstreams and preserve one merge or verification gate.

## Exact-reference mapping

| Need | Tool sequence |
| --- | --- |
| Exact command or option | `worlds_list_cli_versions` -> `worlds_search_cli_reference` -> `worlds_get_cli_command` |
| Config or environment name | `worlds_list_cli_versions` -> `worlds_search_cli_reference` -> `worlds_get_cli_configuration` |
| Provider workflow | `worlds_list_cli_versions` -> `worlds_search_cli_reference` -> `worlds_get_cli_workflow` |
| Current models and effort | `worlds_list_cli_models`, then verify the live account catalog |
| Single hard problem | `worlds_advise_hard_problem` before general planning |
| Multiple workstreams | `worlds_list_cli_models` -> `worlds_plan_cli_work` |
