# Problem Statement: Unsustainable Review Process as a Result of Low-Quality Contributions

## 1. Core problem

Open-source maintainers must determine whether incoming claims are valid, proposed
changes are useful, and contributors can support their work. Rapid generation of
low-quality reports, patches, and replies increases the work entering this process without
supplying corresponding reviewer capacity. The resulting imbalance consumes time
needed for development, security fixes, and community growth. This is a synthesis
of the review-cost problem described by LLVM and the disclosure-capacity problem
framed by the GVIP session. [LLVM policy](https://llvm.org/docs/AIToolPolicy.html); [GVIP session abstract](https://www.gvip-project.org/summit01/agenda/#aislop); [FOSDEM abstract](https://fosdem.org/2026/schedule/event/B7YKQ7-oss-in-spite-of-ai/).

## 2. Scope and evidence

This document synthesizes all 18 references in the [whitepaper](whitepaper.md#15-references),
reviewed on September 15, 2026. It covers pull requests, issues, security reports,
review comments, and the effects on maintainers and contributors. Each numbered
issue describes a failure mechanism, supporting observations, and its consequences.
Interpretations that go beyond a source's direct observations are identified as
inferences.

Priorities apply only to detailed issues. They reflect the urgency expressed in
the cited maintainer accounts and policies: **A** threatens maintainer capacity,
security triage, or retention; **B** creates substantial recurring review work;
and **C** is a secondary but material source of review inefficiency.

The sources have different evidentiary roles. Maintainer accounts describe local
experience; policies establish expectations; discussions and event abstracts
identify concerns or proposed responses. Policy adoption does not demonstrate
that a mitigation works. Event coverage here uses the linked descriptions, not a
review of the recordings. The GVIP description was available through the search
index when direct retrieval timed out. The curl gist is a curated collection of
reports; its individual linked submissions were not independently revalidated.

“AI slop” follows the sources' usage for low-quality generated submissions. It is
not an independently verified authorship classification. Low-quality reporting
predates generative AI: Peterson described bogus scanner findings and volunteer
triage burdens in 2016. [Peterson](https://www.locrian.net/writing/open-source-security/).

## 3. Detailed issues

### P01. Low-value submissions consume disproportionate review effort — Priority: A

Low-quality reports and patches can be generated faster than maintainers can
validate them. Each submission may require code inspection, design judgment, and
coordination among several reviewers, even when it contributes nothing useful.
At curl, a report could occupy three or four people for roughly 30 minutes to
three hours each, consuming much of a volunteer's weekly availability.
[Stenberg, July 2025](https://daniel.haxx.se/blog/2025/07/14/death-by-a-thousand-slops/).

The imbalance also affects elaborate, technically competent contributions whose
benefit is too small to justify their review cost. Contributors can hand off
unresolved design decisions and verification work with the patch. Maintainers
then supply the expensive judgment that the submission process omitted, leaving
less attention for higher-value work. [LLVM policy](https://llvm.org/docs/AIToolPolicy.html).

### P02. Professional presentation conceals unsupported claims — Priority: B

Invalid reports can look as credible as valid ones. Fluent explanations,
technical detail, and proposed fixes make unsupported allegations expensive to
reject because reviewers must investigate their substance. A curl WebSocket
report with those features required repeated code inspection and clarification
before the alleged overflow was dismissed. Presentation gave no reliable
indication of the underlying evidence quality. [Stenberg, January 2024](https://daniel.haxx.se/blog/2024/01/02/the-i-in-llm-stands-for-intelligence/).

Fabricated APIs, code, and citations add another layer of work: reviewers must
establish that the supporting material exists before assessing the claim.
Apparent completeness can therefore increase investigation time without adding
verifiable information. The burden of correcting invented evidence falls on the
project receiving it. [Django policy change](https://github.com/django/django/commit/0f60102444d8a2cfb662a7b11b3911b52567ee54).

### P03. Reported behavior is mistaken for a justified defect — Priority: B

A plausible issue description can be accepted as a requirement before anyone
checks whether it represents a real problem. When generated issues feed directly
into generated fixes, an incorrect premise propagates into implementation.
The resulting patch may faithfully follow the ticket while solving an imagined
bug or pursuing an unsuitable design. Tracker membership alone does not establish
that a change is wanted. [Ruiz](https://tldraw.dev/blog/stay-away-from-my-trash).

Security findings can similarly confuse the presence of a suspicious operation
with unsafe behavior. For example, a reference to SSLv2 was reported as insecure
when its purpose was to disable the protocol. Missing context turns protective
or intended behavior into an allegation that maintainers must explain and refute.
[Larson, December 2024](https://sethmlarson.dev/slop-security-reports).

### P04. Reproduction and applicability are left for maintainers to establish — Priority: A

Reports can present a hypothetical failure without demonstrating it in a
maintained version under realistic usage. Findings may depend on invented code,
incorrect API use, or behavior introduced by a separate application. Without
independently verifiable evidence, maintainers must reconstruct the conditions
and determine whether the claimed failure belongs to their project at all.
[Django policy change](https://github.com/django/django/commit/0f60102444d8a2cfb662a7b11b3911b52567ee54).

This gap is obscured by precise-sounding labels for memory corruption, protocol
errors, or configuration weaknesses. Such allegations span many parts of curl's
report collection. **Inference:** without a reproduction or an explanation of
applicability, maintainers must supply the investigation that connects the
allegation to actual software behavior.
[Curl report collection](https://gist.github.com/bagder/07f7581f6e3d78ef37dfbfc81fd1d1cd).

### P05. Passing checks do not establish that a patch serves the project — Priority: B

A patch can pass tests while implementing unwanted behavior, overlooking existing
helpers, or introducing an unsuitable design. Automated checks cannot resolve
project intent that was never established in the first place. Maintainers must
still determine whether the problem deserves a fix and whether the implementation
fits the codebase; correcting a plausible but misguided patch can cost more than
implementing the intended change themselves. [Ruiz](https://tldraw.dev/blog/stay-away-from-my-trash).

### P06. Contributors submit work they cannot explain or finish — Priority: B

Generating a patch does not ensure its author understands the change or can
respond to review. When contributors disappear after requests for revision,
maintainers inherit the unfinished debugging, explanation, and integration work.
The submission supplies an artifact without the sustained participation needed
to make it usable. [Jalali and Osborne](https://blog.probabl.ai/maintaining-open-source-age-of-gen-ai).

**Inference from contribution requirements:** when authors cannot explain their
implementation choices or correct defects, technical questions remain unresolved.
Maintainers must reconstruct the reasoning and finish the work themselves or
abandon a review in which they have already invested time. [Selenium policy PR](https://github.com/SeleniumHQ/selenium/pull/17043).

### P07. Excessive length and premature severity claims obstruct triage — Priority: C

Long initial reports force maintainers to process more material than they need
to decide whether an issue merits investigation. Repeated explanations, elaborate
formatting, and unsupported severity assessments compete with the actual behavior
and reproduction for attention. Even a valid finding can impose unnecessary
triage cost when its essential evidence is difficult to extract.
[Larson, February 2026](https://sethmlarson.dev/respecting-maintainer-time-should-be-in-security-policies).

The mismatch can arise from good intentions: a reporter supplies extensive
context to avoid questions, while the reviewer first needs a small amount of
specific evidence. Assertions about criticality also preempt a judgment that
depends on project context. The result is more reading and correction before
reporter and maintainer can begin a useful technical exchange.
[Larson, February 2026](https://sethmlarson.dev/respecting-maintainer-time-should-be-in-security-policies).

### P08. Low-quality automated participation creates additional review work — Priority: B

Generated approvals, misleading advice, premature issue claims, and exchanges
between agents add activity without advancing the work. Legitimate contributors
can be diverted by incorrect feedback, while maintainers must moderate it and
restore a shared understanding. Using live repositories to evaluate models also
turns project participants into unpaid reviewers of experimental output.
[Jalali and Osborne](https://blog.probabl.ai/maintaining-open-source-age-of-gen-ai).

### P09. Incentives reward submissions while investigation costs fall elsewhere — Priority: B

Potential bounty payments encourage speculative reporting, while the recipient
pays the cost of checking unsuccessful claims. Reputation penalties offer weak
deterrence when a new account is inexpensive. At curl, only about 5% of submissions
in the first part of 2025 had become confirmed vulnerabilities by early July;
about 20% appeared to be AI slop. Invalidity and suspected AI authorship are
separate measures. [Stenberg, July 2025](https://daniel.haxx.se/blog/2025/07/14/death-by-a-thousand-slops/).

Expectations of payment or recognition can also exceed what volunteer projects
have offered or can support. **Inference:** the incentive to obtain a finding or
credit can outweigh the incentive to help finish the work, leaving maintainers
with both investigation and expectation management. Report quality alone does
not establish an individual reporter's motive. [Peterson](https://www.locrian.net/writing/open-source-security/).

### P10. Security queues displace ordinary development and create delays — Priority: A

Security claims receive urgent attention before their validity is known. A large
influx can therefore displace ordinary maintenance even when few reports prove
useful. Apache logging projects experienced slower public development while
attention shifted to private reports: 17 arrived in December 2025, 20 in January
2026, and 13 by February 25, compared with about 20 regular Log4j bug reports over
that period. [Log4j discussion](https://github.com/apache/logging-log4j2/discussions/4052).

**Inference:** time spent investigating weak claims leaves less capacity for
ordinary bug fixes and credible security findings. The resulting delays affect
contributors and users whose needs remain unresolved while maintainers work
through low-quality reports.
[Log4j discussion](https://github.com/apache/logging-log4j2/discussions/4052).

### P11. Repeated investigation damages motivation and retention — Priority: A

Repeatedly investigating invalid reports produces frustration, stress, and a
sense that scarce volunteer effort is being wasted. Confidential security work
can intensify isolation by limiting opportunities to share the burden. Exhaustion
can reduce maintainers' willingness to engage with later reports, including
legitimate ones. The effects persist beyond the time spent on an individual case.
[Larson, December 2024](https://sethmlarson.dev/slop-security-reports).

Rejection can also trigger argument, personal attacks, or public shaming.
Maintainers must then defend their judgment as well as assess the submission.
This emotional cost undermines the motivation that sustains volunteer work and
makes security participation less rewarding for the people whose experience the
project most needs. [Peterson](https://www.locrian.net/writing/open-source-security/); [OpenSSF discussion](https://github.com/ossf/wg-vulnerability-disclosures/issues/178).

## 4. Non-issues

These concerns appear in the sources but do not, by themselves, establish the
core problem of review effort wasted on low-quality contributions. Some are
legitimate concerns outside this document's scope. Their classification here is
an interpretation of relevance, not a claim that the sources dismiss them.

### N01. Generating a pull request is easier than reviewing it

A contribution can be inexpensive to produce and still be worth the review
effort. The relative effort of author and reviewer does not establish whether
the change is correct, useful, or adequately supported. The relevant burden in
P01 arises when low-value submissions consume disproportionate maintainer effort.
Ease of generation can amplify that burden, but is not itself a quality defect.
[Ruiz](https://tldraw.dev/blog/stay-away-from-my-trash); [LLVM policy](https://llvm.org/docs/AIToolPolicy.html).

### N02. A contribution was produced with AI assistance

Tool use alone does not establish that a contribution is poor. AI can support
translation, code development, and useful vulnerability discovery. The problems
in P02-P06 concern unsupported claims, unsuitable changes, missing evidence, and
absent understanding. A submission's origin does not settle those questions.
[FOSDEM abstract](https://fosdem.org/2026/schedule/event/B7YKQ7-oss-in-spite-of-ai/); [Stenberg, January 2024](https://daniel.haxx.se/blog/2024/01/02/the-i-in-llm-stands-for-intelligence/).

### N03. Valid findings require substantial remediation work

Implementing fixes, backporting them, checking compatibility, coordinating
disclosure, and preparing releases consume time even when a report is excellent.
That is ordinary maintenance work arising from a real defect. Missing evidence
or abandoned revisions can add avoidable effort, as covered in P04 and P06, but
the inherent cost of fixing a genuine problem does not make its report low quality.
[Peterson](https://www.locrian.net/writing/open-source-security/).

### N04. Projects have different contribution policies

Projects differ in AI permissions, disclosure rules, attribution, and licensing
requirements. Defining and enforcing those policies is a governance concern.
Variation among policies does not itself demonstrate defective contributions or
wasted technical review. Actual failures of contributor understanding and
follow-through remain relevant under P06, independently of the policy chosen.
[Holterhoff](https://redmonk.com/kholterhoff/2026/02/26/generative-ai-policy-landscape-in-open-source/); [Selenium policy PR](https://github.com/SeleniumHQ/selenium/pull/17043).

### N05. Automation can displace learning opportunities

Completing beginner issues automatically can bypass the learning and
relationships those issues are intended to support. That concerns contributor
development even when the resulting change is useful and correct. It is outside
the review-quality problem defined here. Misleading comments and unproductive
agent exchanges remain relevant under P08 because they directly create extra
review and moderation work. [LLVM policy](https://llvm.org/docs/AIToolPolicy.html);
[Jalali and Osborne](https://blog.probabl.ai/maintaining-open-source-age-of-gen-ai).

## 5. Other issues

These issues concern the design, implementation, and evaluation of responses to
the core problem. They describe issues with how low-quality contributions are addressed.

### O01. Admission restrictions can exclude legitimate contributors

Reputation requirements, submission fees, and ending bounty payments have costs
for participation and administration. For example, Node.js directs researchers
without the required HackerOne Signal to another reporting route. These are
tradeoffs in responses to low-quality traffic. They matter when evaluating a
response, but do not explain the original quality failures that make review
unsustainable. [Node.js announcement](https://nodejs.org/en/blog/announcements/hackerone-signal-requirement); [Stenberg, January 2026](https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/).

### O02. Projects lack shared procedures for handling poor submissions

Confidential reporting and differing organizational practices complicate sharing
experience and coordinating responses. Establishing common dismissal criteria
or reporting guidance concerns how projects manage the burden. It is outside
the core problem here, while the isolation experienced by maintainers remains a
relevant consequence under P11. [Larson, December 2024](https://sethmlarson.dev/slop-security-reports);
[GVIP session abstract](https://www.gvip-project.org/summit01/agenda/#aislop); [OpenSSF discussion](https://github.com/ossf/wg-vulnerability-disclosures/issues/178).

### O03. Screening controls need better evaluation evidence

Selected examples of poor reports and catalogs of project policies cannot alone
establish whether a screening rule works. **Inference:** measuring missed
findings, mistaken rejections, and workload reduction requires evidence beyond
those collections. This is a problem in evaluating potential solutions, rather
than a quality failure in the incoming contributions themselves.
[Curl report collection](https://gist.github.com/bagder/07f7581f6e3d78ef37dfbfc81fd1d1cd); [Holterhoff](https://redmonk.com/kholterhoff/2026/02/26/generative-ai-policy-landscape-in-open-source/).

## 6. Source register

All sources below are cited in this document. Dates identify the
publication or update when specified; policies and discussion pages can change.
The mappings distinguish detailed issues (P), non-issues (N), other issues (O),
and core context.

| ID  | Reference                                                                                                                                                                                                | Evidence type                             | Sections                    |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------- |
| R01 | Steve Ruiz, [Stay away from my trash!](https://tldraw.dev/blog/stay-away-from-my-trash), January 17, 2026                                                                                                | Maintainer account                        | P03, P05, N01               |
| R02 | Daniel Stenberg, [Death by a thousand slops](https://daniel.haxx.se/blog/2025/07/14/death-by-a-thousand-slops/), July 14, 2025                                                                           | Maintainer account and project statistics | P01, P09                    |
| R03 | Seth Larson, [New era of slop security reports for open source](https://sethmlarson.dev/slop-security-reports), December 3, 2024                                                                         | Maintainer account and proposals          | P03, P11, O02               |
| R04 | Daniel Stenberg, [The I in LLM stands for intelligence](https://daniel.haxx.se/blog/2024/01/02/the-i-in-llm-stands-for-intelligence/), January 2, 2024                                                   | Case descriptions and interpretation      | P02, N02                    |
| R05 | OpenSSF, [AI-SLOP working-group discussion](https://github.com/ossf/wg-vulnerability-disclosures/issues/178), opened February 4, 2026                                                                    | Problem synthesis and proposed work       | P11, O02                    |
| R06 | Daniel Stenberg, [The end of the curl bug-bounty](https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/), January 26, 2026                                                              | Program decision and project comparison   | O01                         |
| R07 | Benjamin Peterson, [Security Issues and Volunteers](https://www.locrian.net/writing/open-source-security/), January 18, 2016                                                                             | Historical maintainer account             | P09, P11, N03               |
| R08 | Seth Larson, [Respecting maintainer time should be in security policies](https://sethmlarson.dev/respecting-maintainer-time-should-be-in-security-policies), February 24, 2026                           | Reporting-policy proposal                 | P07                         |
| R09 | Adrin Jalali and Cailean Osborne, [Maintaining open source in the age of generative AI](https://blog.probabl.ai/maintaining-open-source-age-of-gen-ai), February 24, 2026                                | Maintainer experience and recommendations | P06, P08, N05               |
| R10 | Kate Holterhoff, [The Generative AI Policy Landscape in Open Source](https://redmonk.com/kholterhoff/2026/02/26/generative-ai-policy-landscape-in-open-source/), February 26, 2026, subsequently updated | Policy survey                             | N04, O03                    |
| R11 | LLVM, [AI Tool Use Policy](https://llvm.org/docs/AIToolPolicy.html)                                                                                                                                      | Project policy                            | Core context, P01, N01, N05 |
| R12 | Selenium, [AI-assisted contribution policy PR #17043](https://github.com/SeleniumHQ/selenium/pull/17043), merged April 21, 2026                                                                          | Policy change and rationale               | P06, N04                    |
| R13 | Django, [AI-assisted security-report guidance, commit 0f60102](https://github.com/django/django/commit/0f60102444d8a2cfb662a7b11b3911b52567ee54)                                                         | Immutable policy change                   | P02, P04                    |
| R14 | Node.js, [New HackerOne Signal Requirement for Vulnerability Reports](https://nodejs.org/en/blog/announcements/hackerone-signal-requirement), updated February 19, 2026                                  | Reporting restriction and rationale       | O01                         |
| R15 | Apache Log4j, [Addressing AI-slop in security reports #4052](https://github.com/apache/logging-log4j2/discussions/4052), February 25, 2026                                                               | Maintainer statistics and triage proposal | P10                         |
| R16 | Daniel Stenberg, [AI slop security reports submitted to curl](https://gist.github.com/bagder/07f7581f6e3d78ef37dfbfc81fd1d1cd)                                                                           | Curated report index                      | P04, O03                    |
| R17 | Daniel Stenberg, [Open Source Security in spite of AI](https://fosdem.org/2026/schedule/event/B7YKQ7-oss-in-spite-of-ai/), FOSDEM 2026                                                                   | Event abstract                            | Core context, N02           |
| R18 | Jarek Potiuk, [Death by a Thousand Prompts: Can Our Disclosure Standards Survive AI Slop?](https://www.gvip-project.org/summit01/agenda/#aislop), GVIP Summit #01                                        | Session abstract                          | Core context, O02           |
