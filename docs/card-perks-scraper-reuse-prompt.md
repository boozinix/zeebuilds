# Handoff prompt: Repurpose Card Scout–style bank scrapers for issuer perks ingestion (next app + WebSocket)

Copy everything below the line into Claude, Cursor, Codex, or another coding agent. **Adjust bracketed placeholders** (`[PATH_TO_CARD_SCOUT_REPO]`, `[NEW_APP_NAME]`) before sending.

---

## Role and objective

You are a senior engineer tasked with **repurposing an existing Playwright-based bank/card scraping codebase** (originally built for Card Scout–style data ingestion: bank-specific crawlers, validation scripts, structured storage) so it powers a **new application** that includes a **WebSocket** layer for real-time progress and events.

The new product goal is **issuer-wide, card-wide perks and economics ingestion**:

- For **every major issuer** (e.g. American Express, Chase, Citi, Capital One, Discover, Bank of America, Wells Fargo, US Bank, and any others in scope), and for **each consumer card product** that issuer markets on their official site:
  - Capture **annual fee** (and authorized user fee if shown).
  - Capture **rewards earn structure** (categories, multipliers, caps, exclusions) where published.
  - Capture **statement credits and benefits** in a **normalized, machine-usable** way — not just prose. Examples of what “meaningful” means:
    - Amex-style **hotel credits** (e.g. twice per calendar year vs once per membership year), **lounge access**, **DoorDash / Uber / dining / airline incidental** credits, **CLEAR / Global Entry** credits, **streaming** bundles, **Walmart+ / Disney+** style bundles, **resort / airline fee** credits, **cell phone protection** prerequisites, etc.
  - For each benefit row, extract **recurrence** (once per calendar year, twice per calendar year, monthly, quarterly, semi-annual, per cardmember year, one-time welcome), **amount** (USD), **cap** (if any), **enrollment required** (yes/no/unknown), **merchant restrictions** (if stated), **effective dates** or “offer ends” if shown, and **source URL** + **scraped at** timestamp.

Deliver primary artifacts as **CSV** (and optionally **JSON Lines** for nested fields) suitable for import into Postgres, SQLite, or a spreadsheet pipeline.

---

## Critical context about this repository (Zubair’s portfolio / zeebuilds)

- The **portfolio repo you may be opened in does not contain scraper source code**. Project policy: scraping / Playwright crawlers live under **`crawlers/`** or **`scripts/`** with scraper logic, and those paths are **gitignored** and intentionally **not pushed** to GitHub.
- The **canonical scraping implementation** is expected to live in one or more of:
  - A **separate Card Scout application repository** (e.g. `the-card-scout` / `boozinix/the-card-scout` on GitHub), **or**
  - A local-only **`crawlers/`** tree checked out adjacent to the product app.
- **Your first task** is to **locate the real codebase**: search for `playwright`, `@playwright/test`, `chromium.launch`, issuer names, `crawler`, `scrape`, `card`, `issuer`, `rewards`, `annual_fee`, etc. Do not invent file paths; **map the actual modules** and document them in your reply.

---

## Business requirements (what “good” looks like)

1. **Coverage**: Config-driven list of **issuers** and **card detail URLs** (or listing pages that expand to detail URLs). Support adding a new issuer without forking the entire framework.
2. **Correctness over speed**: Prefer **deterministic extraction** (stable selectors + tests) over brittle full-page LLM parsing. Use LLM **only** as an optional fallback for messy HTML, with human-reviewable confidence scores.
3. **Normalization**: Raw marketing copy must land in a **typed schema** so downstream code can answer: “Does this card have a semi-annual hotel credit and how much per period?”
4. **Auditability**: Every exported row must trace to **source URL**, **run id**, and **timestamp**.
5. **Operational safety**: Rate limiting, retries with backoff, respect **robots.txt** where applicable, clear separation of **dev/staging/prod** targets. Document legal/ToS constraints for the product owner; do not bypass paywalls or log into user accounts unless that is explicitly in scope and legally cleared.

---

## Suggested canonical data model (CSV + optional JSON)

Design **one row per “benefit instance”** (or per earn rule) with nullable columns for irrelevant fields. Example columns (refine to match product):

