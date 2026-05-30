# Hero System Map & Identity Sharpen — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an engineered visual identity to the portfolio — a live "system map" in the hero whose nodes map to real projects — plus a node-style brand mark, tabular stat numerals, and a terminal-style nav cursor, without restructuring any section.

**Architecture:** Pure additive enhancement to the existing static site. The system map is **inline SVG styled to look like an ASCII/box-drawing diagram** (chosen over literal text characters because text doesn't align responsively). Packet motion and boot-in use CSS animations only; node→project mapping and the nav cursor use small additions to the existing IIFE in `script.js`. Everything degrades gracefully with JS off and respects `prefers-reduced-motion`.

**Tech Stack:** HTML5, CSS (custom properties already in place), vanilla JS. Fonts: Instrument Sans + JetBrains Mono (already loaded). No new dependencies, no build step.

---

## Verification approach (read first)

There is no test framework. For every task, verify in a browser:

```bash
cd /Users/satyambhanot/Desktop/satyambhanot.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

Key things to re-check after each visual task:
- Light **and** dark theme (toggle top-right).
- Desktop (>920px) **and** mobile width (DevTools responsive, ~390px).
- Reduced motion: DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce".
- No-JS path (only where called out): DevTools → disable JavaScript, reload.

---

## File Structure

- `index.html` — insert the system-map panel + a `.hero-side` wrapper in the hero right column; change brand-mark text.
- `styles.css` — system-map panel/diagram/animation styles, `.hero-side` grid, brand-mark restyle, tabular numerals, heading weight tweak, nav-cursor styles, reduced-motion rules.
- `script.js` — node hover/focus → caption wiring; nav-cursor element + positioning hooked into the existing scroll-spy.
- `README.md` — one-line feature note.

All system-map JS stays inside the existing IIFE in `script.js` (it is well under 50 lines).

---

## Task 1: Node-style brand mark

**Files:**
- Modify: `index.html:49` (`.brand-mark` text)
- Modify: `styles.css:138-148` (`.brand-mark` rules)

- [ ] **Step 1: Change the brand-mark text from `SB` to `sb`**

In `index.html`, line 49 currently:
```html
            <span class="brand-mark">SB</span>
```
Change to:
```html
            <span class="brand-mark">sb</span>
```

- [ ] **Step 2: Restyle `.brand-mark` into a rounded-square node**

In `styles.css`, replace the entire existing `.brand-mark` block (lines 138-148):
```css
.brand-mark {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    color: #ffffff;
    background: var(--accent);
    border-radius: 50%;
    font-family: var(--font-mono);
    font-size: 0.78rem;
}
```
with:
```css
.brand-mark {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    color: var(--accent-ink);
    background: var(--accent-wash);
    border: 1.5px solid var(--accent-border);
    border-radius: 9px;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.02em;
}
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: navbar shows a small emerald-outlined rounded square reading `sb`. Confirm it looks correct in both light and dark theme (it uses theme variables, so the outline/fill should adapt).

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: node-style brand mark"
```

---

## Task 2: Typography sharpening

**Files:**
- Modify: `styles.css` (heading weights near lines 289-308; `.hero-proof strong` near line 384)

- [ ] **Step 1: Make stat numerals tabular**

In `styles.css`, find the `.hero-proof strong` rule (around line 384-390):
```css
.hero-proof strong {
    margin-bottom: 8px;
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: clamp(1.2rem, 2.4vw, 1.55rem);
    line-height: 1.1;
}
```
Add one declaration so it becomes:
```css
.hero-proof strong {
    margin-bottom: 8px;
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: clamp(1.2rem, 2.4vw, 1.55rem);
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
}
```

- [ ] **Step 2: Increase heading weight contrast**

In `styles.css`, find the `h1 {` rule (around line 289). Add `font-weight: 800;` to `h1` and `h2`, and `font-weight: 700;` to `h3`. After edits:

`h1` block gains `font-weight: 800;`
`h2` block gains `font-weight: 800;`
`h3` block gains `font-weight: 700;`

For example `h1` becomes:
```css
h1 {
    max-width: 780px;
    margin-bottom: 24px;
    font-size: clamp(3.1rem, 6.4vw, 6.2rem);
    line-height: 0.95;
    letter-spacing: 0;
    font-weight: 800;
}
```
Apply the analogous single-line additions to `h2` (800) and `h3` (700).

- [ ] **Step 3: Verify in browser**

Reload. Expected: headings read a touch heavier/more confident; the stat numbers (`3.90`, `6 Projects`) align as fixed-width digits. No layout breakage at mobile width.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "feat: heavier headings and tabular stat numerals"
```

---

## Task 3: System-map panel markup (static SVG, no animation yet)

**Files:**
- Modify: `index.html:98-116` (wrap profile panel in `.hero-side`, add `.sysmap-panel` above it)

- [ ] **Step 1: Wrap the hero right column and insert the system-map panel**

In `index.html`, the hero right column is currently the standalone `<aside class="profile-panel reveal" ...>...</aside>` (lines 98-116). Wrap it in a `.hero-side` container and add the system-map panel above it. Replace the opening of the aside (line 98):
```html
    <aside class="profile-panel reveal" aria-label="Profile summary">
```
with:
```html
    <div class="hero-side">
    <div class="sysmap-panel reveal" aria-label="System map: how Satyam's stack fits together">
        <div class="sysmap-bar" aria-hidden="true">
            <span class="sysmap-title">satyam@portfolio — system.map</span>
            <span class="sysmap-dots"><i></i><i></i><i></i></span>
        </div>
        <div class="sysmap-body">
            <svg class="sysmap-svg" viewBox="0 0 380 210" role="img" aria-label="Architecture diagram: client to api to worker to database, with cache and ML model branches">
                <defs>
                    <marker id="sm-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M0,0 L8,4 L0,8 Z" fill="currentColor"></path>
                    </marker>
                </defs>
                <g class="sysmap-edges">
                    <path class="sm-edge" d="M72,43 L104,43" marker-end="url(#sm-arrow)"></path>
                    <path class="sm-edge" d="M160,43 L196,43" marker-end="url(#sm-arrow)"></path>
                    <path class="sm-edge" d="M264,43 L300,43" marker-end="url(#sm-arrow)"></path>
                    <path class="sm-edge" d="M132,58 L136,132" marker-end="url(#sm-arrow)"></path>
                    <path class="sm-edge" d="M230,58 L236,132" marker-end="url(#sm-arrow)"></path>
                </g>
                <g class="sysmap-packets" aria-hidden="true">
                    <circle class="sm-packet" cx="72" cy="43" r="2.6" style="--dx:32px;--dy:0px;animation-delay:0.8s"></circle>
                    <circle class="sm-packet" cx="160" cy="43" r="2.6" style="--dx:36px;--dy:0px;animation-delay:1.1s"></circle>
                    <circle class="sm-packet" cx="264" cy="43" r="2.6" style="--dx:36px;--dy:0px;animation-delay:1.4s"></circle>
                    <circle class="sm-packet" cx="132" cy="58" r="2.6" style="--dx:4px;--dy:74px;animation-delay:1.0s"></circle>
                    <circle class="sm-packet" cx="230" cy="58" r="2.6" style="--dx:6px;--dy:74px;animation-delay:1.3s"></circle>
                </g>
                <g class="sysmap-nodes">
                    <g class="sm-node" tabindex="0" role="button" aria-label="client — the surfaces people actually use" data-map="client — the surfaces people actually use">
                        <rect x="8" y="28" width="64" height="30" rx="7"></rect>
                        <text x="40" y="47" text-anchor="middle">client</text>
                    </g>
                    <g class="sm-node" tabindex="0" role="button" aria-label="api — Java, FastAPI, Node.js: service and app logic" data-map="api — Java, FastAPI, Node.js: service & app logic">
                        <rect x="104" y="28" width="56" height="30" rx="7"></rect>
                        <text x="132" y="47" text-anchor="middle">api</text>
                    </g>
                    <g class="sm-node" tabindex="0" role="button" aria-label="worker — C threads library and ExFAT shell: systems and concurrency" data-map="worker — C threads library & ExFAT shell: systems + concurrency">
                        <rect x="196" y="28" width="68" height="30" rx="7"></rect>
                        <text x="230" y="47" text-anchor="middle">worker</text>
                    </g>
                    <g class="sm-node" tabindex="0" role="button" aria-label="db — SQL, PostgreSQL, MongoDB: Winnipeg city analysis" data-map="db — SQL, PostgreSQL, MongoDB: Winnipeg city analysis">
                        <rect x="300" y="28" width="52" height="30" rx="7"></rect>
                        <text x="326" y="47" text-anchor="middle">db</text>
                    </g>
                    <g class="sm-node" tabindex="0" role="button" aria-label="cache — reliability and systems thinking: OS, debugging" data-map="cache — reliability & systems thinking (OS, debugging)">
                        <rect x="104" y="132" width="64" height="30" rx="7"></rect>
                        <text x="136" y="151" text-anchor="middle">cache</text>
                    </g>
                    <g class="sm-node" tabindex="0" role="button" aria-label="ml model — scikit-learn and PyTorch: fraud detection, Waldo CNN" data-map="ml·model — scikit-learn / PyTorch: fraud detection, Waldo CNN">
                        <rect x="196" y="132" width="80" height="30" rx="7"></rect>
                        <text x="236" y="151" text-anchor="middle">ml·model</text>
                    </g>
                </g>
            </svg>
            <p class="sysmap-caption" aria-live="polite">hover a node to see what it maps to</p>
        </div>
    </div>
    <aside class="profile-panel reveal" aria-label="Profile summary">
```

- [ ] **Step 2: Close the `.hero-side` wrapper**

The aside currently closes on line 116 with `</aside>`. Immediately after that `</aside>`, add a closing `</div>` for `.hero-side`:
```html
    </aside>
    </div>
```
(The `</section>` that follows the hero stays where it is.)

- [ ] **Step 3: Verify markup renders (unstyled is fine)**

Reload. The SVG is inline so it renders even before CSS. Expected: you see six labeled boxes and connecting lines stacked above the existing portrait card. It will look plain (default black strokes) — styling is Task 4. Confirm the hero is still a two-column layout on desktop and stacks on mobile (the `.hero` grid still has exactly two children: `.hero-copy` and `.hero-side`).

- [ ] **Step 4: Verify no-JS render**

Disable JavaScript, reload. Expected: the diagram still shows (it is static markup). Caption shows the default "hover a node…" text.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add hero system-map SVG markup"
```

---

## Task 4: System-map styling, boot-in, and packet animation

**Files:**
- Modify: `styles.css` (append a new block; add reduced-motion rules)

- [ ] **Step 1: Add the system-map styles**

Append to `styles.css` (before the final `@media (max-width: 640px)` block is fine, or after the `.reveal` rules — anywhere in the main cascade). Add:
```css
.hero-side {
    display: grid;
    gap: 16px;
    align-content: start;
}

.sysmap-panel {
    overflow: hidden;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 18px;
    box-shadow: var(--shadow);
    transition: background-color 300ms ease, border-color 300ms ease;
}

.sysmap-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: var(--profile-card-bg);
    border-bottom: 1px solid var(--line);
}

.sysmap-title {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.02em;
}

.sysmap-dots {
    display: inline-flex;
    gap: 6px;
}

.sysmap-dots i {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--line-strong);
}

