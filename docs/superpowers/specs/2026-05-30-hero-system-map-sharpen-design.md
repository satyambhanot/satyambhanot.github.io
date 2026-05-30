# Hero System Map & Identity Sharpen — Design Spec
**Date:** 2026-05-30
**Author:** Satyam Bhanot

---

## Goal

Make the portfolio at `satyambhanot.github.io` feel distinctly *engineered* — like it was built by someone who works in backend systems, data, and ML — without a structural redesign. Keep everything that already works (the copy, the "what stuck with me" notes, the speed, the information architecture, accessibility, dark/light theming) and add a memorable visual identity on top.

The unifying idea: **make the medium reflect the message.** The signature element is a live "system map" in the hero that renders Satyam's stack as a small animated system, with nodes that map to real projects.

**Stack:** Vanilla HTML, CSS, JS — no frameworks, no build step. Existing files preserved: `index.html`, `styles.css`, `script.js`. No new dependencies. Emerald palette (already shipped) is retained as the brand/accent color.

**Principle:** Additive and reversible. No section is removed or restructured. If the diagram fails to load or JS is disabled, the page degrades to the current hero with no broken layout.

---

## 1. Signature element — Hero "system map" panel

### Placement
The hero stays a two-column layout. The **right column** becomes a vertical stack:

1. **System-map panel** (new) — top
2. **Portrait + "Currently" card** (existing, compacted) — below

On mobile (≤920px) the column stacks under the hero copy as it does today. The portrait stays — a recruiter benefits from a face. The map panel sits above it.

### The panel
Styled as a small monitor/terminal window:

- **Title bar:** a left label `satyam@portfolio — system.map` in monospace (`--font-mono`, `--soft`/`--muted`) and three small window dots (`● ● ●`) on the right. Dots are decorative (`aria-hidden`).
- **Body:** the system diagram (see below) on a surface that matches existing card surfaces (`--surface`, `--line` border, existing card radius/shadow). Themed via CSS variables so it works in both light and dark mode.

### The diagram
A directed graph of six nodes representing the shape of the systems Satyam builds:

```
[client] ─▸ [api] ─▸ [worker] ─▸ [db]
              │          │
              ▾          ▾
           [cache]    [ml·model]
```

Edges (direction matters):
- client → api
- api → worker
- api → cache
- worker → db
- worker → ml·model

**Node → real work mapping** (used for the hover interaction and as a legend caption):

| Node | Maps to |
|---|---|
| client | the surfaces people actually use |
| api | Java, FastAPI, Node.js — service/application logic |
| worker | C threads library, ExFAT shell — systems & concurrency |
| db | SQL, PostgreSQL, MongoDB — Winnipeg City Analysis |
| cache | reliability & systems thinking (OS, debugging) |
| ml·model | scikit-learn / PyTorch — Fraud Detection, Waldo CNN |

### Implementation approach
Build the diagram as **inline SVG**, not literal ASCII text characters.

- **Why SVG, not text:** literal box-drawing characters do not align reliably across viewport sizes and font fallbacks; SVG aligns perfectly, scales crisply, and themes via CSS variables / `currentColor`. The *aesthetic* stays monospace/box-drawing (node labels in `--font-mono`, thin 1px strokes, rounded-rect nodes that echo terminal boxes) so it still reads as an ASCII system diagram.
- **Nodes:** rounded `<rect>` + monospace `<text>` label, stroke in `--line-strong`, label in `--ink`/`--muted`.
- **Edges:** `<path>` strokes in `--line-strong` with small arrowheads.
- **Packets:** small emerald (`--accent`) dots that travel along each edge on a continuous loop using CSS `offset-path` (with the same path data as the edges). Subtle glow via `filter`/`box-shadow` equivalent. Staggered timing so flow looks organic, not synchronized.
- **Boot-in:** on first load, edges draw in via `stroke-dasharray`/`stroke-dashoffset` transition and nodes fade/scale in over ~600–800ms, then packets begin looping. Runs once.
- **Size budget:** target ≲ 3KB of inline SVG + a small JS init. No external assets.

### Hover interaction (primary micro-interaction)
Hovering (or focusing, for keyboard) a node:
- Highlights that node (emerald stroke/fill wash) and dims the others slightly.
- Shows the node's "maps to" text in a small caption line beneath the diagram (single live region, not a floating tooltip — simpler and accessible).
- On touch devices, tap toggles the same caption.

