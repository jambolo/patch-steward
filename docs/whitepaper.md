# Patch Steward: Pull Request Screening and Improvement for Maintainers

## Abstract

Open-source maintainers face a flood of low-quality pull requests: reports of
behavior that is not a bug, incomplete or defective fixes, and changes that
regress unrelated functionality. Patch Steward assists project maintainers by
screening, validating, verifying, and improving pull requests before human review.
It combines LLM investigation with reproducible test execution to assess claims,
identify needed improvements, and reduce the maintainer's review workload.

The project will provide a local TypeScript/Node.js CLI application backed by an
internal screening core. It will interface directly with LLM APIs, GitHub APIs, Git,
and existing build and test tools. Passing screening means a change has met
defined evidence requirements; it does not certify correctness or authorize
automatic merging.

## 1. Origin and scope

This whitepaper consolidates the substantive requirements, methodology,
components, and implementation decisions from the originating conversation on
September 14-15, 2026. It is an edited account of that discussion, not a verbatim
transcript. Product behavior described here is proposed unless explicitly
identified as implemented.

The initial request was for a methodology using ChatGPT to screen submissions
before maintainer review, with automation wherever practical. Follow-up
discussion established the component inventory, local execution, TypeScript as
the implementation language, and direct LLM/GitHub API connectivity.

The current repository contains a development scaffold and this design. It does
not yet perform screening, call provider APIs, create sandboxes, or publish
GitHub results.

## 2. Goals and limits

### Goals

- Reduce maintainer attention spent on unsupported bug claims and defective fixes.
- Establish whether expected behavior is justified before evaluating a patch.
- Require reproducible before-and-after evidence.
- Detect incomplete fixes and regressions beyond the edited code.
- Automate collection, execution, reporting, and routing.
- Give contributors actionable feedback before requesting review.
- Preserve an auditable path for ambiguity, appeals, and maintainer overrides.

### Limits

Tests cannot prove the absence of regressions. LLMs can misunderstand intent,
miss defects, invent problems, or repeat the author's assumptions. Neither an AI
approval score nor a passing test written against a mistaken expectation is
sufficient evidence of correctness.

The system admits work to human review; maintainers retain acceptance and merge
authority. It must distinguish a bad contribution from an unavailable environment
or an ambiguous specification.

## 3. Quality contract

A versioned policy maintained on the trusted target branch defines:

- Supported behavior, environments, platforms, and compatibility guarantees.
- Required build, test, lint, and static-analysis commands.
- Evidence required for each category of change.
- Mandatory checks that impact analysis cannot omit.
- Escalation rules for unclear requirements and sensitive changes.
- Runtime, token, retry, and other resource limits.

A PR may propose policy changes, but cannot make those changes govern its own
screening run. Each report records the policy revision used.

## 4. Submission contract and bug validation

The contributor supplies expected behavior and an authoritative basis, actual
behavior, affected version, a minimal reproduction with an execution command,
and the proposed scope of the fix. References may include documentation,
specifications, or an accepted maintainer decision.

The LLM examines relevant source, tests, documentation, prior issues, and
decisions. It returns one of: supported defect, intended behavior, feature
request, duplicate, or uncertain. Each classification must include evidence.

A failing regression test is not enough: the asserted expectation may be wrong.
For example, a test that expects an intentionally unsupported input to succeed
does not establish a defect. Ambiguous intent enters a small maintainer triage
queue before substantial implementation review.

Missing evidence produces a specific request for changes. The system does not
invent requirements to complete the submission.

## 5. Reproduce the defect and verify the fix

The runner executes an identical regression test against controlled versions:

| Version                                                        | Required evidence                        |
| -------------------------------------------------------------- | ---------------------------------------- |
| Target branch plus regression test, without the production fix | Fails for the claimed behavioral reason. |
| Proposed change plus the identical regression test             | Passes.                                  |
| Proposed change integrated with the current target branch      | Passes.                                  |

Clean environments and recorded dependencies make results reproducible. A build
failure unrelated to the claim is not the required negative result. The screener
checks that the patch does not pass by disabling assertions, swallowing errors,
or weakening existing tests.

Results include the command, environment identity, exit status, relevant output,
test identity, and commit IDs. Infrastructure errors are inconclusive and must
not silently become either a quality rejection or a pass.

## 6. Independently challenge the patch

A separate LLM screening session receives the trusted requirements, issue, patch,
relevant code, and execution evidence without the author's reasoning history.

It traces affected callers and shared components, checks boundary and error
cases, looks for compatibility changes, and proposes concrete counterexamples.
The runner executes the additional tests rather than treating generated test
text as verified evidence.

Complex or high-impact changes may justify property-based testing, fuzzing, or
mutation testing. These are selective tools, not universal requirements.

