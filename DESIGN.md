# DESIGN.md

Constraint file for zubairnizami.com. Any agent working on this repo reads this
first and treats it as binding. When a rule here conflicts with a default,
this file wins.

The purpose of this file is to remove decisions from the model. Every time an
agent is asked to be "clean", "modern", or "premium" it returns the statistical
centre of its training data, which is the exact look this file exists to avoid.
So: no adjectives. Tokens, values, and bans.

---

## 0. Hard bans

These are not preferences. If any of these appear in a diff, the diff is wrong.

### Colour

Never use, in any form (hex, Tailwind class, CSS variable, gradient stop):

```
#6366F1  indigo-500      #8B5CF6  violet-500
#7C3AED  violet-600      #6D28D9  violet-700
#A855F7  purple-500      #A78BFA  violet-400
```

No `indigo-*`, `violet-*`, `purple-*`, `fuchsia-*` Tailwind classes anywhere.
No CSS variable with a hue between 240 and 300.

Also banned, because they are the 2026 replacement tell rather than a fix:

```
#faf8f5 / #f5f1e8 / bg-stone-50 / bg-stone-100 / bg-amber-50   (cream grounds)
#15573a / #1a4d3a / emerald-800 / green-900                     (sage accents)
```

### Effects

- No `linear-gradient` or `radial-gradient` anywhere. Not on backgrounds, not on
  buttons, not on borders, not on text.
- No `bg-clip-text` / `text-transparent` gradient headlines.
- No `backdrop-filter` / `backdrop-blur`. No glassmorphism.
- No coloured `box-shadow`. Shadows, if used at all, are neutral and under 0.08
  opacity. Prefer hairline borders and surface steps instead.
- No `rounded-full` on buttons. No `rounded-2xl` / `rounded-3xl` on containers.
- No coloured left or top border stripe on a card. This is a named detector.
- No animated mesh, blob, aurora, or "spotlight" backgrounds.

### Type

Never load or specify: Inter, Geist, Sora, Space Grotesk, Syne, Instrument
Serif, Fraunces, Playfair Display, Poppins, Montserrat. System sans as the
display face is also banned.

### Layout and content

- No splash screen, intro gate, loading curtain, or "Enter" button.
- No typewriter, text-scramble, or rotating-word effect on any heading, ever.
- No count-up number animation. Numbers are rendered in HTML at their real value.
- No pill badge floating above an H1.
- No `text-center` on the hero. No page where every section is centred.
- No emoji anywhere in headings, nav, bullets, or feature cards.
- No `→`, `↗`, `·`, or other Unicode decoration inside sentences. Write the word.
- No "trusted by" or "experience at" logo strip made of plain text.
- No three-column icon-on-top feature card grid.
- No numbered `01 / 02 / 03` markers unless the content is a genuine sequence.
- No FAQ accordion.
- No content whose visibility depends on a scroll observer firing.

---

## 1. Visual system

The direction is decided. It is Direction A, Instrument panel. Directions B and C
were deleted from this file on 2026-08-22. Do not propose alternatives, do not
ask which to use, and do not blend anything into this.

### Direction A: Instrument panel

The rationale, which must be statable in one sentence: Zubair ships systems that
take actions, so the site reads like something that reports state. Telemetry, not
marketing. Labels are mono, numbers are tabular, rules are hairlines, and the one
accent is the colour of a state change.

```css
:root{
  --ground:      #F4F5F3;  /* cool off-white, faint green-grey bias */
  --surface:     #EAEBE8;
  --surface-2:   #E0E2DE;
  --ink:         #14171A;  /* near-black, slate cast */
  --ink-2:       #545C63;
  --ink-3:       #7B848C;
  --rule:        #C9CCC7;
  --rule-soft:   #DADCD7;
  --accent:      #C2551F;  /* signal amber. sampled from a hazard beacon */
  --accent-soft: #F0DDD0;
  --ok:          #2F6B4F;  /* semantic only, never decorative */
  --warn:        #B0871C;
}
:root[data-theme="dark"], /* and the prefers-color-scheme block */ {
  --ground:      #131518;
  --surface:     #1A1D21;
  --surface-2:   #22262B;
  --ink:         #E8E9E4;
  --ink-2:       #99A1A8;
  --ink-3:       #79818A;
  --rule:        #2C3036;
  --rule-soft:   #23272C;
  --accent:      #E8783C;
  --accent-soft: #382214;
  --ok:          #6FA98A;
  --warn:        #D4AC4B;
}
```

Type: **Archivo** (display and headings) + **Newsreader** (body) + **IBM Plex
Mono** (labels, data, metadata). All three on Google Fonts.

Reason for the pairing, statable out loud: Archivo is a 19th century American
gothic revival, so it is sturdy and industrial without being neutral the way
Inter is. Newsreader is a screen-first editorial serif, which signals that the
site is meant to be read rather than skimmed. Plex Mono is IBM's, which is the
right institutional register for numbers.

---

## 2. Typographic rules