| Column | Description |
|--------|-------------|
| `run_id` | UUID for this scrape run |
| `issuer_slug` | e.g. `amex`, `chase` |
| `issuer_name` | Display name |
| `card_slug` | Stable internal id |
| `card_marketing_name` | As shown on site |
| `product_code` | If issuer exposes a product id |
| `annual_fee_usd` | Number or empty |
| `annual_fee_waived_first_year` | boolean |
| `benefit_type` | Enum: `statement_credit`, `lounge`, `travel_credit`, `hotel_credit`, `dining_credit`, `rideshare_credit`, `streaming_bundle`, `airline_incidental`, `signup_bonus`, `earn_category`, `other` |
| `benefit_label` | Short human label, e.g. “Hotel collection credit” |
| `amount_usd` | Per occurrence if fixed |
| `recurrence` | Enum: `once`, `monthly`, `quarterly`, `semi_annual`, `annual`, `twice_calendar_year`, `per_member_year`, `unspecified` |
| `cap_usd` | If a cap per period |
| `enrollment_required` | `true` / `false` / `unknown` |
| `merchant_or_category_scope` | Free text + optional normalized tags |
| `earn_category` | For earn rules: e.g. `dining` |
| `earn_multiplier` | e.g. 3 |
| `earn_cap_usd` | If stated |
| `terms_excerpt` | Short verbatim snippet for dispute resolution |
| `source_url` | Canonical page URL |
| `scraped_at` | ISO-8601 UTC |
| `parser_version` | semver |
| `confidence` | 0–1 if using ML assist |

Additionally export **`cards.csv`** (one row per card: fees, marketing bullets, product URL) and **`runs.csv`** (run metadata: start/end, counts, errors).

---

## Architecture: how to repurpose the existing scraper for the next app

### 1. Separate concerns into packages or folders

Refactor (or treat as boundaries if already separate):

| Layer | Responsibility |
|-------|----------------|
| **Browser runner** | Playwright: launch, context, stealth settings, screenshots on failure, download PDFs if terms are PDF-only. |
| **Issuer adapters** | One module per issuer (or per site family): `navigateToCard`, `extractCardList`, `extractCardDetail`, `parsePerks`. |
| **Normalization** | Pure functions: map issuer-specific strings → `recurrence` enum, USD parsing, “twice a year” detection. |
| **Persistence** | Today: “Postgres schema” / files. Tomorrow: **CSV writer** + optional **DB upsert** for the new app. |
| **Job orchestration** | Queue of URLs or (issuer, card) jobs; concurrency limits per domain; deduplication. |
| **Observability** | Structured logs, per-job status, error taxonomy (`SELECTOR_DRIFT`, `RATE_LIMIT`, `CAPTCHA`, `TIMEOUT`). |

The **new WebSocket service** should **not** own scraping logic directly. It should **subscribe to orchestration events** (job started, page fetched, row written, job failed, run complete) and **broadcast JSON messages** to connected clients.

### 2. WebSocket contract (for the new app)

Define a small message protocol, e.g.:

```json
{ "type": "run.started", "runId": "...", "ts": "..." }
{ "type": "job.started", "runId": "...", "issuer": "amex", "url": "..." }
{ "type": "job.progress", "runId": "...", "phase": "parse_benefits", "pct": 40 }
{ "type": "artifact.written", "runId": "...", "path": "out/runs/.../benefits.csv", "rowCount": 128 }
{ "type": "job.failed", "runId": "...", "errorCode": "SELECTOR_DRIFT", "detail": "..." }
{ "type": "run.completed", "runId": "...", "summary": { "jobs": 42, "failed": 1 } }
```

Implementation options (pick one and justify):

- **Node**: `ws` or `socket.io` alongside a long-running worker process.
- **Python**: `fastapi` + `WebSocket` if the scraper stays Python; or run Node worker that shells to Python — prefer **single language** per deployment unit.

### 3. What the new codebase must implement