.sysmap-body {
    padding: 16px 14px 14px;
}

.sysmap-svg {
    display: block;
    width: 100%;
    height: auto;
    color: var(--line-strong); /* drives marker (currentColor) fill */
}

.sm-edge {
    fill: none;
    stroke: var(--line-strong);
    stroke-width: 1.4;
    stroke-dasharray: 160;
    stroke-dashoffset: 160;
    animation: sm-draw 0.7s ease forwards;
}

.sm-edge:nth-of-type(2) { animation-delay: 0.1s; }
.sm-edge:nth-of-type(3) { animation-delay: 0.2s; }
.sm-edge:nth-of-type(4) { animation-delay: 0.15s; }
.sm-edge:nth-of-type(5) { animation-delay: 0.25s; }

.sm-node {
    cursor: pointer;
    opacity: 0;
    animation: sm-pop 0.5s ease forwards;
    animation-delay: 0.3s;
}

.sm-node:nth-of-type(2) { animation-delay: 0.38s; }
.sm-node:nth-of-type(3) { animation-delay: 0.46s; }
.sm-node:nth-of-type(4) { animation-delay: 0.54s; }
.sm-node:nth-of-type(5) { animation-delay: 0.62s; }
.sm-node:nth-of-type(6) { animation-delay: 0.70s; }

