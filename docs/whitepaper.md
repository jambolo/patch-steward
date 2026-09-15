# Patch Steward: Pull Request Screening and Improvement for Maintainers

## Abstract

This is a **WORK IN PROGRESS**.

Low-quality issues, security reports, pull requests, and replies can arrive faster
than open-source maintainers can assess them. Unsupported claims, missing
reproductions, unsuitable fixes, and absent contributor follow-through transfer
investigation and completion work to reviewers. Excessive reporting and automated
discussion add triage and moderation work. The resulting burden delays development
and credible security work and damages maintainer motivation and retention.

Patch Steward's goal is to alleviate these problems, as defined in the
[problem statement](problem-statement.md). Its proposed local and GitHub-hosted
tools combine LLM investigation, reproducible execution evidence, and concise
contributor feedback to establish whether claims are valid, changes serve the
project, and submissions are ready for substantive human review. Contributors
remain responsible for understanding and completing their work.

The project will interface directly with LLM APIs, GitHub APIs, Git, and existing
build and test tools. Success requires measured workload reduction while
preserving access for valid contributions. Screening evaluates evidence and
project fit regardless of authorship; a pass records satisfaction of defined
requirements, with acceptance and merge authority retained by maintainers.

## 1. Origin and scope

This whitepaper develops the methodology, components, and implementation
decisions from the originating conversation on September 14-15, 2026, around the
goal of alleviating the review burden documented in the
[problem statement](problem-statement.md). That document defines the problems
and their supporting evidence. Product behavior described here is proposed unless
explicitly identified as implemented.

The problem scope includes issues, security reports, pull requests, and review
exchanges: disproportionate review effort, unsupported evidence, unjustified
defect claims, missing reproduction and applicability, unsuitable patches,
missing contributor support, excessive reporting, unproductive automation,
misaligned incentives, displaced maintenance, and maintainer exhaustion
(P01-P11). The proposed response centers on contributor preparation, claim
validation, patch verification, concise feedback, and evidence-based routing.
The detailed execution workflow below focuses on GitHub issues and pull requests;
security reports also inform the requirements and evaluation cases.

The project aims to reduce the investigation work transferred to maintainers and
the resulting delays and emotional burden. It cannot by itself change bounty
incentives, guarantee contributor participation, or resolve harassment and
burnout. AI assistance, inexpensive generation, legitimate remediation work,
policy differences, and lost learning opportunities are distinguished from the
core review-quality problem (N01-N05).

Admission fairness, shared handling guidance, and evidence that screening works
are design and evaluation concerns (O01-O03). The response must preserve paths
for legitimate contributors, provide clear evidence requirements and dismissal
reasons, and measure its own workload and errors.

## 2. Goals and limits

### Goals

The primary goal is to reduce avoidable maintainer work caused by low-quality
contributions, preserving capacity and motivation for useful maintenance,
security work, and community growth. The following goals map to the problem
statement's issue identifiers:

- **Justify review effort (P01, P03, P05):** establish that the claimed problem
  exists, the expected behavior has an authoritative basis, and the proposed
  benefit and design fit the project before substantial patch review.
- **Verify claims and applicability (P02, P04):** check that cited APIs, code,
  and references exist and support the claim; require reproducible evidence in
  a supported environment and distinguish project defects from misuse or
  failures in another application.
- **Verify fixes in context (P05):** require before-and-after evidence for bug
  fixes, assess design and completeness, and check for regressions beyond the
  edited code. Passing tests alone cannot establish that a change is wanted.
- **Support contributor responsibility (P06, P09):** give actionable preflight
  feedback and request missing evidence, explanations, and revisions from the
  contributor, reducing the unfinished investigation handed to maintainers.
- **Keep triage and automation useful (P07, P08):** produce concise evidence and
  specific findings, consolidate automated updates, and leave unsupported
  severity claims and ambiguous intent for maintainer assessment.
- **Protect maintainer capacity (P01, P10, P11):** automate bounded collection,
  execution, reporting, and routing to reduce repeated investigation, queue
  pressure, and avoidable exchanges that displace development and security work.