1. **Configuration**: YAML or JSON listing issuers, base URLs, max concurrency, selector pack version.
2. **CLI entrypoints**: `scrape:run --issuer amex --out ./out`, `scrape:validate` against golden HTML fixtures.
3. **Fixture tests**: Check in **sanitized HTML snapshots** (remove PII, truncate) in-repo for selector regression tests — **not** live network in CI if avoidable.
4. **CSV export module**: Streaming writer for large runs; UTF-8; RFC-compliant quoting.
5. **Webhook or file drop** (optional): After run, upload to S3 or post to internal API.
6. **WebSocket server** (thin): Reads from an in-process event bus or Redis pub/sub if multiple workers.

### 4. What to modify vs copy

| Item | Action |
|------|--------|
| Issuer-specific selectors and copy-paste parsers | **Copy and extend** per new issuer pages; version them (`amex_v3.ts`). |
| Playwright bootstrap, retry, proxy hooks | **Reuse** as shared library. |
| Card Scout–specific DB schema / Prisma models | **Do not** drag wholesale; **map** to new app’s schema or to CSV-first ETL. |
| Job names, env vars, secrets | **Rename** to new app; rotate keys. |
| Docker / CI | **New** pipeline job: `npm run test:scrapers` or equivalent with fixtures only. |

---

## Implementation plan (ordered)

1. **Inventory** existing scrapers: list files, entrypoints, how Card Scout triggers runs (cron, manual script, GitHub Action).
2. **Extract** a `packages/scraper-core` (or `libs/ingestion`) with zero imports from Card Scout UI.
3. **Add** `benefits` / `perks` extraction interface: `ExtractedCard { fees, earnRules[], perks[] }`.
4. **Implement** normalization + CSV serializers + JSON schema (for validation).
5. **Wire** WebSocket event emitter at orchestration boundaries.
6. **Pilot** one issuer (e.g. Amex) end-to-end: 3–5 cards, manual diff of output vs site.
7. **Roll out** issuers incrementally; track coverage in a `coverage.json` artifact per run.

---

## Issuer-specific notes (high-level patterns)

- **American Express**: Many benefits on **tabs** or **accordion** modules; amounts often in **superscript** or adjacent headings; recurrence phrases like “**twice per calendar year**” must map to `twice_calendar_year`. Enrollment callouts are common.
- **Chase**: Often **PDF benefits guides** for premium cards — consider **PDF text extraction** pipeline or official **API-like** structured pages if available.
- **Citi / Capital One**: Frequent **marketing footnotes**; footnote numbers must be captured in `terms_excerpt` or linked footnote text.
- **Co-branded cards**: Hotel chain / airline pages may live on **partner** subdomains — adapter routing must follow redirects and canonical host.

---

## Non-goals (unless explicitly added later)

- Scraping **user-specific** offers (logged-in “Amex Offers” targeted deals) — different legal and technical surface; keep out of scope unless approved.
- Real-time **transaction** rewards tracking (that is **ledger** data, not marketing scrape data). This prompt is about **published program terms**.

---

## Deliverables the coding agent should produce

1. **Repo map** (markdown): paths, responsibilities, how to run locally.
2. **Refactor PR plan** (or commits): core extraction vs adapters vs transport.
3. **CSV schemas** documented with example rows.
4. **WebSocket message spec** + minimal client example (browser or `wscat`).
5. **Test strategy**: fixtures, golden outputs, CI command.
6. **Runbook**: rate limits, failure modes, how to rotate selectors when marketing site redesigns.

---

## Instructions for the agent that receives this prompt

1. Confirm where the **existing scraper code** lives relative to the workspace you have open.
2. Propose a **concrete folder structure** for the extracted shared library and the new app integration.
3. Implement or scaffold in **small, reviewable steps**; do not one-shot thousands of lines without tests for parsers.
4. Ask the product owner only for **blocking** decisions: target issuers list, whether PDF parsing is in scope, and hosting constraints (single VPS vs serverless — note: long Playwright jobs often **do not fit** Vercel serverless timeouts; prefer a **worker** on Fly.io, Railway, AWS ECS, or similar).

---

## One-line summary for prioritization

**Repurpose bank-specific Playwright scrapers into a versioned, CSV-first perks ingestion pipeline with a thin WebSocket progress layer for a new app, preserving audit trails and normalized benefit recurrence semantics.**

---

_End of handoff prompt._
