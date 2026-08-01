# StockTracker → Portfolio Update Brief

> **Purpose:** This is a build spec for Claude Code. It adds **StockTracker** (https://stock-tracker-chi-one.vercel.app) to zubairnizami.com as a new product, updates the landing page, the work index, and adds a dedicated case-study page. Written to match the existing codebase exactly — the `Project` schema, component patterns, and design system already in the repo.
>
> **Decisions locked in with Zubair:**
> 1. **Positioning:** StockTracker ships as a **co-equal 4th product**, not the new flagship. ApplyStudio stays the featured hero on the home page and work index. StockTracker slots in alongside Card Scout and Neural Mob.
> 2. **Page depth:** The dedicated page **extends** the current 4-chapter template with extra sections (page inventory, AI features, architecture highlights, data model) so the build is done justice. This requires small, backward-compatible additions to the `Project` type and the case-study renderer.
>
> **Follow-on (not in this pass):** update the PDF portfolio doc (`Zubair_Nizami_Portfolio_v2.pdf` / `generate_portfolio_pdf.py`). Notes at the end.

---

## Part 0 — What StockTracker Is (page-by-page summary)

A production-grade **Next.js 15 financial intelligence dashboard**. It pulls real-time market data (Finnhub, Yahoo Finance, SEC EDGAR, Polymarket, 20 RSS feeds) and synthesizes it with AI (Claude Haiku 4.5 + Kimi K2 via OpenRouter). It has multi-tier user access, credit-based AI billing, Neon Postgres persistence, a full admin console with user impersonation, and **49 API routes** across ~2,100 lines of API logic. **65/65 tests passing.** Deployed on Vercel with scheduled cron jobs.

**Live:** https://stock-tracker-chi-one.vercel.app

### Pages (the live site, walked through)

| Route | What it does |
|---|---|
| `/` **Dashboard** | Central hub. Watchlist sidebar with tier badges (core/watching/radar), Top-10 S&P gainers/losers strip with sparklines, 11-sector performance bar, tabbed movers rail, full **S&P 500 heatmap** (500-stock treemap, click-through), daily AI digest card, 24h market-intelligence synthesis by theme, tier-weighted watchlist digest, and a Polymarket predictions card. |
| `/ticker/[symbol]` **Deep-dive** | Price header (1D change, ATH / 52W ranges, sector badges), candlestick + line chart (Recharts, 5D→Max ranges), stats panel (mkt cap, PE/PS/PB, div yield, VWAP, beta), price alerts (localStorage), sentiment-coded news with a **"priced-in" heuristic chip**, SEC filings timeline linked to EDGAR, and an AI **"explain this move"** modal. |
| `/screener` **Screener** | Finviz-style manual filter panel (**22 fields**) plus a **natural-language screener** — "find tech stocks with RSI under 30 and upside over 30%" compiles to a FilterSpec via few-shot Claude Haiku. Sortable results with analyst-rating distribution bars. |
| `/news` **News feed** | Filter by ticker, ETF constituents (SMH → all semis), importance 1–5, source tier, category. Source-tier badges (Reuters/AP tier 1 → blogs tier 5), sentiment coding, "priced-in" chips, and rate-limited TL;DR summaries (Haiku, 30/day). 20 RSS feeds tiered 1–4. |
| `/calendar` **Earnings** | Weekly grid, BMO/AMC badges, consensus vs. actual surprise %, star-to-watchlist. |
| `/analytics` **Portfolio analytics** | Three tabs: multi-ticker **backtest** (CAGR, Sharpe, max drawdown), **correlation** matrix, **drawdown** from peak. |
| `/settings/*` | AI-usage (budget vs spent by route), billing (Stripe topups, toggleable), **BYOK api-keys** (AES-256-GCM encrypted), cron-runs, data-health, source-quality. |
| `/admin/*` | Role-gated. User table with **suspend / add-credit / change-tier / impersonate** (test as any user, no password), read-only feature-flags, aggregate AI-spend usage charts. |
| `/login` `/welcome` `/legal/*` | Google OAuth + demo credentials provider, first-run tour, privacy/terms/data-sources. |

### The 6 end-to-end AI features
1. **Ticker move explanation** — 24h news + live price → Haiku, ~$0.0001–0.0005/call, logged to `ai_usage`.
2. **NL screener** — few-shot Haiku compiles English → FilterSpec JSON → Drizzle predicates, returns a confidence score, ~$0.0003/query.
3. **Daily digest** (6am ET cron) — 200 articles → Haiku tags top 20 → Kimi K2 writes a 90-second brief.
4. **Watchlist intelligence** — tier-weighted synthesis (core > watching > radar) prioritizing the user's real holdings.
5. **Article TL;DR** — full article → 2–3 sentence Haiku summary, 30/day rate limit.
6. **Market Q&A** — semantic Q&A over 48h news + top quotes, returns a cited answer.

### Portfolio-worthy engineering highlights
Postgres sliding-window rate limiter (durable, no Redis, admin bypass) · in-flight request de-duplication (shared-promise) · env-var feature flags (flip AI access mid-deploy) · ephemeral `/tmp` → seed fallback so the dashboard never renders blank · prompt caching via OpenRouter (~25% cost cut) · few-shot NL→FilterSpec compiler (~90% accuracy, zero fine-tuning) · admin impersonation via session swap · **immutable append-only billing ledger** with `balance_after` snapshots · "priced-in" news heuristic (age × move × sentiment) · **ex-post AI evaluation** (`forecast_claims` stores predictions + evaluated returns for model scoring).

### Stack
Next.js 15 (App Router, React 19), TypeScript strict, Tailwind, Recharts, Lucide · Vercel serverless, Neon Postgres, Drizzle ORM, NextAuth.js · OpenRouter (Claude Haiku 4.5 + Kimi K2) · Finnhub, Yahoo Finance, SEC EDGAR, Polymarket, 20 RSS feeds · Stripe (toggleable), Resend · GitHub Actions CI, 65/65 tests · Vercel cron.

---

## Part 1 — Data model changes (`lib/projects.ts`)

### 1a. Extend the `ProjectId` union
```ts
export type ProjectId = 'apply-studio' | 'card-scout' | 'neural-mob' | 'stock-tracker';
```

### 1b. Add backward-compatible optional fields to the `Project` type
These power the extended sections. All optional — the other three projects render unchanged.
```ts
export type Project = {
  // ...existing fields unchanged...

  /** Extended case-study sections (StockTracker and future deep builds only) */
  pageInventory?: { route: string; title: string; detail: string }[];
  aiFeatures?: { name: string; detail: string; cost?: string }[];
  engineeringHighlights?: string[];   // portfolio-worthy technical wins
  dataModel?: { label: string; detail: string }[];  // grouped table summary
  apiSurface?: { group: string; detail: string }[]; // route families
  scale?: { value: string; label: string }[];       // secondary stat row
};
```

### 1c. New project object — paste into the `projects` record
```ts
'stock-tracker': {
  id: 'stock-tracker',
  name: 'StockTracker',
  tagline:
    'AI market intelligence — real-time data from 20 sources, synthesized by Claude and Kimi K2 into a 90-second daily brief.',
  role: 'Product Manager & Solo Builder',
  timeframe: '2026 – Present',
  stack: [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Neon Postgres',
    'Drizzle ORM',
    'NextAuth.js',
    'OpenRouter (Claude Haiku 4.5 + Kimi K2)',
    'Recharts',
    'Vercel',
    'Stripe',
  ],
  links: [
    { label: 'Live app', href: 'https://stock-tracker-chi-one.vercel.app' },
    // Add GitHub if the repo is public:
    // { label: 'GitHub', href: 'https://github.com/boozinix/...' },
  ],
  screenshot: '/screenshots/stock-tracker-1.jpg',
  screenshots: [
    '/screenshots/stock-tracker-1.jpg', // dashboard + heatmap
    '/screenshots/stock-tracker-2.jpg', // ticker deep-dive
    '/screenshots/stock-tracker-3.jpg', // NL screener
    '/screenshots/stock-tracker-4.jpg', // news feed / priced-in chips
    '/screenshots/stock-tracker-5.jpg', // admin or analytics
  ],
  impact: 'Production fintech platform — 49 API routes, 6 AI features, shipped solo',
  whyItMatters:
    'Full production system, not a demo — 20 live data sources synthesized by AI, credit-based billing, an admin console with impersonation, and an immutable audit ledger. The deepest proof of AI-PM + engineering range.',
  keyResult:
    '49 API routes, a 22-table Postgres schema, and 6 end-to-end AI features — shipped solo, 65/65 tests green.',
  metrics: [
    { value: '49', label: 'API routes' },
    { value: '22', label: 'Postgres tables' },
    { value: '6', label: 'AI features' },
  ],
  // ── Alternative outward-facing metric set (pick one; the above reads more "engineer",
  //    this reads more "product"). Recommend keeping the engineer set — it differentiates
  //    StockTracker from the other three cards, which already lead with product metrics.
  // metrics: [
  //   { value: '500+', label: 'Stocks tracked live' },
  //   { value: '20',    label: 'Live data sources' },
  //   { value: '90s',   label: 'AI daily brief' },
  // ],
  description:
    'StockTracker is a production-grade financial intelligence dashboard. It ingests real-time market data from Finnhub, Yahoo Finance, SEC EDGAR, Polymarket, and 20 tiered RSS feeds, then uses a two-model AI pipeline (Claude Haiku 4.5 for tagging, Kimi K2 for synthesis, via OpenRouter) to turn 200+ daily articles into a 90-second brief. It ships multi-tier access, credit-based AI billing, a full admin console with user impersonation, and an immutable billing ledger — 49 API routes and a 22-table Drizzle/Postgres schema, deployed on Vercel with scheduled cron jobs.',
  problem:
    'Retail investors drown in market data but starve for synthesis. Prices, filings, analyst ratings, and 24/7 news arrive faster than any human can read them, and the tools that aggregate them either dump raw feeds or hide the reasoning behind a paywalled black box. The result: information without judgment, and no way to tell what the market has already priced in.',
  whyNow:
    'Cheap, fast inference (Haiku at ~$0.0001/call) plus prompt caching finally make it economical to run AI synthesis over hundreds of articles per day per user — turning "read everything" into a solvable cost-engineering problem rather than a research one.',
  solution:
    'The hard part isn\'t fetching data — it\'s trust and cost. So the system leans on two ideas. First, source-tier weighting: Reuters/AP (tier 1) outrank blogs (tier 5) in every synthesis, and a "priced-in" heuristic (news age × price move × sentiment) tells the user whether a headline is already reflected. Second, cost as a first-class product surface: every AI call is metered to a Postgres ledger, gated by env-var feature flags, and billed against credits — so the AI can scale without silently blowing a budget. Treat market intelligence as an auditable pipeline, not a magic feed.',
  outcomes: [
    '200+ articles per day compressed into a readable 90-second AI brief.',
    '49 API routes and a 22-table Postgres schema, shipped and deployed solo.',
    'Every AI call metered, budgeted, and billed — with a per-route cost audit trail.',
    '65/65 CI tests passing on GitHub Actions; live on Vercel with 3 scheduled cron jobs.',
  ],
  responsibilities: [
    'Designed and built a two-model AI pipeline (Claude Haiku tagging → Kimi K2 synthesis) over 5 end-to-end features, all cost-metered to a Postgres audit table.',
    'Built a durable Postgres sliding-window rate limiter (no Redis) with admin bypass that works on Vercel serverless.',
    'Shipped a credit-based billing system with an immutable append-only ledger and per-user balance snapshots.',
    'Built a full admin console: user suspension, credit grants, tier changes, and password-less impersonation for support debugging.',
    'Engineered a few-shot natural-language → FilterSpec compiler that turns English screening queries into Drizzle predicates at ~90% accuracy.',
  ],
  architecture: {
    overview:
      'StockTracker is a Vercel-serverless Next.js 15 app on Neon Postgres via Drizzle ORM. Data ingestion runs on scheduled cron: a 6am digest job tags 200 articles with Haiku and synthesizes them with Kimi K2; an 8pm job pre-warms the S&P 500 screener cache to kill cold-starts. Reads are de-duplicated with a shared-promise pattern and protected by a Postgres sliding-window rate limiter. Every AI route is gated by env-var feature flags and metered to an `ai_usage` table; billing runs on an immutable append-only ledger. When ephemeral `/tmp` state is missing, the dashboard falls back to seed data so it never renders blank.',
    bullets: [
      'Ingestion: cron-scheduled pulls from Finnhub, Yahoo Finance, SEC EDGAR, Polymarket, and 20 tiered RSS feeds into a structured Postgres schema.',
      'AI pipeline: OpenRouter routes to Claude Haiku 4.5 (tagging, TL;DR, explain, NL-parse) and Kimi K2 (long-form synthesis), with prompt caching for ~25% cost reduction.',
      'Reliability: shared-promise request de-duplication, Postgres sliding-window rate limiting, and /tmp → seed fallback for always-on rendering.',
      'Billing & governance: immutable billing ledger with balance snapshots, env-var feature flags to flip AI access mid-deploy, and AES-256-GCM-encrypted BYOK key storage.',
      'Trust surfaces: source-tier weighting, a "priced-in" news heuristic, and a forecast_claims table that scores AI predictions ex-post against realized returns.',
    ],
  },

  // ── Extended sections (rendered only when present) ──
  scale: [
    { value: '~2,100', label: 'Lines of API logic' },
    { value: '20', label: 'Live data sources' },
    { value: '3', label: 'Scheduled cron jobs' },
    { value: '65/65', label: 'CI tests passing' },
  ],
  pageInventory: [
    { route: '/', title: 'Dashboard', detail: 'Watchlist with tier badges, S&P 500 heatmap, sector bar, movers rail, daily AI digest, 24h intelligence synthesis, Polymarket predictions.' },
    { route: '/ticker/[symbol]', title: 'Ticker deep-dive', detail: 'Candlestick + line chart (5D→Max), stats panel, price alerts, sentiment news with "priced-in" chips, SEC filings timeline, AI explain-this-move modal.' },
    { route: '/screener', title: 'Screener', detail: '22-field Finviz-style manual filters plus a natural-language screener that compiles English → FilterSpec via few-shot Haiku.' },
    { route: '/news', title: 'News feed', detail: 'Filter by ticker, ETF constituents, importance, source tier; sentiment coding, "priced-in" chips, rate-limited TL;DR.' },
    { route: '/calendar', title: 'Earnings calendar', detail: 'Weekly grid, BMO/AMC badges, consensus vs. actual surprise, star-to-watchlist.' },
    { route: '/analytics', title: 'Portfolio analytics', detail: 'Backtest (CAGR/Sharpe/max drawdown), correlation matrix, drawdown-from-peak.' },
    { route: '/admin', title: 'Admin console', detail: 'User table with suspend, credit grants, tier changes, and password-less impersonation; feature-flag and AI-spend views.' },
  ],
  aiFeatures: [
    { name: 'Ticker move explanation', detail: '24h news + live price → Claude Haiku, logged to the AI-usage table.', cost: '~$0.0001–0.0005/call' },
    { name: 'NL screener', detail: 'Few-shot Haiku compiles English into a FilterSpec JSON → Drizzle predicates, with a confidence score.', cost: '~$0.0003/query' },
    { name: 'Daily digest (6am cron)', detail: '200 articles → Haiku tags the top 20 → Kimi K2 writes a 90-second brief.', cost: '~$0.001–0.002/run' },
    { name: 'Watchlist intelligence', detail: 'Tier-weighted synthesis that prioritizes the user\'s core holdings in the prompt.' },
    { name: 'Article TL;DR', detail: 'Full article → 2–3 sentence Haiku summary, rate-limited to 30/day.', cost: '~$0.0001/article' },
    { name: 'Market Q&A', detail: 'Semantic Q&A over 48h of news + top quotes, returns a cited answer.' },
  ],
  engineeringHighlights: [
    'Postgres sliding-window rate limiter — durable without Redis, admin bypass, works on Vercel serverless.',
    'In-flight request de-duplication via a shared-promise pattern, cutting duplicate Finnhub/Polymarket calls.',
    'Env-var feature flags — flip AI access, budgets, and billing mid-deployment without a code change.',
    'Immutable append-only billing ledger with per-transaction balance snapshots for a clean audit trail.',
    'Few-shot NL → FilterSpec compiler — ~90% accuracy on common screening queries, zero fine-tuning.',
    'Ex-post AI evaluation — forecast_claims stores predictions and grades them against realized returns.',
    'Prompt caching via OpenRouter for ~25% cost reduction on repeated system prompts.',
    'Admin impersonation via session swap — debug as any user without touching their password.',
  ],
  dataModel: [
    { label: 'Market data', detail: 'tickers, prices_daily, market_metrics_daily, fundamentals, sec_filings, screener_cache' },
    { label: 'Content', detail: 'news_articles (source_tier 1–5, GIN index on tickers), market_events, digests, forecast_claims' },
    { label: 'Users', detail: 'users, email_aliases (multi-email OAuth), watchlists, saved_screens, alerts' },
    { label: 'Billing', detail: 'credit_topups, billing_events (immutable ledger), api_keys (encrypted BYOK)' },
    { label: 'Ops', detail: 'ai_usage (cost audit), security_events, data_source_health, rate_limits' },
  ],
  apiSurface: [
    { group: 'AI', detail: '/api/ai/{explain,ask,status,usage,tldr,tag}' },
    { group: 'Data', detail: '/api/{prices,quote,news,movers,heatmap,sectors,earnings,predictions,rss-reader}, /api/timeline/[ticker]' },
    { group: 'Screener', detail: '/api/screener, /api/screener/nl' },
    { group: 'User data', detail: '/api/watchlist, /api/digest/{latest,refresh,watchlist}' },
    { group: 'Admin', detail: '/api/admin/{users, users/[id]/credit, users/[id]/status, impersonate, feature-flags, usage, cron-runs, source-quality}' },
    { group: 'Cron', detail: '/api/cron/{daily-digest,daily-intelligence,screener-cache} (Bearer CRON_SECRET)' },
  ],
},
```

> **Note on `problem` / `whyNow` / `solution`:** these are new copy written for the portfolio's voice (the recruiter-facing case-study tone the other three use). They're not lifted from the app. Zubair should skim them once — they're accurate to the build but framed for a hiring audience.

---

## Part 2 — Landing page (`app/page.tsx`)

The home page currently hard-codes three project cards: ApplyStudio (featured horizontal), then Card Scout + Neural Mob in a 2-col grid. StockTracker is a **co-equal 4th**, so:

**2a. Add a 4th card.** Cleanest layout: keep ApplyStudio as the featured horizontal card, then make the secondary grid a **2×2** (Card Scout, Neural Mob, StockTracker, + one). With three secondary cards, use `sm:grid-cols-2` (StockTracker wraps to a 3rd cell) or switch to `lg:grid-cols-3` for a tidy row. Recommend: keep `sm:grid-cols-2` and let StockTracker be the 3rd card spanning full width on its own row, OR go to a 3-up grid. Add:
```tsx
const stockTracker = projects['stock-tracker'];
```
Reuse the exact Card Scout `<Link>/<TiltCard>` block, swapping in `stockTracker`, `href="/work/stock-tracker"`, alt text `"StockTracker AI market intelligence dashboard"`, and a category chip. Suggested chip: **"Markets AI"** (violet or emerald to distinguish from Card Scout's fuchsia "Fintech AI"). Secondary blurb line under `whyItMatters`:
> `20 live data sources synthesized by Claude + Kimi K2 — with credit billing and a full admin console.`
Stack chips: `['Claude Haiku', 'Kimi K2', 'Neon Postgres']`.

**2b. Update the metrics section (`MetricsSection`).** The 3rd metric card currently reads **"3 Live Products."** Bump to **4**:
```tsx
<MetricCard num={4} label="Live Products" context="Solo-built" sub="Full-stack. Real users. Paying customers." duration={800} />
```

**2c. Update the hero proof line.** Line ~117 currently says "3 live consumer tools, solo." Change to **"4 live products, solo"** (StockTracker is more infra than "consumer tool" — consider "4 live products" for accuracy).

**2d. Optional — "Currently shipping" status line** (~346): fine as-is, or add StockTracker if it's the current focus.

---

## Part 3 — Work index (`app/work/page.tsx`)

**3a. Catalog rows auto-update.** The catalog maps over `allProjects = Object.values(projects)`, so StockTracker appears automatically once it's in `projects`. The `/NN` count in the header (`allProjects.length`) bumps 03 → **04** for free.

**3b. Filter categories.** `categories` is `['All', 'AI Tools', 'Fintech', 'Career Tools']` and `filterProjects` hard-codes IDs. Add StockTracker to **AI Tools** and **Fintech** (and optionally add a new `'Markets'` or `'Data Infra'` category):
```ts
if (filter === 'AI Tools') return list.filter(p => ['apply-studio','neural-mob','stock-tracker'].includes(p.id));
if (filter === 'Fintech')  return list.filter(p => ['card-scout','stock-tracker'].includes(p.id));
```

**3c. Featured slots unchanged.** `featured = allProjects[0]` (ApplyStudio) and the secondary featured (Card Scout) stay. StockTracker lives in the catalog rows below — correct for "co-equal 4th."

**3d. `screenshot` thumbnail** is required for the catalog row thumb — ensure `stock-tracker-1.jpg` exists (see Part 6).

---

## Part 4 — Case-study page (`app/work/[slug]/page.tsx`) — extend the template

The current renderer builds 4 chapters from `problem / solution+responsibilities / architecture / outcomes`, then a tech-stack footer. StockTracker uses all of that **plus** the new optional sections. Add these blocks, each guarded by a presence check so the other three projects are untouched.

**4a. Secondary stat strip (`project.scale`)** — render below the existing 3 metric cards, as a thin 4-col mono row:
```tsx
{project.scale && (
  <Reveal delay={0.06}>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800/50 rounded-lg overflow-hidden mb-16">
      {project.scale.map(s => (
        <div key={s.label} className="bg-slate-900 px-4 py-4 text-center">
          <p className="font-display font-bold text-slate-100 text-lg sm:text-xl">{s.value}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  </Reveal>
)}
```

**4b. Product tour (`project.pageInventory`)** — after the 4 chapters, a "Inside the product" section. Each row: mono `route`, bold `title`, `detail`. Use the same chapter-heading pattern (mono number + hairline + label) with label **"Inside the product"** and a neutral accent (`text-slate-300`).

**4c. AI features (`project.aiFeatures`)** — a card grid, label **"AI features"**, accent `text-violet-400`. Each item: `name` (bold), `detail`, and a mono cost chip when `cost` is set.

**4d. Engineering highlights (`project.engineeringHighlights`)** — reuse the existing bullet list style (the `h-px w-5` dash + text). Label **"Engineering highlights"**, accent `text-sky-400`.

**4e. Data model + API surface (`project.dataModel`, `project.apiSurface`)** — two compact definition-list blocks side by side on desktop (`sm:grid-cols-2`), label **"Under the hood"**, accent `text-emerald-400`. Each entry: bold `label`/`group`, mono `detail`.

**4f. Section order on the StockTracker page:**
1. Header (name, tagline, live links) — existing
2. Metrics (3 cards) — existing
3. **Scale strip** — new (4a)
4. Chapters 01–04 — existing
5. **Inside the product** — new (4b)
6. **AI features** — new (4c)
7. **Engineering highlights** — new (4d)
8. **Under the hood** (data model + API surface) — new (4e)
9. Tech stack footer — existing

Keep all new sections wrapped in `<Reveal>` and using the existing type scale / color tokens. No new dependencies.

---

## Part 5 — Misc references to update

- **`app/sitemap.ts`** — add `/work/stock-tracker` (check whether it enumerates `projects` dynamically; if so, free).
- **`CLAUDE.md`** — add StockTracker to the Products table and note the new `ProjectId`. Update the "Products (lib/projects.ts)" table.
- **`app/about/page.tsx`** — if it references a project count or lists products, bump to 4. (Experience timeline is unaffected.)
- **OG / metadata** — no change required unless there's a per-project OG image.
- **Any "3 products" copy** elsewhere (search the repo for `3` in product context, and for `Object.keys(projects)` assumptions).

---

## Part 6 — Screenshots needed

Capture from the live app (or demo mode: `demo@stocktracker.app`), save as `public/screenshots/stock-tracker-{1..5}.jpg`, matched to `object-cover object-top` (so lead with the top of each page). Suggested shots:
1. **Dashboard** with the S&P 500 heatmap visible (the signature view).
2. **Ticker deep-dive** — chart + stats + news with a "priced-in" chip.
3. **NL screener** — the natural-language query + results table with rating bars.
4. **News feed** — source-tier badges + sentiment.
5. **Admin console or analytics** — impersonation table or backtest chart (shows the depth).

Keep aspect ratio consistent with the existing screenshots (they render in `h-48` / `h-[320px]` fixed-height carousels). ~16:10 or 16:9, top-aligned.

---

## Part 7 — Suggested copy (ready to paste)

**Home + work card blurb (secondary line):**
> 20 live data sources synthesized by Claude + Kimi K2 — with credit billing and a full admin console.

**Category chip:** `Markets AI`

**Key result (already in the object):**
> 49 API routes, a 22-table Postgres schema, and 6 end-to-end AI features — shipped solo, 65/65 tests green.

**One-line positioning (for LinkedIn / elsewhere):**
> StockTracker — a production financial-intelligence platform: real-time data from 20 sources, AI synthesis via Claude + Kimi K2, credit-based billing, and an admin console. Built and shipped solo.

---

## Part 8 — PDF portfolio update (follow-on, not this pass)

The repo has `Zubair_Nizami_Portfolio_v2.pdf`, `portfolio.html`, and `generate_portfolio_pdf.py`. When updating the PDF:
- Add a StockTracker page/section mirroring the case-study content (Part 0 summary + metrics + engineering highlights).
- Update any "3 products" language to 4.
- Reuse the metrics: 49 API routes · 22 Postgres tables · 6 AI features · 65/65 tests · 20 data sources.
- Lead the section with the same tagline and the "production system, not a demo" framing — that's the differentiator vs. the other three.

---

## Part 9 — QA checklist (for Claude Code before pushing)

- [ ] `npm run build` passes; no TypeScript errors from the new `Project` fields.
- [ ] `/work/stock-tracker` renders all 9 sections; other three case studies are visually unchanged.
- [ ] Home page shows 4 product cards and "4 Live Products"; layout holds on mobile (min-h-[48px] targets).
- [ ] Work index shows `/04`, StockTracker in catalog + correct filters.
- [ ] All 5 screenshots load; carousel + row thumb work; no broken-image fallback.
- [ ] Live links open https://stock-tracker-chi-one.vercel.app.
- [ ] Test locally first, then push to Vercel (per CLAUDE.md — stable & tested before deploy).
- [ ] Per repo rules: do **not** commit crawler/scraper code or `.env*`; `git_tracker.csv` stays local.
```