- **Preserve fair, auditable handling (O01, O02):** state evidence requirements
  and decision reasons, distinguish uncertainty from poor quality, and support
  appeals and maintainer overrides without treating AI use alone as a defect.
- **Demonstrate net benefit (O03):** measure maintainer time saved, invalid
  submissions admitted, valid contributions blocked, contributor retries and
  abandonment, and screening cost and latency before enforcing admission rules.

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

### Blog Posts & Articles

- [Stay away from my trash! — Steve Ruiz](https://tldraw.dev/blog/stay-away-from-my-trash)
  (January 17, 2026): AI-generated PRs can pass tests while misunderstanding
  project needs, ignoring existing patterns, and lacking author follow-through.
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
- [The end of the curl bug bounty — Daniel Stenberg](https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/):
  explains ending monetary rewards and moving reports to GitHub to reduce
  low-quality submissions and maintainer exhaustion.
- [Security Issues and Volunteers — Benjamin Peterson](https://www.locrian.net/writing/open-source-security/):
  describes how bogus reports, disclosure work, and bounty expectations burden
  volunteer CPython maintainers, predating generative AI.
- [Respecting maintainer time should be in security policies — Seth Larson](https://sethmlarson.dev/respecting-maintainer-time-should-be-in-security-policies):
  proposes short initial reports, optional proof-of-concept scripts, and
  maintainer-led severity assessment to reduce triage effort.
- [Maintaining open source in the age of generative AI — Adrin Jalali and Cailean Osborne](https://blog.probabl.ai/maintaining-open-source-age-of-gen-ai):
  recommends explicit AI policies, agent guidance, and contributor understanding,
  testing, and accountability to protect maintainer time.
- [The Generative AI Policy Landscape in Open Source — Kate Holterhoff](https://redmonk.com/kholterhoff/2026/02/26/generative-ai-policy-landscape-in-open-source/):
  maps project AI policies by permissiveness, disclosure requirements, adoption
  date, and concerns about quality, copyright, and ethics.

### Project Policies & Changes

- [LLVM AI Tool Use Policy](https://llvm.org/docs/AIToolPolicy.html):
  requires human review, contributor accountability, and disclosure of substantial
  AI assistance; contributions should justify their review cost.
- [Selenium AI-assisted contribution policy PR](https://github.com/SeleniumHQ/selenium/pull/17043):
  adds human accountability and AI disclosure requirements, prohibits autonomous
  PRs and commits, and updates the contribution template.
- [Django AI disclosure requirement](https://github.com/django/django/commit/0f60102444d8a2cfb662a7b11b3911b52567ee54):
  requires security reporters to disclose AI tools and their uses, verify
  reproducibility, and exclude fabricated content.
- [Node.js HackerOne Signal Requirement](https://nodejs.org/en/blog/announcements/hackerone-signal-requirement):
  requires a Signal score of at least 1.0 to reduce low-quality reports; an update
  directs researchers without Signal to security stewards through Slack.
- [Addressing AI-slop in security reports — Apache Log4j](https://github.com/apache/logging-log4j2/discussions/4052):
  describes report overload slowing development and prioritizing credible reports
  while deferring questionable ones within limited volunteer time.

### Examples & Data

- [AI slop security reports submitted to curl (gist)](https://gist.github.com/bagder/07f7581f6e3d78ef37dfbfc81fd1d1cd):
  catalogs HackerOne security reports identified by curl's maintainer as AI slop,
  with links to individual submissions.

### Talks & Events

- [FOSDEM 2026: OSS in Spite of AI](https://fosdem.org/2026/schedule/event/B7YKQ7-oss-in-spite-of-ai/):
  Daniel Stenberg's talk covers both maintainer overload from false AI reports
  and useful vulnerability discoveries by newer AI tools.
- [GVIP Summit AI-Slop Session](https://www.gvip-project.org/summit01/agenda/#aislop):
  Jarek Potiuk's session explores triage burnout and coordinated standards for
  identifying and dismissing low-quality automated vulnerability reports.