.sm-node rect {
    fill: var(--surface);
    stroke: var(--line-strong);
    stroke-width: 1.4;
    transition: fill 160ms ease, stroke 160ms ease;
}

.sm-node text {
    fill: var(--muted);
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    transition: fill 160ms ease;
}

.sm-node:hover rect,
.sm-node:focus-visible rect,
.sm-node.is-active rect {
    stroke: var(--accent);
    fill: var(--accent-wash);
}

.sm-node:hover text,
.sm-node:focus-visible text,
.sm-node.is-active text {
    fill: var(--accent-ink);
}

.sm-node:focus { outline: none; }

.sm-packet {
    fill: var(--accent);
    opacity: 0;
    animation: sm-flow 2.6s linear infinite;
}

.sysmap-caption {
    margin: 12px 2px 0;
    min-height: 1.5em;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--soft);
}

@keyframes sm-draw {
    to { stroke-dashoffset: 0; }
}

@keyframes sm-pop {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes sm-flow {
    0% { transform: translate(0, 0); opacity: 0; }
    10% { opacity: 1; }
    85% { opacity: 1; }
    100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
}
```

- [ ] **Step 2: Add reduced-motion rules for the system map**

In `styles.css`, find the existing `@media (prefers-reduced-motion: reduce)` block (near the end, lines ~993-1002). Add these rules inside that block (after the existing universal rule):
```css
    .sm-edge {
        stroke-dashoffset: 0;
        animation: none;
    }

    .sm-node {
        opacity: 1;
        transform: none;
        animation: none;
    }

    .sm-packet {
        display: none;
    }
```

- [ ] **Step 3: Verify animation + theming**

Reload. Expected:
- On load, edges draw in, then nodes pop in, then emerald packets begin flowing along the edges in the correct directions (client→api→worker→db, plus api→cache and worker→ml·model).
- Hovering a node turns its box emerald (stroke + wash fill, emerald text).
- Looks correct in light and dark theme. The panel surface, borders, and node fills follow the theme.

- [ ] **Step 4: Verify reduced motion**

Enable "Emulate prefers-reduced-motion: reduce" and reload. Expected: diagram appears fully drawn and static immediately — no draw-in, no node pop, no packets. Hover highlight still works.

- [ ] **Step 5: Verify mobile**

At ~390px width: the `.hero-side` stacks under the hero copy (existing `.hero` rule sets one column ≤920px), the SVG scales to full width and stays legible.

- [ ] **Step 6: Commit**

```bash
git add styles.css
git commit -m "feat: style system map with boot-in and packet flow"
```

---

## Task 5: System-map node → caption interaction (JS)

**Files:**
- Modify: `script.js` (add a block inside the existing IIFE, after the `backToTop` block around line 71, before `if (!siteNav ...) return;`)

> Placement matters: the early `return` on the line `if (!siteNav || !navLinks.length) return;` (line 73) would skip any code placed after it on a page with no nav. Put this block **before** that return.

- [ ] **Step 1: Add the caption-wiring code**

In `script.js`, immediately after the `backToTop` `if` block (the one ending around line 71) and before line 73 (`if (!siteNav || !navLinks.length) return;`), insert:
```javascript
    const sysmap = document.querySelector('.sysmap-panel');
    if (sysmap) {
        const caption = sysmap.querySelector('.sysmap-caption');
        const defaultCaption = caption ? caption.textContent : '';
        const sysNodes = Array.from(sysmap.querySelectorAll('.sm-node'));

        sysNodes.forEach((node) => {
            const mapText = node.getAttribute('data-map') || defaultCaption;

            const show = () => {
                if (caption) caption.textContent = mapText;
                sysNodes.forEach((n) => n.classList.remove('is-active'));
                node.classList.add('is-active');
            };

            const clear = () => {
                if (caption) caption.textContent = defaultCaption;
                node.classList.remove('is-active');
            };

            node.addEventListener('mouseenter', show);
            node.addEventListener('mouseleave', clear);
            node.addEventListener('focus', show);
            node.addEventListener('blur', clear);
            node.addEventListener('click', show);
            node.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    show();
                }
            });
        });
    }
