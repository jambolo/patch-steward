# patch-steward-m1 — Ledger

Single source of truth for execution state. Sections are owned by different agents — the planner seeds Plan + Phases; the
decomposer fills Steps per phase; the supervisor updates Steps and appends Revisions.

## Plan

- plan-name: patch-steward-m1
- current-phase: complete — phases 1 and 2 are both done; the roadmap defines no phase 3
- working-branch: milestone/1-monorepo-foundation
- starting-commit: 8fbfdcd90eff58e30c94397fba3b9fc5b5aeece5
- default-branch: develop
- artifacts-dir: development-artifacts

## Phases

| Phase | Status   | Notes                                                                                            |
| ----: | -------- | ------------------------------------------------------------------------------------------------ |
|     1 | complete | Workspace conversion done; phase DoD re-verified by the supervisor on Windows at commit c90ce6b. |
|     2 | complete | CI/CD alignment and decision recording done; phase DoD re-verified by the supervisor on Windows. |

## Steps

<!-- decomposer fills per phase: id | phase | status | files | commit,
     plus a "Phase <N> notes" block: dependency graph, couplings, emergent contracts -->

| id   | phase | status | files                                                                                                                                                                                                                                                                    | commit                                                       |
| ---- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| 1.1  | 1     | done   | package.json, pnpm-workspace.yaml, tsconfig.json (deleted), tsconfig.base.json, vitest.config.ts, eslint.config.mjs, development-artifacts/patch-steward-m1-1.1-report.md                                                                                                | 8dd3e331938845fdb8f9c3fbdf16799611dbc981 (merge of eac0850)  |
| 1.2  | 1     | done   | packages/core/package.json, packages/core/tsconfig.json, packages/core/src/index.ts, packages/core/src/index.test.ts, packages/core/src/index.fixture.test.ts, src/index.ts (deleted), src/index.test.ts (deleted), development-artifacts/patch-steward-m1-1.2-report.md | d8972776e6274c185804b7d6267f2a6fd3e4017b (merge of c49544a)  |
| 1.3  | 1     | done   | packages/cli/package.json, packages/cli/tsconfig.json, packages/cli/src/index.ts, packages/cli/src/main.ts, packages/cli/src/index.test.ts, development-artifacts/patch-steward-m1-1.3-report.md                                                                         | 36d1e8bc9a2a0e398d8af9df399bead237500888 (merge of f5f4a93)  |
| 1.4  | 1     | done   | packages/action/package.json, packages/action/tsconfig.json, packages/action/src/index.ts, packages/action/src/index.test.ts, development-artifacts/patch-steward-m1-1.4-report.md                                                                                       | 6d32f700b1be7bc1ff138055c1808a64940e2a40 (merge of 1f5eab2)  |
| 1.5  | 1     | done   | packages/web/package.json, packages/web/tsconfig.json, packages/web/src/index.ts, packages/web/src/index.test.ts, development-artifacts/patch-steward-m1-1.5-report.md                                                                                                   | 90d41be7a4dee9db44b90d0fe1c4b188114bb4ec (merge of 6f2cae3)  |
| 1.6  | 1     | done   | fixtures/README.md, fixtures/smoke/greeting.txt, templates/README.md, development-artifacts/patch-steward-m1-1.6-report.md                                                                                                                                               | 4eba0d4751a48f45fb438a5472ae78e9fd12c20f (merge of 0a1ee2a)  |
| 1.7  | 1     | done   | pnpm-lock.yaml, development-artifacts/patch-steward-m1-1.7-report.md                                                                                                                                                                                                     | af83551e495bf3eac02c361ebe98b59014cdac88 (in-tree, no merge) |
| 2.1  | 2     | done   | .github/workflows/ci.yml, .github/workflows/cd.yml, development-artifacts/patch-steward-m1-2.1-report.md                                                                                                                                                                 | 3207dc0540ede080c1ad7e61e0f33f2f296b8a69 (merge of 6f61256)  |
| 2.2  | 2     | done   | docs/architecture.md, development-artifacts/patch-steward-m1-2.2-report.md                                                                                                                                                                                               | a9518de26a3be6fe5f55f002c2f03700f0cbfe17 (merge of 631c894)  |
| 2.3  | 2     | done   | docs/whitepaper.md, development-artifacts/patch-steward-m1-2.3-report.md                                                                                                                                                                                                 | 577c092d069793f894aedb6be32d8942b7d4635b (merge of fe6c655)  |
| 2.4  | 2     | done   | README.md, development-artifacts/patch-steward-m1-2.4-report.md                                                                                                                                                                                                          | 6f99221fb9677594fcb0f68bae111bf47b16966f (merge of 00704df)  |
| 2.5  | 2     | done   | CLAUDE.md, development-artifacts/patch-steward-m1-2.5-report.md                                                                                                                                                                                                          | db6f37449f06b664c0b8c429b49c00c31d667d16 (merge of 0ff6e6d)  |
| 2.6  | 2     | done   | docs/user-manual/installation.md, development-artifacts/patch-steward-m1-2.6-report.md                                                                                                                                                                                   | 01efcc65f1fecd8f9e8ee38c382dea0be018d44e (merge of 082ce63)  |
| 2.7  | 2     | done   | docs/user-manual/commands.md, docs/user-manual/usage.md, docs/user-manual/README.md, development-artifacts/patch-steward-m1-2.7-report.md                                                                                                                                | 2d979777b4a36aaa481be3c8d20028fd8644f976 (merge of e5aaebf)  |
| 2.8  | 2     | done   | docs/user-manual/configuration.md, development-artifacts/patch-steward-m1-2.8-report.md                                                                                                                                                                                  | 49190bebda2085dfa9184f862f0ad04f60b67607 (merge of 0712449)  |
| 2.9  | 2     | done   | docs/user-manual/troubleshooting.md, development-artifacts/patch-steward-m1-2.9-report.md                                                                                                                                                                                | df8fcb61acc0667358c190423a465cbba938c9c8 (merge of a608f6b)  |
| 2.10 | 2     | done   | development-artifacts/patch-steward-m1-2.10-report.md                                                                                                                                                                                                                    | 4657b26af9dd64701dc3f99cdda751dfca9d2462 (in-tree, no merge) |

