# patch-steward — Project Ledger

## Project

- project-name: patch-steward
- project-plan: docs/project-development-plan.md
- artifacts-dir: development-artifacts
- develop-branch: develop
- current-milestone: 2

## Milestones

|   # | Name                                                       | Status  | Branch                          | Merge commit | Notes                                                                    |
| --: | ---------------------------------------------------------- | ------- | ------------------------------- | ------------ | ------------------------------------------------------------------------ |
|   1 | Monorepo foundation                                        | done    | milestone/1-monorepo-foundation | 34c5efa      | 2 phases, 17 steps; root manifest metadata restored by lead before merge |
|   2 | Platform assumption probes                                 | pending |                                 |              |                                                                          |
|   3 | Policy and data contracts                                  | pending |                                 |              |                                                                          |
|   4 | Submission intake and contract check                       | pending |                                 |              |                                                                          |
|   5 | Decision, report, evidence records, local skeleton         | pending |                                 |              |                                                                          |
|   6 | GitHub-hosted skeleton: gate, ownership, evidence, publish | pending |                                 |              |                                                                          |
|   7 | Sandboxed execution                                        | pending |                                 |              |                                                                          |
|   8 | Deterministic verification stages                          | pending |                                 |              |                                                                          |
|   9 | Inference layer                                            | pending |                                 |              |                                                                          |
|  10 | Reference verification and claim validation                | pending |                                 |              |                                                                          |
|  11 | Evaluation replay                                          | pending |                                 |              |                                                                          |
|  12 | Model-assisted verification and independent challenge      | pending |                                 |              |                                                                          |
|  13 | GitHub-hosted full pipeline in observe mode                | pending |                                 |              |                                                                          |
|  14 | Repository gate and visible feedback                       | pending |                                 |              |                                                                          |
|  15 | Maintainer commands, recorded actions, inference admission | pending |                                 |              |                                                                          |
|  16 | Contributor follow-through and dependency propagation      | pending |                                 |              |                                                                          |
|  17 | Maintenance, calibration, and publication data             | pending |                                 |              |                                                                          |
|  18 | Browser application                                        | pending |                                 |              |                                                                          |
|  19 | Merge queue                                                | pending |                                 |              |                                                                          |
|  20 | Adoption, distribution, and release candidate              | pending |                                 |              |                                                                          |
|  21 | Measured rollout and version 1 acceptance                  | pending |                                 |              |                                                                          |

## Owner decisions

| Milestone | Decision                          | Value                                                                                                 | Date       |
| --------- | --------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------- |
| M01       | Versioning and CD manifest        | One shared version; root `package.json` is the source the CD trigger reads; packages stay in lockstep | 2026-09-17 |
| M01       | Supported Node.js                 | Node 24 only: CLI `engines` `>=24`; action runtime `node24`                                           | 2026-09-17 |
| M01       | Test tiers in CI                  | Unit and fixture on Ubuntu and Windows; container on Ubuntu only; live probe never in CI              | 2026-09-17 |
| M01       | Home of the shared fixture corpus | Root `fixtures/` directory, not a workspace package                                                   | 2026-09-17 |

## Events

<!-- lead-developer appends: milestone | event (planned / phase N done / evaluated /
     merged / escalated) | detail -->

| Milestone | Event        | Detail                                                                                                                                                       |
| --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| M01       | started      | Owner decisions recorded; branch created                                                                                                                     |
| M01       | planned      | Brief, roadmap (2 phases), ledger at f78f964                                                                                                                 |
| M01       | phase 1 done | Workspace conversion, 7 steps; one revision (worker reports fenced for Prettier); phase commit 7d4c671                                                       |
| M01       | phase 2 done | CI/CD Node 24 and doc recording, 10 steps; one gate-strengthening amendment (50c6f5a), two acceptance-check corrections; phase commit 666efc6                |
| M01       | evaluated    | All exit criteria pass on Windows; Ubuntu by CI config only. Gap outside DoD: root manifest metadata dropped in step 1.1; owner chose lead restore (8392675) |
| M01       | merged       | Squash commit 34c5efa on develop; branch deleted                                                                                                             |