- **Weight ceiling is 600.** No 700, no 800, no `font-bold` on display type.
  Hierarchy is carried by size, spacing and colour instead. This is slower to get
  right and much harder to imitate by accident, which is the point.
- **Tracking is a ramp, not a value:**
  - display, 48px and up: `letter-spacing: -0.028em`
  - headings, 20 to 32px: `-0.014em`
  - body, 16 to 18px: `-0.006em`
  - mono uppercase labels, 11 to 13px: `+0.10em`
- Body measure stays between 62 and 70 characters.
- Body size 17px minimum. Inputs 16px minimum so iOS does not zoom on focus.
- `font-variant-numeric: tabular-nums` on every number that sits in a column or
  changes value.
- `text-wrap: balance` on headings only.
- `-webkit-font-smoothing: antialiased` and `-webkit-text-size-adjust: 100%`.

## 3. Spacing and elevation

- 8px grid, 4px half-step. No arbitrary values like `p-7` or `mt-[37px]`.
- Proximity must vary by relationship. Within a component is tighter than between
  components, which is tighter than between sections. Uniform `gap-4` everywhere
  is the tell, not the grid itself.
- Elevation is hairline borders (1px, `--rule`) plus a surface step
  (`--surface` over `--ground`). Shadows are a last resort.
- Radius: 4px on controls, 8px maximum on containers. Nothing larger.
- Cards default to **borderless**. Establish hierarchy in this order: whitespace,
  then a 3 to 5 percent background shift, then a hairline. Never a flat grey 1px
  box as the first move.

## 4. Motion

- All UI transitions under 200ms. Modals and drawers up to 300ms.
- Exit animations run 20 percent faster than entrances.
- Animate `transform` and `opacity` only. Never height, width, padding, margin.
- Named curves. Never bare `ease` or `transition: all`.

```css
--ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
--ease-out-expo:  cubic-bezier(0.19, 1, 0.22, 1);
--ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
```

- Button press scales from 0.97, not 0.95, and never scales up on hover.
- `@media (prefers-reduced-motion: reduce)` disables all of it, and the page must
  be fully legible and fully populated with motion off.
- **Nothing animates into visibility.** Opacity animations may only run on
  elements that are already rendered and readable at rest.

## 5. Layout

- The page is asymmetric, and asymmetric because of a structural reason, not as a
  style. The reason here: a fixed left rail carrying metadata (dates, status,
  measured values, links) beside a main reading column. Metadata in the margin is
  how technical documents have always worked.
- Rail is 11 to 12rem on desktop and collapses above the content on mobile.
- One high-chroma accent, on under 5 percent of pixels. Everything else is the
  neutral ramp.
- Semantic colour (`--ok`, `--warn`) is separate from `--accent` and never used
  decoratively.
- Wide content (tables, code) scrolls inside its own `overflow-x: auto` container.
  The page body never scrolls sideways.

## 6. Copy rules

Measured on the current site: 22.5 em dashes per 1,000 words. Human baseline is
2 to 3. Target is under 4.

Banned constructions:

- Em dashes and en dashes. Use commas, periods, parentheses, or two sentences.
- Tricolons. "Code, taste, and relentless follow-through" is the exact cadence.
- "Not just X, but Y" and "Not X. Not Y. Just Z."
- "Here's the kicker", "Here's where it gets interesting", "Let's unpack",
  "Imagine a world where", "Think of it as".
- seamless, leverage, elevate, unlock, supercharge, transform, unleash,
  effortlessly, robust, streamline, delve, harness, reimagined, passionate,
  spearheaded.
- Vague attribution: "experts argue", "industry reports suggest".
- Bold-first bullets in the pattern `**Thing**: description`.
- Vague magnitude: "significantly", "dramatically", "thousands of users".

Required:

- Every number carries a baseline and a period. "157 percent" alone is a red
  flag. "157 percent revenue growth over four quarters, $84M to $216M, GTM
  strategy at AWS" is a claim.
- Every product claim carries a live URL.
- At least one documented failure per project. Absence of stated limitations is a
  named portfolio red flag.

## 7. Non-negotiable page requirements

1. The H1 is one static sentence. It never animates, rotates, or types.
2. There is no splash gate.
3. All statistics render at their real value in the HTML source.
4. Every section's content is visible with JavaScript disabled and with reduced
   motion on.
5. The number of shipped products is the same everywhere, including the meta
   description.
6. Live product links are above the fold.
7. `prefers-color-scheme` is handled at token level: bare `:root` defines the full
   light palette, a `@media (prefers-color-scheme: dark)` block guarded with
   `:root:not([data-theme="light"])` redefines only tokens, and
   `:root[data-theme="dark"]` redefines them again. No colour is ever declared for
   the first time inside a media or `[data-theme]` block.

## 8. Definition of done

Run `slopcheck.js` in the browser console against the built page. Ship only when:

- gradient count is 0
- banned-hue count is 0
- glow shadow count is 0
- `rounded-full` button count is 0
- em dashes per 1,000 words is under 4
- Unicode arrow count in body copy is 0
- low-opacity text node count is 0
- H1 text is identical across three reads one second apart
- every stat renders its real value with JavaScript disabled
