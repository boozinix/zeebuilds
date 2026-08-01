# Plan — Add StockTracker as 4th Product to Portfolio
Agent: Claude (main)
Created: 2026-08-01 00:00

## Goal
Add StockTracker (https://stock-tracker-chi-one.vercel.app) as a co-equal 4th product to zubairnizami.com. This touches the data model (lib/projects.ts), the home page, the work index, and adds a new case-study page with extended sections (page inventory, AI features, engineering highlights, data model/API surface). Full spec is at plans/STOCKTRACKER_PORTFOLIO_UPDATE.md.

Screenshots are NOT part of this pass — placeholder paths will be wired up but images require manual capture.

## Chunks
1. Chunk 1 — Extend `Project` type + add StockTracker object to `lib/projects.ts`
2. Chunk 2 — Home page (`app/page.tsx`): add 4th card, bump "3 Live Products" → 4, update hero copy
3. Chunk 3 — Work index (`app/work/page.tsx`): add StockTracker to filter categories, verify catalog row renders
4. Chunk 4 — Case-study renderer (`app/work/[slug]/page.tsx`): add 5 new optional section blocks (scale strip, page inventory, AI features, engineering highlights, under the hood)
5. Chunk 5 — Misc: sitemap.ts check, CLAUDE.md update, search for any hardcoded "3 products" copy
6. Chunk 6 — Screenshot placeholders: create `public/screenshots/` dir, add placeholder notice; QA checklist run (`npm run build`)

## Risks & Decisions
- `Project` type additions are all optional — zero risk of breaking ApplyStudio, Card Scout, Neural Mob renders
- Screenshots must be captured manually from live app before pushing — build will pass without them (img src 404 is non-blocking)
- ApplyStudio stays as featured hero; StockTracker is co-equal 4th, not new flagship
- PDF portfolio update (`portfolio.html` / `generate_portfolio_pdf.py`) is explicitly OUT OF SCOPE for this pass
- Ask before git commit (per rules)
- Ask before Vercel deploy (per rules)

## Out of Scope
- PDF portfolio update (Part 8 of spec)
- Screenshot capture (manual step, flagged in Chunk 6)
- Any changes to the contact API, Navbar, Footer, or auth flows