### Phase 1 notes

- Dependency graph: steps 1.1, 1.2, 1.3, 1.4, 1.5, 1.6 are mutually independent with pairwise-disjoint file scopes — launch all
  six in parallel. Step 1.7 depends on all of them and gates the phase (single install + full toolchain proof).
- Lockfile discipline: 1.7 is the ONLY step that runs `pnpm install` or changes `pnpm-lock.yaml`. Steps 1.1–1.6 have static
  (grep/test) acceptance by design: worker worktrees carry no `node_modules`, and a frozen install cannot succeed
  mid-conversion, so no pnpm command can run in them.
- Environment facts: local Node is v22.15.0 (the brief assumed Node 24 locally; harmless here). pnpm prints
  `WARN Unsupported engine` for packages/cli (`engines: >=24`) on install/build/ls — warning only, never fatal (engine-strict is
  off). Node 24 pinning lands in the workflows in phase 2.
- Windows: `coverage/lcov.info` records `SF:` paths with backslashes (e.g. `SF:packages\core\src\index.ts`). Any DoD grep for
  `packages/core` in the lcov file must accept both separators (`grep -E 'packages[/\\]core'`); this affects the literal reading
  of project DoD item 4.
- The whole target configuration was validated end to end in a scratch tree on this machine before decomposition: `pnpm install`,
  `pnpm test` before any build (5 test files pass: core unit, core fixture, cli, action, web), `pnpm build` (topological, cli
  after core), `node packages/cli/dist/main.js` printing `Hello, steward!`, `pnpm lint`, `pnpm format:check`, `pnpm coverage`
  (SF entries for all five sources), `pnpm install --frozen-lockfile` after regeneration, and `pnpm ls -r --depth -1` listing
  four `@patch-steward/*@0.0.2` packages. All step payloads are byte-exact Prettier-clean.
