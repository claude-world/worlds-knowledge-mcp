import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFile(resolve(root, path), 'utf8');
const [skill, routes, connection, agentYaml, evalText] = await Promise.all([
  read('SKILL.md'),
  read('references/routes.md'),
  read('references/connection.md'),
  read('agents/openai.yaml'),
  read('evals/evals.json'),
]);
const evals = JSON.parse(evalText);

assert.match(skill, /^---\nname: worlds-knowledge-mcp\ndescription: .+\n---\n/);
assert.ok(skill.split('\n').length < 500, 'SKILL.md must stay below 500 lines');
assert.doesNotMatch(`${skill}\n${routes}\n${connection}`, /\bTODO\b/);

for (const tool of [
  'worlds_advise_hard_problem',
  'worlds_list_cli_models',
  'worlds_plan_cli_work',
  'worlds_list_cli_versions',
  'worlds_search_cli_reference',
  'worlds_get_cli_command',
  'worlds_get_cli_configuration',
  'worlds_get_cli_workflow',
  'worlds_search_knowledge',
  'worlds_get_document',
]) assert.match(skill, new RegExp(`\\b${tool}\\b`));

assert.ok(
  skill.indexOf('worlds_advise_hard_problem') < skill.indexOf('worlds_list_cli_models'),
  'hard-problem advisor must precede general planning',
);
assert.match(skill, /worlds_list_cli_models[\s\S]*worlds_plan_cli_work/);
assert.match(skill, /live account model catalog as authoritative/i);
assert.match(skill, /execution_intent="read-only"/);
assert.match(skill, /may-edit/);
assert.match(skill, /Never add permission-bypass/);
assert.match(skill, /Claude Code `-p` means print/);
assert.match(skill, /Codex `-p` means select a named profile/);
assert.match(skill, /Grok Build `-p` means a single non-interactive prompt/);
assert.doesNotMatch(skill, /--dangerously-skip-permissions|--yolo/);

for (const heading of ['Claude Code only', 'Codex only', 'Grok Build only', 'Multiple CLIs']) {
  assert.match(routes, new RegExp(`## ${heading}`));
}

for (const command of ['claude mcp add', 'codex mcp add', 'grok mcp add']) {
  assert.match(connection, new RegExp(command));
}
assert.match(agentYaml, /default_prompt: "Use \$worlds-knowledge-mcp /);
assert.match(agentYaml, /value: "worlds-knowledge"/);
assert.match(agentYaml, /transport: "streamable_http"/);
assert.match(agentYaml, /url: "https:\/\/mcp\.claude-world\.com\/mcp"/);
assert.match(agentYaml, /allow_implicit_invocation: true/);
assert.equal(evals.schema_version, 1);
assert.equal(evals.cases.length, 4);
assert.deepEqual(
  evals.cases.map((item) => item.id),
  [
    'claude-only-hard-problem',
    'codex-profile-syntax',
    'grok-only-authorized-fix',
    'multi-cli-work-plan',
  ],
);
assert.equal(evals.cases[0].expected.first_tool, 'worlds_advise_hard_problem');
assert.deepEqual(
  evals.cases[3].expected.tool_sequence,
  ['worlds_list_cli_models', 'worlds_plan_cli_work'],
);

console.log('worlds-knowledge-mcp skill contract: ok');
