# CLAUDE.md — Portfolio Project Rules & Context

> Read this file at the start of every session. It is the single source of truth for how to work in this repo.

---

## Git Save Rules (NON-NEGOTIABLE)

### Rule 1 — Online push excludes crawlers
When doing `git push` (saving online), NEVER push crawler files. Crawler code lives in `crawlers/` or any `scripts/` subdirectory that contains scraping code. These are gitignored. If they somehow appear unstaged, do NOT commit or push them.

### Rule 2 — Local-only files: crawlers + .env
The following NEVER go online:
- `.env.local` and all `.env*` files (already in `.gitignore`)
- `crawlers/` directory (any web scraping / Playwright scripts)
- `scripts/` if it contains scraper code
- `git_tracker.csv` (personal tracking tool, stays local)

### Rule 3 — Update git_tracker.csv on every commit
Every time a `git commit` is made, the `git_tracker.csv` file in the project root must be updated automatically via the post-commit hook (`.git/hooks/post-commit`). The tracker records: timestamp, commit hash, branch, message, files changed, and push status (local vs online). The pre-push hook updates status to "online" when commits are pushed to remote.

**Format:** `timestamp,date,short_hash,full_hash,branch,message,files_changed,status`

---

## Project: zubairnizami.com

**Owner:** Zubair Nizami — AI PM & solo builder
**URL:** https://zubairnizami.com
**Deploy:** Vercel (auto-deploys from `main` branch on push)
**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React
**Email:** Resend (API key in `.env.local` as `RESEND_API_KEY`, recipient in `CONTACT_EMAIL`)

---

## File Map

| Path | Purpose |
|------|---------|
| `lib/projects.ts` | **Source of truth** for all project data (ApplyStudio, Card Scout, Neural Mob) |
| `app/page.tsx` | Home — hero, featured projects, CTA |
| `app/work/page.tsx` | Work index — project grid |
| `app/work/[slug]/page.tsx` | Project detail / case study |
| `app/about/page.tsx` | About — bio, experience timeline with logos, skills |
| `app/contact/page.tsx` | Contact form (submits to `/api/contact`) |
| `app/api/contact/route.ts` | Contact API — Resend email, rate limiting, Zod validation, CSRF |
| `app/layout.tsx` | Root layout, metadata, OG tags |
| `app/globals.css` | Custom animations: shimmer-in, z-spin, hero gradient |
| `components/Navbar.tsx` | Sticky header, Z logo, mobile hamburger |
| `components/Footer.tsx` | Social links, credits |
| `components/PageTransition.tsx` | Framer Motion page entrance wrapper |
| `components/Pill.tsx` | Pill badge component |
| `components/Section.tsx` | Section wrapper |
| `components/ProjectHeader.tsx` | Project detail header |
| `app/robots.ts` | Robots meta |
| `app/sitemap.ts` | Sitemap |
| `vercel.json` | Security headers (CSP, HSTS, X-Frame, etc.) |
| `public/` | Static assets: og.png, logos (apple.png, aws.svg.png, meta.png, zoox.png), resume PDF |

---

## Current Experience (About page, in order)

1. **AWS** — Senior Partner Manager (May 2025–Present) — 157% revenue growth ($84M→$216M)
2. **Meta** — PM, Infrastructure & Data Centers (Jun 2024–Apr 2025) — Digital Twin platform, $250M cost cut
3. **Zoox** — Senior TPM (Feb 2022–Jun 2024) — 0→1 robotaxi tools, 3D rider app, ML infra cost -25%
4. **Apple** — Product Design Lead (May 2015–Feb 2022) — iPhone NPI, Vision Pro display, OLED test platform

---

## Products (lib/projects.ts)

| Product | Stack | URL |
|---------|-------|-----|
| **ApplyStudio** | Next.js, GPT-5.1, Multi-agent AI | applystudio.net |
| **Neural Mob** | Next.js, TypeScript, AI-forward site | neuralmob.xyz |
| **Card Scout** | Next.js, GPT-5, Claude, DeepSeek, Postgres | thecardscout.app |
| **StockTracker** | Next.js 15, Neon Postgres, Claude Haiku 4.5 + Kimi K2 | stock-tracker-chi-one.vercel.app |

---

## Design System

- **Background:** `slate-950`
- **Accent gradient:** Sky-400 → Violet-400 → Fuchsia-400
- **Typography:** `text-slate-50` (headings), `text-slate-300` (body), `text-slate-400` (muted)
- **Borders:** `border-slate-800` default, `border-sky-500/50` hover
- **Cards:** `bg-slate-950/60`, rounded-xl, hover → `-translate-y-2`
- **Buttons:** Gradient pill (primary), border pill (secondary), min-h-[48px] on mobile

---

## Active Uncommitted Changes (as of last session)

Files modified but not yet committed to main:
- `app/about/page.tsx` — updated experience order/logos
- `app/api/contact/route.ts` — new file (Resend integration)
- `app/page.tsx` — minor copy updates
- `app/work/[slug]/page.tsx` — case study updates
- `app/work/page.tsx` — work index updates
- `components/Navbar.tsx` — navbar updates
- `package.json` / `package-lock.json` — added Resend, Zod
- `vercel.json` — security headers added
- New assets: `public/apple.png`, `public/aws.svg.png`, `public/meta.png`, `public/zoox.png`, `public/Zubair_Nizami_Resume_Mar26.pdf`

---

## Zubair's Preferences

- **Terse responses** — no trailing summaries, no filler
- **Mobile-first** always — min-h-[48px] touch targets, safe areas, responsive text
- **No over-engineering** — solve the exact problem, don't add patterns for hypothetical future use
- **Resume Tailor → ApplyStudio** — the product was renamed; always use "ApplyStudio"
- Push to Vercel only when changes are stable and tested locally first

---

## Git Tracker

`git_tracker.csv` lives in the project root (gitignored, local only). Updated automatically by git hooks:
- `.git/hooks/post-commit` — appends row on every commit with status "local"
- `.git/hooks/pre-push` — updates rows to "online" when pushed to remote