Every blocking finding identifies a concrete scenario, code location, and
supporting evidence. Speculation is recorded separately and does not
automatically reject a contribution. Independent sessions can still share model
blind spots; agreement is not proof.

## 7. Regression analysis

The runner executes the project's mandatory suite and supported platform matrix.
LLM impact analysis can add targeted checks, but cannot remove mandatory ones.

Failures are compared with the unmodified target branch to separate introduced
regressions from existing problems. Changes to shared state, public interfaces,
dependencies, and build configuration receive additional attention.

Tests against the integrated target branch matter because a patch that works in
isolation may fail when combined with recent upstream changes.

## 8. Admission and contributor feedback

The intended process is:

```text
Contributor preflight
        |
        v
Draft PR -> Trusted automated screening
                |            |              |
                v            v              v
          Needs changes   Uncertain        Pass
                |            |              |
                v            v              v
          Contributor   Maintainer triage  Human review
```

Preflight can run locally before a PR exists. Its reports are useful feedback,
but the trusted maintainer or CI service repeats the checks before admission.

A screening report includes classification, blockers, uncertainties, executed
commands, results, and evidence links. The bot updates one concise report rather
than flooding the discussion with comments.

A required screening check protects merging; it does not itself prevent PR
creation or review requests. A bot and repository process control admission to
the review queue. Only passed submissions receive automatic reviewer requests.

Reports are bound to base/head commit IDs and the policy revision. Changes to
either tested commit invalidate the prior result and trigger applicable checks.

## 9. Components

| Component                        | Responsibility                                                              |
| -------------------------------- | --------------------------------------------------------------------------- |
| Versioned quality policy         | Defines behavior, execution requirements, and escalation rules.             |
| Structured submission schema     | Captures the claim, references, reproduction, and scope.                    |
| Screening core                   | Coordinates stages and applies deterministic admission rules.               |
| LLM screening adapters           | Validate claims, inspect patches, and propose counterexamples through APIs. |
| Repository context retrieval     | Supplies relevant code, documentation, tests, issues, and decisions.        |
| Isolated test runner             | Executes reproduction, fix, and regression checks.                          |
| Git adapter                      | Fetches revisions, creates worktrees, and inspects diffs.                   |
| GitHub adapter                   | Reads submissions and publishes authorized check results and reports.       |
| Evidence store                   | Persists execution records and findings tied to immutable revisions.        |
| Local CLI                        | Supports contributor preflight and maintainer-initiated screening.          |
| Maintainer triage and override   | Resolves ambiguous intent, disputes, and justified exceptions.              |
| Monitoring and resource controls | Measures quality and workload while bounding cost and runtime.              |

Components are logical boundaries; they need not become separate services.

## 10. Language and local architecture

Python was initially suggested because the workload centers on orchestration,
API calls, and structured data. The discussion did not establish a measurable
Python advantage. The user preferred TypeScript, which is the selected language.

TypeScript offers explicit types for policies, evidence, and workflow states,
asynchronous orchestration, and code reuse across a CLI, GitHub integration, and
a potential interface. External data still requires runtime validation; static
types do not validate API responses or LLM output.

The architecture is a TypeScript/Node.js CLI application with an internal core and small
provider adapters. The same core should serve local execution and CI. It can
screen repositories written in C++, Rust, Python, TypeScript, or other languages
by invoking their established tools. Platform-specific build requirements remain
the responsibility of the configured runner.

Builds, tests, and remote model latency are expected to dominate runtime.
No performance benchmark was conducted during the design discussion.

## 11. LLM and GitHub connectivity

The local process connects directly to LLM APIs using SDKs or HTTPS. ChatGPT can
help contributors interactively; unattended screening uses programmatic APIs.

LLM requests produce validated structured findings, including bug validity,
evidence, blockers, and uncertainties. Application code decides admission.
Schema conformance makes responses easier to process but does not make them true.

The GitHub adapter retrieves PR metadata, issues, diffs, and references, and
publishes reports or check results with appropriate authorization. Local Git
handles checkouts and worktrees. Node.js subprocess APIs invoke build and test
tools; actual untrusted execution must occur behind a sandbox boundary.

No hosted backend is required for an on-demand local run. Continuous screening
requires a trigger: GitHub Actions, a reachable webhook receiver, or a running
local polling process. A local CLI that is not running cannot receive events.

Authentication must support the chosen deployment mode. Exact SDKs, credential
storage, GitHub authentication mode, and API permission scopes remain
implementation decisions. Publishing or modifying GitHub state must be explicit
in the tool's operating mode.

## 12. Security and resource boundaries

Submitted code executes in disposable environments without LLM API keys, GitHub
write tokens, host credentials, or sensitive host mounts. Worktrees and Python
virtual environments are not security sandboxes. Node.js subprocesses alone do
not create a sandbox either.

