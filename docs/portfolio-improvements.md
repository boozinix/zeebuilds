# Portfolio Improvement Plan — zubairnizami.com
> Based on a full live walkthrough of every page. Hand this to Claude Code to implement.
> Last updated: 2026-04-27

---

## Walkthrough Status (what was verified)

| Page | URL | Status |
|------|-----|--------|
| Home | `/` | ✅ Fully reviewed |
| Work | `/work` | ✅ Fully reviewed |
| ApplyStudio | `/work/apply-studio` | ✅ Fully reviewed |
| Card Scout | `/work/card-scout` | ✅ Fully reviewed |
| Neural Mob | `/work/neural-mob` | ✅ Fully reviewed |
| About | `/about` | ✅ Fully reviewed |

### Things that are already correct (do NOT change)
- Cycling hero text already leads with "AI Product Manager. / Solo Builder." — no reordering needed.
- "What I Build" section already has subtitles below each word (STRATEGY → 0→1 roadmaps, EXECUTION → solo shipped, etc.) — no hover-reveal needed.
- "OPEN TO WORK" status indicator already exists in the nav.
- Home page project links already use correct slugs (`/work/apply-studio`, `/work/card-scout`, `/work/neural-mob`).
- All three case studies are fully written with 4 sections + tech stack.
- Card Scout appears in the Fintech filter on `/work`.

---

## PRIORITY 1 — UI Fixes (Quick wins)

---

### 1.1 ApplyStudio Case Study — Replace "Real-time" metric
**File:** `/work/apply-studio` — the 3-card metrics row at the top of the page

**Current:**
```
20+                    <90s                   Real-time
JOBS PROCESSED         PER-APPLICATION TIME   ATS FIT SCORING
SIMULTANEOUSLY
```

**Problem:** `Real-time` is not a number. It has no impact next to `20+` and `<90s`. It reads as a feature flag, not a result.

**Fix:** Replace the third card with a real quantitative metric. Use whichever is most accurate:
- `7` / AI Tools in One Platform ← preferred if accurate
- `4` / AI Models Orchestrated
- `80%` / Time-to-Apply Reduction
- `#1` / [specific ranking or metric if available]

---

### 1.2 Neural Mob Case Study — Replace qualitative metrics with numbers
**File:** `/work/neural-mob` — the 3-card metrics row at the top of the page

**Current:**
```
N agents               Scored                 Live
PARALLEL MODEL DEBATE  REASONING TRACES       PRODUCTION DEPLOYED
                       RANKED
```

**Problem:** All three cards are qualitative. Card Scout and ApplyStudio both have hard numbers (`$2,500+`, `100+`, `<90s`). Neural Mob looks unfinished by comparison.

**Fix:** Replace with actual numbers:
```
3                      1                      100%
MODELS DEBATE          SCORING AGENT          OPEN-SOURCE
IN PARALLEL            PICKS THE WINNER       REASONING TRACES
```
Or use any real numbers that apply (e.g. number of test queries run, avg response time, number of users).

---

### 1.3 Work Page — Fix featured banner visual clutter
**File:** `/work` — the featured ApplyStudio banner at the top

**Problem:** The featured banner uses a live app screenshot as the background image. The app's own UI text ("Land the role of Product Manager at Stripe" etc.) competes directly with the portfolio card text overlaid on top of it. Two text layers = visual noise.

**Fix (pick one):**
1. **Blur + darken** the screenshot background: CSS `filter: blur(8px)` plus a dark overlay at ~60% opacity. The image reads as texture, not content.
2. **Solid gradient** instead of screenshot: dark navy → purple/cyan gradient matching the site's existing color system. Cleaner, faster.

Keep: project title, tagline, and "VIEW CASE STUDY →" link. Remove: the competing app UI text from the visual background.

---

### 1.4 Splash Screen — Name visibility
**File:** Splash/entry screen — the text below the Enter button

**Problem:** "ZUBAIR NIZAMI · PORTFOLIO" is extremely faint. It's the only identity text on the splash and it's nearly invisible.

**Fix:**
- Increase opacity from ~15–20% to ~60–70%
- Optionally increase font-size by 1–2px
- Letter-spacing is already good — keep it

---

## PRIORITY 2 — Content Improvements

---

