# Session Handoff — zubairnizami.com Portfolio
Last updated: 2026-08-22 19:35

---

## Current State
- **Branch:** main
- **Deployed:** Yes (Vercel, auto-deploy from main)
- **Uncommitted changes (as of 2026-08-22):** `PROGRESS_TRACKER.md` (M); untracked: `portfolio.html`, `docs/card-perks-scraper-reuse-prompt.md`, 4 portfolio/pitch PDFs. Nothing committed this session.

## What's Done
- Portfolio Improvements Batch 1: all 9 chunks complete
  - ApplyStudio/Neural Mob/Card Scout metrics updated
  - Work page featured banner (blur + darkened)
  - Splash screen text opacity fixed
  - About page: Apple → Vision Pro role tag, grouped skills, larger company logos
  - Card Scout added as 2nd featured slot on work page
- Contact API (Resend + Zod + rate limiting)
- Security headers (vercel.json)
- Company logos in timeline (apple.png, aws.svg.png, meta.png, zoox.png)

## In-Progress / Planned
- [ ] **StockTracker as 4th product** — full spec at `plans/STOCKTRACKER_PORTFOLIO_UPDATE.md`
  - Status: NOT STARTED. Plan is complete and ready to execute.
  - Adds StockTracker alongside ApplyStudio, Card Scout, Neural Mob
  - Requires: lib/projects.ts update, homepage, work index, case study page, screenshots (5 images)

- [ ] **Strategy: showcase deliverables** — no code yet, strategy discussion paused
  - Goal: show "how Zubair thinks" (discovery, scoping, tradeoffs) not just metrics
  - Primary reader: recruiter / hiring manager (senior AI PM roles)
  - Open question: NDA status on AWS/Meta/Zoox/Apple artifacts
  - Open question: real traction metrics for products

## graphify
- `graphify-out/` EXISTS. Semantic build done 2026-08-01; refreshed via `graphify update .` on 2026-08-22.
- Current graph: 352 nodes · 376 edges · 33 communities · built from commit `69ad562a` (0 token cost on update)
- Report: `graphify-out/GRAPH_REPORT.md`. Use `graphify query/explain/path` before reading source files.
- Note: graph now indexes docs/plans/logs too, so top "god nodes" are markdown headings, not code.
- Warning from last run: `settings.local.json` produced zero nodes (harmless).

## Model Usage Rules (per user)
- Haiku: reading files, writing conversation/handoff logs
- Sonnet: implementation work
- Opus: orchestration and complex reasoning only
- DeepSeek via delegate.sh: bulk transformations, boilerplate, summarization

## Key Files
- `lib/projects.ts` — source of truth for all product data
- `plans/STOCKTRACKER_PORTFOLIO_UPDATE.md` — StockTracker spec (ready to execute)
- `PROGRESS_TRACKER.md` — last updated 2026-04-27, all chunks [x]
- `conversation_logs/` — 3 logs total (Apr 27, Apr 28, Aug 1)
