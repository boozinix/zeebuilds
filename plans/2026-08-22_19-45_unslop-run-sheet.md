# Plan — Unslop Run Sheet (zubairnizami.com)
Agent: Claude (main)
Created: 2026-08-22 19:45

## Goal

Execute the handoff pack the user supplied on 2026-08-22: two constraint files
(`DESIGN.md`, `PRODUCT.md`) plus a five-step run sheet from the artifact "The
Unslop Run Sheet", backed by a forensic audit in "Marking Up zubairnizami.com".

The audit's core finding is that the site scores 10 confirmed hits plus 2
partials on the Krebs AI-slop detector set, and separately carries six content
and behaviour defects that no styling pass would catch. The run sheet's argument
is that these must be fixed in a specific order: defects first, then a detector
in the loop, then content, and only then a redesign. Rebuilding first means
redesigning around content that does not exist yet.

Audit claims were verified against the repo before this plan was written. All
six defects are real. See "Verification" below.

## Decisions already made

- **Visual direction: A, Instrument panel.** Locked by the user on 2026-08-22.
  Directions B and C have been deleted from `DESIGN.md`. Do not propose others.
  Tokens: `--ground:#F4F5F3`, `--ink:#14171A`, `--accent:#C2551F` (signal amber),
  `--rule:#C9CCC7`. Type: Archivo, Newsreader, IBM Plex Mono.
- **Execution scope: plan only.** No code changes are authorised yet. The chunks
  below are written but not started.

## Verification (done 2026-08-22, before planning)

| Defect | Audit claim | Confirmed at |
|---|---|---|
| D1 | Rotating typewriter H1 | `components/HeroTypewriter.tsx`, used by `app/page.tsx` |
| D2 | Full-viewport splash gate | `components/IntroGate.tsx`, mounted in `app/layout.tsx` |
| D3 | Stats count up from zero | `hooks/useCounter.ts` → `MetricCard` in `app/page.tsx` |
| D4 | Ghost-word section | `components/SkillsStack.tsx` (STRATEGY, EXECUTION, AI SYSTEMS, GROWTH, SHIPPING) |
| D5 | Scroll-observer-gated content | `Reveal()` and related observers |
| D6 | Product count contradicts itself | `app/layout.tsx:33,37,47` "three live consumer AI products"; `app/page.tsx:63` `num={4}`; `components/SkillsStack.tsx:11` "3 live products" |

Additional measurements taken from the repo:

- 51 occurrences of banned hue classes (`violet-*`, `purple-*`, `fuchsia-*`, `indigo-*`)
- 17 references to `gradient`
- `Sora` loaded at `app/layout.tsx:12`, a font explicitly banned by DESIGN.md section 0

## Chunks

### Phase 1 — Defect surgery (no redesign, no styling changes)

1. **Chunk 1** — Freeze the H1. Replace the rotating typewriter with one static
   sentence rendered in HTML. Delete `components/HeroTypewriter.tsx` and every
   reference. Files: `app/page.tsx`, `components/HeroTypewriter.tsx`.
2. **Chunk 2** — Delete the splash gate. Remove `components/IntroGate.tsx` and
   unmount it from `app/layout.tsx`. Files: 2.
3. **Chunk 3** — Hard-code the stat values. Render 157%, $84M to $216M, and 4 as
   static text. Remove or invert `hooks/useCounter.ts` so nothing animates *to* a
   value. Files: `app/page.tsx`, `hooks/useCounter.ts`.
4. **Chunk 4** — Cut the ghost-word section. Delete `components/SkillsStack.tsx`
   and its usage. Files: 2.
5. **Chunk 5** — Ungate visibility. All content visible by default; scroll
   animation may only adjust already-rendered elements. Touches `Reveal()` and
   its call sites. Estimated 3 to 5 files.
6. **Chunk 6** — Reconcile the product count to four everywhere, including the
   three metadata strings in `app/layout.tsx`. Files: `app/layout.tsx`, plus any
   copy surfaced in chunk 4's deletion.
7. **Chunk 7** — Build, verify with JavaScript disabled, report the exact H1
   string and the rendered stat values. No file changes expected.

### Phase 2 — Detector

8. **Chunk 8** — Author `slopcheck.js` from the DESIGN.md section 8 spec.
   **Caveat: the original was not supplied**, so this is a reimplementation, and
   its numbers will not necessarily match the audit's.
9. **Chunk 9** — Playwright runner at `scripts/slopcheck.mjs`, npm script
   `check:slop`, wired to block the build on failure.
10. **Chunk 10** — Run it and record the baseline numbers without fixing anything.

### Phase 3 — Content (interview-driven, not generated)

11. **Chunk 11** — Eval harness writeup. Conducted as a one-question-at-a-time
    interview per Prompt 3. Claude structures; the user supplies substance.
12. **Chunk 12** — Tradeoff post: cost per request, p95 latency, accuracy
    ceiling, what was given up.
13. **Chunk 13** — Zoox section, 200 words, told for its failure modes.
14. **Chunk 14** — Honest usage numbers per product, and a documented failure for
    each.

### Phase 4 — Redesign against Direction A

15. **Chunk 15** — Token layer, theme handling per DESIGN.md section 7, font
    swap off Sora.
16. **Chunks 16+** — Section by section, running `check:slop` after each and not
    advancing while any check fails. Budget: under 300KB total transfer.

## Risks & Decisions

- **`slopcheck.js` is missing.** Named in the run sheet as attached; not present
  in `~/Downloads`. Everything in DESIGN.md section 8 and run-sheet Step 2
  depends on it. Either the user supplies it, or chunk 8 reimplements it with the
  fidelity caveat above.
- **Phase 3 cannot be delegated.** The run sheet is explicit that a model
  generating the eval writeup produces something that reads like every other one.
  Claude interviews and structures only.
- **Phase 1 is genuinely independent of Phase 4.** The defect fixes touch
  behaviour and content, not the palette, so they survive the redesign intact.
  This is why they go first.
- **Phase 4 will not be started before Phase 3 has real content**, per the run
  sheet's order-of-work section.
- Deletions in chunks 1, 2 and 4 remove working components. Recoverable via git,
  but each chunk should be a checkpoint.

## Out of Scope

- Impeccable (run-sheet Step 5). It is a polish pass and explicitly last.
- Any commit or Vercel deploy. Both require the user to ask.
- Step 3's weekly-writing commitment, which is the user's ongoing work, not a
  code task.