```

- [ ] **Step 2: Verify hover, focus, and keyboard**

Reload. Expected:
- Hovering a node sets the caption text to that node's mapping (e.g. hovering `worker` shows "worker — C threads library & ExFAT shell: systems + concurrency").
- Tabbing to a node (keyboard) highlights it and updates the caption; pressing Enter/Space keeps it shown.
- Moving away restores the default "hover a node to see what it maps to".

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: system-map node hover/focus reveals project mapping"
```

---

## Task 6: Terminal-style nav cursor (CSS + JS)

**Files:**
- Modify: `styles.css` (`.site-nav` gets `position: relative`; add `.nav-cursor`)
- Modify: `script.js` (create cursor element; reposition inside `setActiveLink` and on resize/load)

- [ ] **Step 1: Add nav-cursor styles**

In `styles.css`, find the `.site-nav` rule (around line 150-154):
```css
.site-nav {
    display: flex;
    align-items: center;
    gap: 4px;
}
```
Add `position: relative;`:
```css
.site-nav {
    display: flex;
    align-items: center;
    gap: 4px;
    position: relative;
}
```
Then add a new rule (anywhere after it in the main cascade):
```css
.nav-cursor {
    position: absolute;
    bottom: 2px;
    left: 0;
    height: 2px;
    width: 0;
    background: var(--accent);
    border-radius: 2px;
    opacity: 0;
    pointer-events: none;
    transition: transform 220ms ease, width 220ms ease, opacity 160ms ease;
}
```
And inside the existing `@media (max-width: 920px)` block (around line 848), add:
```css
    .nav-cursor {
        display: none;
    }
```
And inside the existing `@media (prefers-reduced-motion: reduce)` block, add:
```css
    .nav-cursor {
        transition: none;
    }
```

