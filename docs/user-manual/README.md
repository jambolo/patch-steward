# Patch Steward User Manual

Patch Steward is a work in progress. This repository contains a development
scaffold and design documents. The screening core, CLI, GitHub action and
screening workflows, browser app, adapters, and sandboxed runner are not
implemented.

The installation guide covers the runnable scaffold. Sections marked **Proposed**
describe the documented product design, not available functionality.

## Table of contents

1. [Overview](overview.md)
   - [Purpose and scope](overview.md#purpose-and-scope)
   - [Key concepts](overview.md#key-concepts)
   - [Execution options](overview.md#execution-options-proposed)
   - [Outcomes and waiting states](overview.md#outcomes-and-waiting-states-proposed)
   - [Operating modes](overview.md#operating-modes-proposed)
2. [Installation](installation.md)
   - [Prerequisites](installation.md#prerequisites)
   - [Set up the development scaffold](installation.md#set-up-the-development-scaffold)
   - [Verify the installation](installation.md#verify-the-installation)
   - [Install screening in a target repository](installation.md#target-repository-installation-proposed)
3. [Usage](usage.md)
   - [Work on the scaffold](usage.md#work-on-the-scaffold)
   - [Prepare a submission](usage.md#prepare-a-submission-proposed)
   - [Report a defect or propose a change](usage.md#report-a-defect-or-propose-a-change-proposed)
   - [Submit a pull request](usage.md#submit-a-pull-request-proposed)
   - [Read a report and respond](usage.md#read-a-report-and-respond-proposed)
   - [Maintainer triage](usage.md#maintainer-triage-proposed)
   - [Local screening and replay](usage.md#local-screening-and-replay-proposed)
   - [Calibrate enforcement](usage.md#calibrate-enforcement-proposed)
4. [Command reference](commands.md)
   - [Development commands](commands.md#development-commands-available)
   - [CLI commands](commands.md#cli-commands-proposed)
   - [GitHub conversation commands](commands.md#github-conversation-commands-proposed)
5. [Configuration](configuration.md)
   - [Policy format and precedence](configuration.md#policy-format-and-precedence-proposed)
   - [Named settings and defaults](configuration.md#named-settings-and-defaults-proposed)
   - [Example policy fragment](configuration.md#example-policy-fragment-proposed)
   - [Complete documented policy areas](configuration.md#documented-policy-areas-proposed)
   - [Credentials and deployment](configuration.md#credentials-and-deployment-proposed)
   - [Evidence and visibility](configuration.md#evidence-and-visibility-proposed)
   - [Scaffold configuration](configuration.md#scaffold-configuration-available)
6. [Troubleshooting](troubleshooting.md)
   - [Scaffold and availability](troubleshooting.md#scaffold-and-availability)
   - [Submission corrections](troubleshooting.md#submission-corrections-proposed)
   - [Waiting states and checks](troubleshooting.md#waiting-states-and-checks-proposed)
   - [Infrastructure and inference](troubleshooting.md#infrastructure-and-inference-proposed)
   - [Reports, commands, and dashboard](troubleshooting.md#reports-commands-and-dashboard-proposed)

## Sources and documentation gaps

This manual uses only repository material:

- [Project README](../../README.md): current status, development commands, and scaffold automation.
- [Problem statement](../problem-statement.md): the review burden and scope boundaries.
- [Whitepaper](../whitepaper.md): methodology and evaluation goals.
- [Architecture](../architecture.md): components, boundaries, configuration areas, and open decisions.
- [Processes](../processes.md): workflows, decisions, commands, and failure handling.
- [Package manifest](../../package.json), [sample source](../../packages/core/src/index.ts),
  [sample test](../../packages/core/src/index.test.ts), and [repository guidance](../../CLAUDE.md): development behavior.
- [CI](../../.github/workflows/ci.yml), [CD](../../.github/workflows/cd.yml),
  [TypeScript configuration](../../tsconfig.base.json), [ESLint configuration](../../eslint.config.mjs),
  and [Prettier configuration](../../.prettierrc.json): existing toolchain settings.

Where design documents differ, the architecture governs components and
boundaries, the processes govern steps and behavior, and the whitepaper defers
to both.

`[NEEDS INPUT]` callouts identify information absent or unresolved in the sources.
No published CLI installation command, complete policy schema, or project issue
export was supplied.