- Pinned contracts later phases and revisions must honor:
  - Build mechanism: root `build` script is `pnpm -r build`; each package has `"build": "tsc"`; no TypeScript project
    references, no `composite`.
  - Shared compiler options live in `tsconfig.base.json` (current options preserved plus `declaration: true`); there is no root
    `tsconfig.json` anymore; each package `tsconfig.json` extends `../../tsconfig.base.json` with `rootDir: src`,
    `outDir: dist`, `include: ["src"]`, `exclude: ["**/*.test.ts"]`.
  - Tier selection lives only in root `vitest.config.ts` via `test.projects` (`unit`, `fixture`); container/live suffixes are
    excluded by pattern; coverage is root-level `test.coverage` with `include: ['packages/*/src/**']`, merged to root
    `coverage/lcov.info`.
  - `@patch-steward/core` resolves to source under Vitest via the alias to `packages/core/src/index.ts` and to `dist/` at Node
    runtime via the core `exports` map (`types` then `default`). Extend the alias if core ever gains more entry points.
  - Fixture corpus location convention: `resolve(fileURLToPath(import.meta.url), '../../../../fixtures/...')` — four `..`
    segments because `path.resolve` treats the test-file path itself as the first segment.
  - Test population after phase 1: exactly 5 test files / 5 tests; the `pnpm test` summary line is `Test Files  5 passed (5)`.

### Phase 2 notes

- Dependency graph: steps 2.1–2.9 are mutually independent with pairwise-disjoint file scopes — launch all nine in parallel.
  Step 2.10 depends on all nine and gates the phase: it runs every MECHANICAL phase-2 and project DoD check (20 checks) and
  records honest PASS/FAIL verdicts; its own acceptance targets only its report structure, so an honest FAIL report still
  merges — route any FAIL verdicts, don't reject the gate step for them.
- Steps were decomposed AFTER amendment commit 50c6f5a and embed the amended DoD grep forms (fixed-string `lts/*`; `src/index`
  filtered through `grep -v "packages/core/src/index"`). No step embeds the pre-amendment text, so no revision is pending from
  that amendment.
- Install discipline (differs from phase 1): the lockfile is committed and valid, so EVERY phase-2 step runs
  `pnpm install --frozen-lockfile` in its worktree as its first action after the base assertion (machine pnpm store is warm;
  the engine WARN for packages/cli is expected). `node_modules/`, `dist/`, `coverage/`, and `*.tsbuildinfo` are gitignored, so
  installs and builds never violate scope checks. No step touches `pnpm-lock.yaml`.
- Prettier discipline (per the phase-1 Revisions contract): every step's acceptance carries `pnpm format:check`; every step
  runs `pnpm prettier --write` scoped to its edited files before committing; every step file instructs the worker to fence
  verbatim report output in a `text` code block and to `pnpm prettier --check` its own report before committing. Table-bearing
  files (commands.md, troubleshooting.md, configuration.md) get whole-table realignment from Prettier — expected, in scope.
- Deliberate non-coupling: 2.2, 2.4, 2.5, 2.6, and 2.8 record "Node 24" while 2.1 edits the workflows in parallel. Both sides
  derive from immutable owner decision 2 in the brief — not from each other's files — so no `depends_on` was added; gate 2.10
  verifies both landed. No doc step records volatile facts (line numbers, counts, quoted signatures) about a file a co-parallel
  sibling edits.
- Supervisor judgment items from the roadmap phase-2 DoD are NOT delegated to the gate and remain to review at phase close:
  updated sections claim no unimplemented behavior; `[NEEDS INPUT]` callouts and "(Proposed)" markers survive; the
  installation callout lost exactly the now-settled minimum-Node clause; README's `(DF01–DF09)` stays deliberately untouched
  (out of scope per the brief).
- Emergent contracts recorded by phase 2 (pinned for later phases): architecture §6.1 is the governing record of Node 24, the
  four test tiers and their CI placement, lockstep versioning, and `fixtures/` as corpus home; `cd.yml` differs from START by
  exactly one node-version line; user-manual sample paths point at `packages/core/src/index.test.ts`.

#### Phase 2 supervisor close-out (execution record)

- Execution shape: one nine-wide parallel wave (2.1–2.9) in nine worktrees created at `BASE` = 042e05d, then gate 2.10 run
  in-tree. Every worktree passed the base gate (`HEAD == BASE`) before launch; every step produced exactly one commit whose
  `BASE..HEAD` diff was a subset of its `files_in_scope`; all nine merges were conflict-free, confirming the decomposer's
  disjoint-scope claim. Worktrees and `wt/` branches were removed after merge.
