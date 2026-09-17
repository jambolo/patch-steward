# Command reference

[Manual contents](README.md) · [Usage](usage.md) · [Configuration](configuration.md)

## Development commands (Available)

Run from this repository's root with pnpm 10.20.0.

| Command                                           | Purpose                                                       |
| ------------------------------------------------- | ------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`                  | Install dependencies using the lockfile.                      |
| `pnpm build`                                      | Run `tsc` in each package; output goes to `packages/*/dist/`. |
| `pnpm test`                                       | Run the Vitest suite once.                                    |
| `pnpm coverage`                                   | Run Vitest with coverage and the LCOV reporter.               |
| `pnpm lint`                                       | Run ESLint.                                                   |
| `pnpm format`                                     | Apply Prettier formatting.                                    |
| `pnpm format:check`                               | Check Prettier formatting.                                    |
| `pnpm vitest run packages/core/src/index.test.ts` | Run the sample test file.                                     |
| `pnpm vitest run -t 'greets by name'`             | Run the named sample test.                                    |

Documented verification sequence:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm lint
pnpm format:check
pnpm coverage
```

Sources: [README](../../README.md#development), [package scripts](../../package.json),
[repository guidance](../../CLAUDE.md#commands).

## CLI commands (Proposed)

These names appear in the design; the repository does not implement them.

| Command             | Intended purpose                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| `steward init`      | Install target-repository templates and labels, select inference settings, and print manual setup steps. |
| `steward preflight` | Check the contributor's local draft and branch, with optional self-review; print unverified results.     |
| `steward screen`    | Screen an issue or PR using a local container, with optional attributed publication.                     |
| `steward replay`    | Evaluate a labeled historical dataset with labels withheld from screening.                               |
| `steward policy`    | Validate a policy file and show the revision that would govern a run.                                    |
| `steward report`    | Render a stored run or evidence record locally.                                                          |

> **[NEEDS INPUT]** Full positional arguments, flags, exit codes, output formats,
> file-selection rules, and authentication commands are not defined. In particular,
> SP20 requires an explicit publication flag but does not name it.

Source: [architecture §6.5](../architecture.md#65-command-line-interface-packagescli).

## GitHub conversation commands (Proposed)

Post a command at the start of a **new conversation comment** on an issue or PR.
Review comments are not command entry points; editing an existing command does
not reprocess it. A reaction acknowledges the command, and results appear in the
updated report.

Uppercase words below are placeholders to replace. Brackets mark optional inputs.
These are proposed GitHub comment syntax, not shell commands.

```text
/steward rerun [stage]
/steward override pass REASON
/steward override needs-changes CODE REASON
/steward guidance TEXT
/steward waive REQUIREMENT REASON
/steward accept REASON
/steward resolve CODE
/steward audit RUN confirm
/steward audit RUN dispute REASON
/steward time MINUTES [KIND]
/steward appeal REASON
```

| Command    | Who may use it                                | Effect                                                                                                                                  |
| ---------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `rerun`    | Maintainer, or author on their own submission | Start fresh screening; a maintainer's rerun also admits an inference-held submission. Partial reruns cannot omit other required stages. |
| `override` | Maintainer                                    | Record the selected effective outcome, reason, scope, and waived/remaining requirements.                                                |
| `guidance` | Maintainer                                    | Record scoped project intent. The text remains input data, not policy or tool authorization.                                            |
| `waive`    | Maintainer                                    | Waive a named requirement for one submission within the recorded scope.                                                                 |
| `accept`   | Maintainer                                    | Record proposal or PR intent acceptance; does not waive technical screening.                                                            |
| `resolve`  | Maintainer                                    | Record a dismissal code at or after closure for calibration; on a proposal issue, record its decline.                                   |
| `audit`    | Maintainer                                    | Confirm or dispute a sampled run.                                                                                                       |
| `time`     | Maintainer                                    | Record minutes; documented kinds include `review`, `triage`, `appeal`, `audit`, and `override`.                                         |
| `appeal`   | Author only, on their own submission          | Open a maintainer-triage appeal; only one may be open at a time.                                                                        |

Maintainers need write, maintain, or admin permission, verified through the API.
Unauthorized commands are ignored. An unparseable command from an authorized
user receives one usage reply.

Issue acceptance binds to the proposal content hash. PR acceptance binds to the
PR, target, and canonical claim-scope text hash, so implementation pushes with
unchanged scope retain intent acceptance. Overrides and waivers bind to the
issue snapshot or PR head/target and requirements.

> **[NEEDS INPUT]** Accepted values for `stage`, `REQUIREMENT`, and `RUN`, the full
> dismissal-code catalog, and the complete `KIND` vocabulary are not specified.

Sources: [SP15](../processes.md#sp15-maintainer-triage-override-and-appeal),
[SP19](../processes.md#sp19-resource-control-and-failure-handling).