Each node is keyboard-focusable (`tabindex="0"`, `role="img"` or button semantics with an `aria-label` describing the mapping) so the interaction is operable without a mouse and conveyed to screen readers.

### Accessibility & motion
- The whole panel has an accessible name (e.g. `aria-label="System map: how Satyam's stack fits together"`); decorative sub-parts are `aria-hidden`.
- `@media (prefers-reduced-motion: reduce)`: no boot animation, no packet motion — the diagram renders fully static in its final state. Hover/focus highlighting still works (it is not motion).
- The diagram conveys no information that isn't also present in text elsewhere on the page (Skills + Projects sections), so it is enhancement, not a content dependency.

### Graceful degradation
- If JS is disabled, the SVG still renders statically (it is inline markup, not JS-generated). Packets simply don't animate; hover highlight (if done via CSS `:hover`/`:focus`) still works, and the caption falls back to a default line.
- If the panel is removed entirely, the hero is unchanged.

---

## 2. Brand mark

Replace the current plain `SB` circle (`.brand-mark`) with a mark that reads as **a node in the same system**:

- A monospace `[sb]` (or `sb`) glyph inside an emerald-outlined **rounded square** (not a circle) that visually rhymes with the diagram nodes.
- Uses `--font-mono`, emerald border (`--accent-border`/`--accent`), transparent or `--surface` fill so it works in both themes.
- Same mark used in the navbar brand; no favicon change required in this spec (favicon stays `favicon.svg`).

---

## 3. Typography sharpening

- **Stat numerals:** the hero-proof big numbers (`6`, `Java · Python · C`, `3.90`) and any other numeric stats use `font-variant-numeric: tabular-nums` and remain in `--font-mono`, so they read as *data readouts*, not marketing copy.
- **Weight hierarchy:** bump heading weight contrast by one notch (headings heavier; body unchanged) and tighten heading `line-height` slightly. No new font files — Instrument Sans + JetBrains Mono only.
- No change to the existing responsive `clamp()` font sizing scale beyond the line-height tweak.

---

## 4. Secondary micro-interaction — nav cursor

The active-section nav indicator becomes a **monospace cursor / sliding underline** that moves to the current section as the user scrolls:

- Reuses the existing scroll-spy logic in `script.js` (the `sectionObserver` that already toggles `.active`).
- Visual: a thin emerald underline or a blinking block cursor adjacent to the active link, animated to slide between links.
- Subtle; reinforces the terminal theme without noise. Disabled motion under `prefers-reduced-motion` (the active state still shows, just without the slide animation).

---

## 5. Out of scope (explicitly unchanged)

- Projects, Experience, Education, Skills, Contact sections — content and layout unchanged.
- All existing copy, including the "what stuck with me" project notes.
- Dark/light theme toggle and the emerald palette (kept as-is).
- No new fonts, icon libraries, frameworks, or build step.
- No new sections; no HTML structural rewrite beyond inserting the system-map panel markup and swapping the brand-mark element.
- Contact form behavior, deployment (GitHub Pages), and meta/SEO tags.

---

## 6. Files touched

- `index.html` — insert system-map panel markup in the hero right column; swap `.brand-mark` content/structure.
- `styles.css` — panel/diagram styling, brand-mark restyle, tabular-nums + weight/line-height tweaks, nav-cursor styles, reduced-motion rules.
- `script.js` — diagram init (boot-in + packet loop kickoff if not handled purely in CSS), node hover/focus → caption wiring, nav-cursor positioning hooked into existing scroll-spy.

No new files required (SVG is inline). If the diagram JS grows beyond ~50 lines, it may be split into a small `system-map.js` included after `script.js`; default is to keep it inline in `script.js`.

---

## 7. Success criteria

1. On load, the hero shows a recognizable, animated system diagram whose nodes map to real projects — readable within a few seconds as "this person builds systems."
2. Hovering/focusing a node reveals its real-work mapping; keyboard and screen-reader operable.
3. `prefers-reduced-motion` users get a clean static diagram with no motion.
4. With JS disabled, the page renders correctly (static diagram, intact hero).
5. No regression to existing sections, theming, responsiveness, or Lighthouse performance/accessibility.
6. Brand mark and stat numerals visibly reinforce the engineered/data identity.