### 2.1 Home Stats — Add 4th stat card for $2M
**File:** Home page — the 3-column stats grid (Revenue Growth / Cost Savings / Live Products)

**Current layout (3 columns):**
```
157%              $250M+            3
Revenue Growth    Cost Savings      Live Products
GTM · AWS         Meta · Digital    Solo-built
$84M → $216M      Twin
```

**Problem:** The `3` card is visually weak — it's just a single digit against `157%` and `$250M+`. The Apple robotics investment ($2M) is a strong credential currently missing from the home stats.

**Fix — Add a 4th card, making it a 4-column grid:**
```
157%              $250M+            3                 $2M
Revenue Growth    Cost Savings      Live Products     Investment
GTM · AWS         Meta · Digital    Solo-built        Secured
$84M → $216M      Twin per region   Full-stack        Apple Robotics
```

If 4 columns breaks the layout on mobile, use Option B: keep 3 columns but update the "3" card subtext to `ApplyStudio · Card Scout · Neural Mob` instead of just "Solo-built" to give it more substance.

---

### 2.2 About Page — Strengthen Apple entry
**File:** `/about` — the experience timeline, Apple section

**Current Apple entry:**
- Role: "Product Design Lead"
- Date: "May 2015 – Feb 2022"
- Body: "Tech Lead across iPhone X, XS, 11, and 12. Built Apple's first OLED chip-level test platform (50% yield improvement), secured $2M in robotics investment, and led a cross-functional taskforce eliminating a defect that could have impacted 200K+ customers."

**Problem:** Apple is 7 years — the longest tenure — and covers the most impressive hardware→software career arc, but it gets the same visual weight as a 2-year role. Also, Vision Pro display work is missing.

**Fix 1 — Add a role tag row** (similar to how Meta shows "PM, INFRASTRUCTURE & DATA CENTERS"):
```
PRODUCT DESIGN LEAD · 7 YEARS · HARDWARE → SOFTWARE
```

**Fix 2 — Add Vision Pro to the body text:**
Append to the existing paragraph: `...and contributed to Vision Pro display system design.`

Or add it as a second bullet if the component supports bullets.

---

### 2.3 About Page — Add role tag to Apple (same pattern as Meta)
**File:** `/about` — specifically the company/role tag that appears under the company name

Meta already shows: `PM, INFRASTRUCTURE & DATA CENTERS`
Apple currently shows: `PRODUCT DESIGN LEAD` (just the title, no context tags)

Add duration and arc context to the Apple tag:
```
PRODUCT DESIGN LEAD · 7 YEARS · iPHONE → VISION PRO
```

---

## PRIORITY 3 — Nice-to-Haves

---

### 3.1 Work Page — Feature rotation or second featured slot
Currently only ApplyStudio is featured at the top of `/work`. Card Scout has strong numbers ($2,500+, 100+ cards) and could be co-featured or rotated. Consider adding a secondary featured card or letting the featured slot rotate.

### 3.2 About Skills section — Organize by category
The skills list is currently a flat tag cloud (~15 items). Consider grouping:
- **AI / ML:** Multi-agent AI orchestration, LLM APIs, AI dev tooling
- **Product:** Problem discovery, strategy, roadmapping, B2C growth
- **Engineering:** TypeScript, Next.js, Vercel, Postgres, web scraping
- **Domain:** Fintech, rewards optimization, consumer AI

### 3.3 Company logos in experience timeline
The timeline uses small dark icon boxes. Actual SVG company logos (lightly tinted or white) would let recruiters scan much faster.

---

## Implementation Notes

1. **Color palette and typography:** Do not change. Dark navy + cyan/purple gradient is working.
2. **Nav structure:** Do not change. HOME / WORK / ABOUT / CONTACT is clean.
3. **Case study structure:** Do not change. All three case studies (ApplyStudio, Card Scout, Neural Mob) already follow the same 4-section pattern (01 THE PROBLEM / 02 INSIGHT & APPROACH / 03 WHAT I BUILT / 04 RESULTS) + Tech Stack.
4. **Priority order:** Do 1.1 → 1.2 → 1.3 → 1.4 first. They're all single-component changes with no dependencies.
5. **Metrics in 2.1:** Zubair should confirm which metric to use in 1.1 and 1.2 before implementing — values marked in brackets `[like this]` need his sign-off.