- Bootstrap deviation from the step text: the supervisor ran `pnpm install --frozen-lockfile` in all nine worktrees
  **sequentially before launch**, rather than letting nine workers install concurrently, to avoid pnpm store contention on
  Windows. Workers still ran the install themselves as their step instructed (it then completed as a fast no-op, exit 0). Step
  files were not changed for this; later phases should keep the same pattern for wide waves.
- Verification was independent, not delegated: the supervisor re-ran every step's acceptance in that step's worktree before
  merging, and after the merge re-ran all 20 of gate 2.10's checks itself on the integrated tree. All 20 pass, matching the
  gate report — the report was truthful, but was treated as a lead throughout.
- Post-wave coupling re-check (the deliberate non-coupling the decomposer flagged): the supervisor confirmed on the merged tree
  that the docs' cross-file claims match the files a sibling edited — `eslint.config.mjs` really ignores `**/dist/`;
  `vitest.config.ts` really defines only `unit` and `fixture` projects with container/live excluded; `ci.yml` really has three
  `node-version: 24` lines, an `[ubuntu-latest, windows-latest]` matrix, push triggers on `master`/`develop`/`release/**`, and a
  Codecov upload gated on `refs/heads/develop`. No drift; no integration commit was needed.
- Supervisor-judgment DoD items (roadmap phase 2, not delegated to the gate) — all satisfied:
  - No updated section claims unimplemented behavior as working. The scaffold-only disclaimers all survive verbatim:
    whitepaper §14 "No working screening command, provider integration, workflow, or browser app is claimed"; CLAUDE.md
    "Scaffold only. … no screening engine, CLI, LLM adapter, GitHub adapter, or sandbox runner exists"; installation.md "These
    steps set up the toolchain. They do not install an issue or PR screening service"; README's `templates/` bullet explicitly
    says "nothing is installed today". Architecture §6.1's added clause "the action targets the `node24` runtime" is
    forward-looking, but matches the established normative-design register of §6 — the same tree already said `steward init`
    installs templates and the CLI is "published to npm" at START — so it records a decision, not a delivery.
  - Markers survived exactly. `[NEEDS INPUT]` and "Proposed" counts are unchanged in every touched file and in the verify-only
    `overview.md`: installation 2/1, commands 2/2, usage 4/7, user-manual README 1/1, configuration 5/6, troubleshooting 2/4,
    overview 0/3.
  - The installation callout shrank by exactly the settled minimum-Node clause. Only "a minimum supported Node.js version,"
    was dropped; all five remaining clauses (Node.js/pnpm installation commands, canonical clone URL, published CLI package
    name, installation command, release compatibility matrix) survive — the rest of that hunk is Prettier re-wrapping with no
    change of meaning.
  - README's `(DF01–DF09)` is untouched, as the brief requires.

## Revisions

<!-- supervisor appends: phase | failed step | revision note | outcome -->