The trusted orchestrator retains credentials and uses a separate reporting path.
PR descriptions, repository files, comments, generated output, and logs are
untrusted data. They cannot override the screening policy or authorize tools.
Prompt instructions alone do not enforce this boundary.

Avoid privileged workflows that check out and execute untrusted PR code.
Validate artifact provenance and revision identity before publishing a result.

Run inexpensive checks first. Cache results only when their relevant inputs
match, cancel superseded runs, and cap execution time, tokens, and repair
attempts. Use bounded output capture and redact credentials from stored logs.
Service failure, refusal, malformed output, and missing evidence do not produce
a pass.

## 13. Calibration and enforcement

Begin in observation mode on historical and incoming PRs. Measure:

- Invalid submissions admitted and valid contributions blocked.
- Maintainer minutes per admitted PR.
- Contributor retries and abandonment.
- Screening cost and latency.
- Override frequency and reasons.

Enable blocking first for reproducible, well-supported failures. Preserve
maintainer overrides and audit samples of both passed and blocked submissions.
The success criterion is reduced maintainer workload without systematically
excluding valid contributions.

### Historical evaluation cases

- [AI slop security reports submitted to curl — Daniel Stenberg](https://gist.github.com/bagder/07f7581f6e3d78ef37dfbfc81fd1d1cd):
  a curated list of security reports submitted to curl's HackerOne bug-bounty
  program, identified by its maintainer as AI slop. These cases can test whether
  Patch Steward detects unsupported claims and reduces investigation effort.
  The collection contains security reports, not a list of GitHub pull requests.

Use accessible reports with the relevant historical source revisions and retain
maintainer resolutions as evaluation labels, withheld from screening inputs.
Supplement these cases with independently reviewed issues and pull requests,
including genuine defects and valid fixes, to measure both incorrect admissions
and incorrect rejections. Report unavailable evidence as inconclusive. This
collection alone cannot establish fix-verification or regression-detection
effectiveness.

## 14. Scaffold and open implementation decisions

The repository starts with pnpm, strict TypeScript, ESLint, Prettier, Vitest,
coverage support, an MIT license, and GitHub CI/CD templates. Authored
documentation is tracked in docs.

The sample source is only a toolchain smoke test. No working screening command
or provider integration is claimed.

Decisions still to be made include the policy/report schemas, sandbox technology,
provider/model selection, context selection strategy, authentication modes,
evidence retention, numerical resource limits, and measured enforcement
thresholds. They were not resolved in the conversation.

## 15. References

### Maintainer accounts and contribution policies

- [Stay away from my trash! — Steve Ruiz](https://tldraw.dev/blog/stay-away-from-my-trash)
  (January 17, 2026): AI-generated PRs can pass tests while misunderstanding
  project needs, ignoring existing patterns, and lacking author follow-through.
- [tldraw contributions policy](https://github.com/tldraw/tldraw/issues/7695)
  (January 15, 2026): explains automatically closing external PRs because
  misleading context and low engagement overwhelm maintainer review capacity.
- [Ghostty contribution policy](https://github.com/ghostty-org/ghostty/blob/main/CONTRIBUTING.md):
  requires contributors to understand their changes and obtain a maintainer's
  endorsement before submitting PRs, addressing low-quality submissions and
  erosion of trust.
- [Death by a thousand slops — Daniel Stenberg](https://daniel.haxx.se/blog/2025/07/14/death-by-a-thousand-slops/)
  (July 14, 2025): quantifies curl's false-report burden and maintainer exhaustion,
  with links to actual submissions.
- [New era of slop security reports for open source — Seth Larson](https://sethmlarson.dev/slop-security-reports)
  (December 3, 2024): plausible AI-generated security reports consume volunteer
  investigation time and contribute to stress, isolation, and burnout.
- [The I in LLM stands for intelligence — Daniel Stenberg](https://daniel.haxx.se/blog/2024/01/02/the-i-in-llm-stands-for-intelligence/)
  (January 2, 2024): concrete examples of hallucinated vulnerabilities and the
  lengthy clarification exchanges needed to dismiss them.
- [OpenSSF AI-slop working-group discussion](https://github.com/ossf/wg-vulnerability-disclosures/issues/178):
  collects maintainer accounts, project policies, and proposed mitigations for
  low-quality AI-generated reports and contributions.

### Technical references from the discussion

- [GitHub status checks](https://docs.github.com/en/pull-requests/reference/status-checks):
  required checks govern merge eligibility.
- [GitHub secure use reference](https://docs.github.com/en/actions/reference/security/secure-use):
  workflow permissions and risks of executing untrusted changes.
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs):
  schema-constrained model responses, distinct from factual validation.
- [Python subprocess documentation](https://docs.python.org/3/library/subprocess.html):
  background for the initial language comparison; Python was not selected.
