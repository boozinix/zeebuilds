# PRODUCT.md

Context file for zubairnizami.com. Read alongside DESIGN.md.

## What this site is

A personal site for Zubair Nizami, an AI Product Manager targeting Senior and
Staff AI PM roles at frontier labs and AI-native companies.

It is **not** a design portfolio and it is **not** a lead-generation landing
page. Roughly 80 percent of senior AI PM roles are filled through networking,
and portfolio links get reviewed before an interview is scheduled. So the site
has exactly two jobs:

1. Survive a 30 second recruiter screen without triggering a discount.
2. Convert a warm introduction into a conversation.

Design for a hiring manager who was just told "you should talk to Zubair" and
has four minutes and fifteen other tabs open.

## Who Zubair is

- 8 years shipping AI products at AWS, Meta, Zoox and Apple.
- Four live consumer AI products built solo: ApplyStudio, Card Scout,
  Neural Mob, StockTracker.
- Haas MBA.
- Named result: 157 percent revenue growth, $84M to $216M, GTM strategy at AWS.

## What the audience actually screens for

Taken from the live job descriptions rather than career advice. These are the
capabilities the site must evidence:

- **Evals.** Anthropic's PM role at $305K to $460K lists "have personally built
  agentic evals" as a required qualification, above tenure. It asks for two
  years of PM experience, not eight. This is the single highest-value artifact
  the site can carry.
- **Model selection logic.** Reasoning explicitly through cost structure,
  latency profile, accuracy ceiling, maintenance burden and failure mode.
- **Failure mode thinking.** Hallucination, latency degradation, context limits,
  prompt injection, confidence calibration. Maturity shows as discussion of
  confidence thresholds, fallback logic and human-in-the-loop escalation.
- **Data flywheels.** Named explicitly in Perplexity's builder PM posting.
- **Being a real user of the product.** Anthropic requires daily Claude Code use.

## Positioning constraints

- **Do not lead with the product count.** "Four solo-shipped AI products" is
  cheap to claim in 2026 and pattern-matches to a build-in-public sprint. It
  invites a discount on every other claim on the page. Lead with one product in
  depth and present the others as a compact strip with live links.
- **Do not lead with tenure.** Eight years is credible but it is not the scarce
  thing. The market rewards verified depth.
- **Zoox is underused.** Safety-critical, high-stakes, real failure modes,
  genuine human-in-the-loop escalation design. That is exactly the failure-mode
  vocabulary the labs screen for, and it is rare against the crowd of SaaS PMs
  who repositioned into AI. It currently appears as one word in a logo strip.

## Credibility rules

Context: 67 percent of HR leaders report AI-generated applications are slowing
hiring, 65 percent find it harder to verify skills on AI-enhanced resumes, and
one in five hiring managers has added an extra interview round specifically to
counter this. Unverifiable claims now cost a round, not a benefit of the doubt.

So every claim on this site must survive a click:

- Every product claim carries a live, reachable URL.
- Every number carries a baseline, a period, and an attribution.
- Usage numbers are stated honestly even when small. "312 weekly actives, 41
  percent W4 retention" beats "thousands of users", because the second phrasing
  is a named red flag for a number that was underwhelming.
- Every project states at least one thing that did not work. Absence of stated
  model limitations is an explicitly named portfolio red flag.
- The product count is identical in the hero, the skills strip, the work
  section and the meta description. It currently is not.

## Content inventory, in priority order

1. One static sentence stating who he is, what he shipped, what he wants.
2. Live product links with honest usage numbers, above the fold.
3. One eval harness writeup. Success criteria first, then metrics, then dataset
   construction, then offline evals, then online evals on production traffic,
   then what the loop caught. Binary pass/fail rather than Likert. True positive
   and true negative rates reported separately.
4. One tradeoff post with real numbers: cost per request, p95 latency, accuracy
   ceiling, and what was given up.
5. A "what did not work" section.
6. The Zoox story, 200 words, told for its failure modes.
7. Dated writing, published weekly, for twelve months. This is the only part
   that compounds and the only part nothing can fake.

Items 1 through 6 are roughly a week of work. Item 7 is the actual moat.

## Constraints to preserve

- The current build is fast: 674ms load, 165KB transfer, 9KB of JavaScript.
  Do not regress this. Any redesign that ships more than 300KB has failed.
- The existing `prefers-reduced-motion` handling stays.
- Existing URLs for the four products must keep working.