| phase | failed step                                                                                                  | revision note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | outcome                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | 1.7 (acceptance item 7)                                                                                      | `pnpm format:check` covers `development-artifacts/`, but no step required worker reports to be Prettier-clean. All seven reports wrote verbatim acceptance output as indented markdown prose, so Prettier flagged them and step 1.7's honest run failed item 7 through no fault of its own work. Worse, `prettier --write` silently corrupted the evidence: markdown-active characters were rewritten (`grep -Fc 'packages/*'` became `grep -Fc 'packages/_'`, `'**/dist/'` became `'\**/dist/'`). Root cause is a decomposition gap, not a step defect — the report-format contract and the repo-wide format gate were never reconciled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Fixed in supervisor integration commit c90ce6b: each report body wrapped in a `text` code fence, which Prettier leaves untouched. Fence interiors verified byte-identical to the originals. Step 1.7 accepted; items 1–6 and 8–12 were independently re-run and passed. **Contract for later phases: a worker report that records verbatim command output must put it inside a fenced code block, and any step whose scope includes files under `development-artifacts/` must treat `pnpm format:check` as part of its own acceptance.**                                                                                                 |
| 2     | none — defects found during phase 2 decomposition (dry-run of the phase DoD at 7d4c671), before any step ran | Amendment note from the decomposer; three defects fixed in the brief and roadmap. (1) Phase 2 DoD `grep -rn "lts"` was unsatisfiable: the bare substring matches ordinary words ("results", "defaults") in files the phase must not change. Replaced with fixed-string `grep -rnF "lts/*"`; verified at 7d4c671 that this matches exactly the six real Node-version claims and that no claim exists in any other case or form, so the narrower gate hides nothing. (2) The `src/index` grep (roadmap phase 2 DoD and brief project DoD item 7) was self-contradictory: the mandated replacement path `packages/core/src/index.test.ts` contains the match substring. Amended both to filter with `grep -v "packages/core/src/index"`; all eight current stale root-path references still match under the exclusion. (3) The stale-text survey missed dangling Sources links: `docs/user-manual/README.md` lines 61–64 moved from verify-only to edit target (repoint three links); the installation.md row gained lines 34, 49, and 73; the configuration.md row now names its line-303 `tsconfig.json` link; roadmap phase 2 Scope updated to match. Items 1–2 correct broken operationalizations with intent unchanged; item 3 only adds required work — no gate weakened, no human approval needed. Completed phase 1 is unaffected; pending phase 2 steps embedding the old text are the decomposer's revision job. | brief amended                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2     | 2.8 (acceptance item 8)                                                                                      | failed step: 2.8. acceptance: `git diff <START> -- docs/user-manual/configuration.md \| grep -c "^@@"`. expected: `1`. observed: `5`; all other items (1–7, 9) passed and the scope diff touched only the two in-scope files. root cause: acceptance mis-specified, not a step defect. Git splits a diff into a new hunk wherever more than three unchanged lines separate two edits, so hunk count measures edit spacing, not section containment. Payload 1 legitimately rewrites five sub-regions of the one target section (intro paragraph, table, TypeScript prose and code fences, imports note, Sources line), each separated by more than three unchanged lines, so honest work can never yield one hunk. Forcing `1` would require padding unrelated unchanged lines — a contrived pass the worker correctly declined to manufacture. suggested fix: express the real invariant — byte-identity of everything preceding the `## Scaffold configuration (Available)` heading.                                                                                                                                                                                                                                                                                                                                                                                                                                  | corrected in flight (supervisor, revision option b): item 8 replaced with a prefix byte-identity check (`git show <START>:docs/user-manual/configuration.md \| sed -n "1,230p"` diffed against the same range of the working file → no output, exit 0), plus an explicit note not to count `^@@` hunks. Supervisor independently verified on the merged tree that lines 1–230 are byte-identical, that the heading sits at line 231 before and after, that the earliest changed line is old line 234, and that `NEEDS INPUT` (5) and `(Proposed)` (6) counts are unchanged. Step 2.8 accepted and merged; corrected step file committed. |
| 2     | 2.9 (acceptance item 4)                                                                                      | failed step: 2.9. acceptance: `grep -cF "NEEDS INPUT" docs/user-manual/troubleshooting.md`. expected: `1`. observed: `2`; all other items (1–3, 5) passed and the scope diff was the single intended table cell. root cause: acceptance mis-specified, not a step defect. The decomposer miscounted the page's callouts: `docs/user-manual/troubleshooting.md` has had two `[NEEDS INPUT]` callouts (lines 8 and 66) since before the plan started, and the step's own `context` described "the `[NEEDS INPUT]` callout" in the singular. The step's diff touches neither callout, so honest work can never yield `1`; only deleting a callout — explicitly out of scope — would. suggested fix: change the expected count to `2` and correct the singular wording in `context`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | corrected in flight (supervisor, revision option b): item 4 expectation changed to `2` with the callout line numbers named, and the `context` sentence corrected to "both `[NEEDS INPUT]` callouts (lines 8 and 66)". Supervisor independently verified that both callouts are present and byte-identical at START and at the merged tree, and that the step's diff is exactly the one Cause cell. Step 2.9 accepted and merged; corrected step file committed.                                                                                                                                                                          |