- [ ] **Step 2: Create and position the cursor in JS**

In `script.js`, the existing `setActiveLink` function is defined around lines 83-87:
```javascript
    function setActiveLink(sectionId) {
        sectionLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    }
```
Replace it with a version that also moves the cursor, and create the cursor element just before it:
```javascript
    const navCursor = document.createElement('span');
    navCursor.className = 'nav-cursor';
    navCursor.setAttribute('aria-hidden', 'true');
    siteNav.appendChild(navCursor);

    function moveNavCursor() {
        const active = siteNav.querySelector('a.active');
        if (window.innerWidth <= 920 || !active) {
            navCursor.style.opacity = '0';
            return;
        }
        navCursor.style.opacity = '1';
        navCursor.style.width = `${active.offsetWidth}px`;
        navCursor.style.transform = `translateX(${active.offsetLeft}px)`;
    }

    function setActiveLink(sectionId) {
        sectionLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
        moveNavCursor();
    }
```

> Note: `siteNav` and `setActiveLink` are referenced after the `if (!siteNav || !navLinks.length) return;` guard, so the cursor creation and function definition must go in the same region (they already are — `setActiveLink` lives after that guard). Keep the `navCursor` creation lines directly above the `moveNavCursor`/`setActiveLink` definitions.

- [ ] **Step 3: Reposition the cursor on resize**

