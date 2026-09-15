# Patch Steward

Patch Steward is a set of local and GitHub-hosted tools to help
contributors and maintainers validate, verify, improve, and screen issues,
security reports, and pull requests before substantive maintainer review.

## Goal

Alleviate the unsustainable review burden described in the
[problem statement](docs/problem-statement.md), preserving maintainer time and
motivation for development, credible security findings, and community growth.
Low-value submissions, unsupported claims, missing reproductions, unsuitable
patches, abandoned revisions, and noisy exchanges shift investigation and
completion work onto maintainers.

Patch Steward aims to:

- Establish that a reported problem is real, applicable, and worth addressing
  before investing in patch review.
- Check supporting evidence, reproduce failures, and assess fixes against project
  intent, existing design, and regression checks.
- Help contributors supply missing evidence, explain their choices, and finish
  revisions before handing work to maintainers.
- Keep reports and automated feedback concise, evidence-based, and actionable,
  with uncertainty and severity judgments left for appropriate maintainer triage.
- Reduce repeated investigation and queue pressure while preserving access for
  valid contributions, appeals, and maintainer overrides.

Success means a measured reduction in maintainer workload without systematically
excluding valid contributions. Screening assesses substance and contributor
support; AI assistance or ease of generation alone does not establish poor
quality. Passing checks does not establish project value or authorize merging.

## Status

This is a **WORK IN PROGRESS**

Project scaffold and design documentation. The screening engine, CLI, LLM and
GitHub integrations, and isolated runner are not implemented. The sample source and
test only verify the development toolchain.

The [whitepaper](docs/whitepaper.md) connects these problems to the proposed
methodology, requirements, architecture, and decisions.

## Local execution and integrations

The intended implementation uses a shared TypeScript/Node.js screening core for
a local CLI and GitHub-hosted workflows. It connects directly to LLM and GitHub
APIs and invokes existing Git/build/test tools. It can screen repositories written
in other languages.

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
- docs/problem-statement.md: review problems, evidence, and scope boundaries.
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
