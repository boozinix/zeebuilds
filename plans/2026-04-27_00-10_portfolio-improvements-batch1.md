# Plan — Portfolio Improvements Batch 1
Agent: Claude (main)
Created: 2026-04-27 00:10

## Goal
Implement Priority 1 UI fixes and Priority 2 content improvements (excluding 2.1) from docs/portfolio-improvements.md. Metrics confirmed by user before execution.

## Chunks
1. Chunk 1 — Create plan file and progress tracker
2. Chunk 2 — Fix 1.1: ApplyStudio 3rd metric → 30+ / APPLICATIONS PER HOUR (lib/projects.ts)
3. Chunk 3 — Fix 1.2: Neural Mob metrics → real numbers (lib/projects.ts)
4. Chunk 4 — Fix 1.3: Work page featured banner → blur+darken screenshot background (app/work/page.tsx)
5. Chunk 5 — Fix 1.4: Splash screen text → increase opacity (components/IntroGate.tsx)
6. Chunk 6 — Fix 2.2 + 2.3: About page Apple → Vision Pro + updated role tag (app/about/page.tsx)

## Risks & Decisions
- 2.1 (4th stat card) skipped per user instruction
- 1.1 metric confirmed: "30+" / "Applications per hour" — distinct from existing <90s per-application metric
- 1.2 metrics confirmed: 3 / models in parallel, 1 / scoring agent, 100% / reasoning traces visible
- 1.3 uses blur+darken overlay approach (not full gradient replacement)
- Neural Mob "100%" = reasoning transparency (all traces visible), not open source

## Out of Scope
- 2.1 (4th stat card on home page)
- Priority 3 items (work page rotation, skills grouping, company logos)
