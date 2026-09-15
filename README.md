# Patch Steward

Patch Steward is a planned local TypeScript/Node.js tool that assists project
maintainers by screening, validating, verifying, and improving GitHub pull requests
before maintainer review.

## Goal

Reduce maintainer workload by preparing pull requests for human review: assess bug
claims, validate and improve proposed fixes, and check for regressions. LLM analysis
and reproducible test evidence support this work; an AI approval score alone is
insufficient for admission to review.

## Status

Project scaffold and design documentation. The screening engine, CLI, LLM and
GitHub integrations, and isolated runner are not implemented. The sample source and
test only verify the development toolchain.

The [whitepaper](docs/whitepaper.md) captures the originating conversation's
methodology, requirements, architecture, and decisions.

## Methodology and process

1. Load a versioned quality policy from the trusted target branch.
2. Collect expected behavior, supporting references, actual behavior, a minimal
   reproduction, and the proposed fix scope.
3. Use an LLM to classify the claim against documentation, code, tests, and prior
   decisions. Route unclear requirements to maintainer triage.
4. Execute the same regression test before and after the fix: it must fail for
   the claimed reason without the fix and pass with it.
5. Independently challenge the patch and execute relevant counterexample tests.
6. Run required regression checks, including integration with the current target
   branch, and distinguish existing failures from new regressions.
7. Publish commit-bound evidence and route the submission to needs changes,
   maintainer triage, or human review.

Contributors can run preflight locally. A trusted maintainer or CI run repeats the
checks before accepting their results.

## Components

| Component             | Responsibility                                                      |
| --------------------- | ------------------------------------------------------------------- |
| Quality policy        | Defines behavior, required checks, platforms, and escalation rules. |
| Submission schema     | Captures claims, references, reproduction, and scope.               |
| Screening core        | Coordinates stages and applies deterministic admission rules.       |
| LLM adapters          | Call provider APIs for analysis and structured findings.            |
| Context retrieval     | Collects relevant repository files and prior decisions.             |
| GitHub adapter        | Reads PRs and issues; publishes authorized reports and checks.      |
| Git adapter           | Fetches commits, inspects diffs, and prepares worktrees.            |
| Isolated runner       | Executes builds and tests without exposing host credentials.        |
| Evidence store        | Records commands, results, findings, and base/head commit IDs.      |
| CLI                   | Provides local contributor and maintainer workflows.                |
| Triage and monitoring | Supports overrides, accuracy measurement, and resource limits.      |

## Local execution and integrations

The intended implementation is a local TypeScript/Node.js CLI application.
It connects directly to LLM and GitHub APIs and invokes existing Git/build/test
tools. It can screen repositories written in other languages.

A hosted backend is unnecessary for on-demand local screening. Continuous
screening requires GitHub Actions, a webhook receiver, or a running polling process.
TypeScript was selected by preference and fit; Python has no demonstrated advantage
for the established requirements.

## Development

Install Node.js and pnpm. The exact pnpm version is recorded in package.json.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm lint
pnpm format:check
pnpm coverage
```

- src/: sample source and test for toolchain verification.
- docs/whitepaper.md: authored project design.
- .github/workflows/: scaffold CI and release automation.

## Automation

CI builds and tests on Windows and Linux for PRs and pushes to master, develop,
and release branches. Lint and formatting checks run for PRs. Coverage uploads
from develop use the CODECOV_TOKEN repository secret. GitHub Pages deployment
is omitted because this local project has no Pages configuration.

The scaffold CD workflow builds and tests package changes on master, creates a
version tag if absent, and merges master into develop. Both branches must exist
on the remote and repository permissions/rules must allow these operations.
No GitHub remote or API credentials are configured by this scaffold.

These workflows validate this project's scaffold; they do not implement the
proposed PR screening service.

## Trust boundaries

Submitted code must run in a disposable sandbox, not directly on a maintainer's
host. Worktrees and subprocesses alone are not security isolation. Keep LLM and
GitHub credentials in the trusted orchestration process. Treat PR content and
logs as untrusted input; a submission cannot modify its own active quality policy.

## License

MIT. See [LICENSE](LICENSE).