In `script.js`, the existing resize listener is around lines 123-127:
```javascript
    window.addEventListener('resize', () => {
        if (window.innerWidth > 920) {
            closeNav();
        }
    });
```
Add a `moveNavCursor()` call:
```javascript
    window.addEventListener('resize', () => {
        if (window.innerWidth > 920) {
            closeNav();
        }
        moveNavCursor();
    });
```

- [ ] **Step 4: Position the cursor on initial load**

The file already calls `setActiveLink(...)` near lines 129-133 for the initial active state — since `setActiveLink` now calls `moveNavCursor`, the initial position is handled. Add a safety call after fonts/layout settle by appending at the very end of the IIFE, just before the final `})();`:
```javascript
    window.addEventListener('load', moveNavCursor);
```

- [ ] **Step 5: Verify**

Reload on desktop. Expected:
- A thin emerald underline sits under the active nav link.
- Scrolling between sections slides the underline to the new active link.
- Resizing the window keeps it aligned; below 920px it disappears (mobile dropdown nav has no cursor).
- Under reduced motion the underline still appears under the active link but snaps instead of sliding.

- [ ] **Step 6: Commit**

```bash
git add styles.css script.js
git commit -m "feat: terminal-style sliding nav cursor"
```

---

## Task 7: Final pass — README note + full regression check

**Files:**
- Modify: `README.md` (Features list, around lines 14-20)

- [ ] **Step 1: Add a README feature line**

In `README.md`, in the `## Features` list, add a bullet:
```markdown
- Animated hero "system map" diagram whose nodes map to real projects
```

- [ ] **Step 2: Full regression sweep**

With the server running, confirm none of the existing behavior regressed:
- Theme toggle still works and persists across reload.
- Mobile nav (hamburger) opens/closes; Escape and outside-click close it.
- Scroll-reveal animations still fire on all sections.
- All sections (About, Projects, Experience, Education, Skills, Contact) render unchanged.
- Contact form still opens a prefilled mail draft on submit.
- Back-to-top link still smooth-scrolls.

- [ ] **Step 3: Lighthouse spot check (optional but recommended)**

In Chrome DevTools → Lighthouse, run Accessibility + Performance on the page. Expected: no new accessibility violations introduced by the SVG (nodes have `aria-label`s; decorative parts are `aria-hidden`). Performance should be essentially unchanged (no new network requests).

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: note system-map feature in README"
```

---

## Self-Review (completed during planning)

**Spec coverage:**
- Signature system-map panel, placement, node mapping → Tasks 3, 4, 5 ✓
- Inline-SVG-not-ASCII decision → Task 3 ✓
- Boot-in + packet flow → Task 4 ✓
- Hover/focus/keyboard interaction + caption → Task 5 ✓
- Reduced-motion static fallback → Task 4 ✓
- No-JS graceful render → Task 3 ✓
- Node-style brand mark → Task 1 ✓
- Tabular numerals + weight/line-height → Task 2 ✓
- Nav cursor secondary interaction → Task 6 ✓
- Out-of-scope sections untouched; README note → Task 7 ✓

**Placeholder scan:** No TBD/TODO; all code is concrete and copy-pasteable.

**Consistency check:** Class names (`sysmap-panel`, `sm-edge`, `sm-node`, `sm-packet`, `sysmap-caption`, `nav-cursor`), the `data-map` attribute, and the `moveNavCursor`/`setActiveLink` function names match across HTML, CSS, and JS tasks. Packet `--dx/--dy` values match their edge geometry. The `.hero` grid keeps exactly two children after wrapping in `.hero-side`.
