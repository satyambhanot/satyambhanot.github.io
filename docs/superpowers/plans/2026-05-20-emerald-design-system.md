# Emerald Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blue (`#2563eb`) accent with emerald (`#10b981`) across light and dark themes, fix the sun icon, systems domain border, focus outline, bento gradient, and about heading.

**Architecture:** All changes are in `styles.css` (CSS custom properties + targeted rule edits) and one text change in `index.html`. No JS changes, no new HTML structure. Tasks are ordered so each commit leaves the site in a working state — color variables first, then targeted fixes.

**Tech Stack:** Vanilla CSS, HTML. No build step — test by opening `index.html` in a browser (`open index.html` on macOS or `python3 -m http.server 8000` + `http://localhost:8000`).

---

## File Map

- **Modify:** `styles.css` — all CSS changes
- **Modify:** `index.html:134` — about heading text only

---

### Task 1: Light-mode CSS variable swap

**Files:**
- Modify: `styles.css:1-30` (the `:root { }` block)

- [ ] **Step 1: Replace the `:root` variable block**

Find the `:root {` block (lines 1–30). Replace the entire block with:

```css
:root {
    --bg: #fafafa;
    --surface: #ffffff;
    --surface-strong: #ffffff;
    --ink: #18181b;
    --muted: #52525b;
    --soft: #a1a1aa;
    --line: rgba(24, 24, 27, 0.1);
    --line-strong: rgba(24, 24, 27, 0.16);
    --accent: #10b981;
    --accent-ink: #047857;
    --accent-soft: #d1fae5;
    --rust: #f97316;
    --blue: #6366f1;
    --slate: #64748b;
    --yellow: #f59e0b;
    --shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
    --page-start: #ffffff;
    --nav-bg: rgba(250, 250, 250, 0.88);
    --profile-card-bg: #f4f4f5;
    --contact-start: #0f172a;
    --contact-end: #064e3b;
    --button-primary-text: #ffffff;
    --accent-wash: rgba(16, 185, 129, 0.1);
    --accent-border: rgba(16, 185, 129, 0.2);
    --chip-bg: rgba(209, 250, 229, 0.65);
    --radius: 12px;
    --max: 1180px;
    --font-body: "Instrument Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
```

- [ ] **Step 2: Verify visually in light mode**

Open `index.html` in a browser. Confirm:
- Nav bar accent/hover is green, not blue
- Hero "View Projects" button is green
- Skill chip borders are green-tinted, not blue
- The bento grid large card still has a dark gradient (not affected yet — handled in Task 3)
- No broken styles or missing colors

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: swap light-mode CSS variables to emerald palette"
```

---

### Task 2: Dark-mode CSS variable swap

**Files:**
- Modify: `styles.css:32-57` (the `:root[data-theme="dark"] { }` block)

- [ ] **Step 1: Replace the dark-mode variable block**

Find the `:root[data-theme="dark"] {` block (lines 32–57). Replace the entire block with:

```css
:root[data-theme="dark"] {
    --bg: #0f172a;
    --surface: #1e293b;
    --surface-strong: #f8fafc;
    --ink: #f8fafc;
    --muted: #cbd5e1;
    --soft: #64748b;
    --line: rgba(148, 163, 184, 0.15);
    --line-strong: rgba(148, 163, 184, 0.25);
    --accent: #10b981;
    --accent-ink: #6ee7b7;
    --accent-soft: rgba(16, 185, 129, 0.18);
    --rust: #fb923c;
    --blue: #818cf8;
    --slate: #94a3b8;
    --yellow: #fbbf24;
    --shadow: 0 18px 52px rgba(0, 0, 0, 0.34);
    --page-start: #111827;
    --nav-bg: rgba(15, 23, 42, 0.9);
    --profile-card-bg: #0f172a;
    --contact-start: #020617;
    --contact-end: #064e3b;
    --button-primary-text: #ffffff;
    --accent-wash: rgba(16, 185, 129, 0.15);
    --accent-border: rgba(16, 185, 129, 0.28);
    --chip-bg: rgba(16, 185, 129, 0.12);
}
```

- [ ] **Step 2: Verify visually in dark mode**

Toggle to dark mode using the theme button. Confirm:
- Cards have a slate-blue surface (`#1e293b`), not pure black
- Accent highlights are emerald green, not blue
- Skill chips have a subtle green tint
- No text is invisible against its background

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: swap dark-mode CSS variables to emerald palette"
```

---

### Task 3: Bento gradient, systems border, focus outline

Three targeted one-line changes. Make all three, verify, commit together.

**Files:**
- Modify: `styles.css:503` — bento gradient
- Modify: `styles.css:692` — systems domain border
- Modify: `styles.css:104` — focus outline color

- [ ] **Step 1: Update the bento-large gradient**

Find `.bento-large` (around line 496). Change the hardcoded `background` value:

Old:
```css
background: linear-gradient(135deg, #111827, #1e3a8a);
```
New:
```css
background: linear-gradient(135deg, #111827, #064e3b);
```

- [ ] **Step 2: Fix the systems skill domain border**

Find `.skill-domain--systems` (around line 692). Change:

Old:
```css
.skill-domain--systems { border-left-color: var(--ink); }
```
New:
```css
.skill-domain--systems { border-left-color: var(--slate); }
```

- [ ] **Step 3: Update the focus outline color**

Find `a:focus-visible, button:focus-visible` (around line 102). Change:

Old:
```css
outline: 3px solid rgba(37, 99, 235, 0.35);
```
New:
```css
outline: 3px solid rgba(16, 185, 129, 0.35);
```

- [ ] **Step 4: Verify all three**

In a browser:
- Scroll to the About bento grid — the large dark card should fade from near-black to dark emerald, not dark blue
- Navigate to the Skills section and switch to dark mode — the "Systems" domain card should have a mid-gray left border, not a white one
- Tab through links using keyboard — focus ring should be emerald/green, not blue

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "fix: emerald bento gradient, slate systems border, emerald focus outline"
```

---

### Task 4: Theme transition animations

Add 300ms ease transitions for background/border/color so dark/light toggle animates smoothly. Must extend (not replace) existing hover transitions on `.project-card` and `.skill-domain`.

**Files:**
- Modify: `styles.css:68` — `body`
- Modify: `styles.css:479-489` — shared card rule block
- Modify: `styles.css:108` — `.site-header`
- Modify: `styles.css:388` — `.profile-panel`
- Modify: `styles.css:416` — `.profile-card`
- Modify: `styles.css:536` — `.project-card` (extend existing transition)
- Modify: `styles.css:683` — `.skill-domain` (extend existing transition)

- [ ] **Step 1: Add transition to `body`**

Find the `body {` rule (around line 68). Add `transition` inside it:

```css
body {
    margin: 0;
    font-family: var(--font-body);
    color: var(--ink);
    background:
        linear-gradient(180deg, var(--page-start) 0, var(--bg) 680px),
        var(--bg);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    transition: background-color 300ms ease, color 300ms ease;
}
```

- [ ] **Step 2: Add transition to the shared card rule**

Find the grouped selector block at lines 479–489 (`.bento-card, .project-card, .timeline-item, .education-panel, .skills-panel, .contact-inner`). Add a `transition` property at the end of the block:

```css
.bento-card,
.project-card,
.timeline-item,
.education-panel,
.skills-panel,
.contact-inner {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    box-shadow: 0 14px 38px rgba(16, 24, 40, 0.06);
    transition: background-color 300ms ease, border-color 300ms ease;
}
```

- [ ] **Step 3: Add transition to `.site-header`**

Find `.site-header {` (around line 108). Add `transition: background-color 300ms ease, border-color 300ms ease;` inside the rule. Do not touch or remove any existing properties.

- [ ] **Step 4: Add transition to `.profile-panel` and `.profile-card`**

Find `.profile-panel {` (around line 388). Add `transition: background-color 300ms ease, border-color 300ms ease;` inside the rule.

Find `.profile-card {` (around line 416). Add `transition: background-color 300ms ease, border-color 300ms ease;` inside the rule.

- [ ] **Step 5: Extend `.project-card` transition (do not replace)**

Find `.project-card` transition (around line 536). Current value:
```css
transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
```

Replace with (appends theme properties to existing hover properties):
```css
transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 300ms ease, color 300ms ease;
```

- [ ] **Step 6: Extend `.skill-domain` transition (do not replace)**

Find `.skill-domain` transition (around line 683). Current value:
```css
transition: transform 160ms ease, box-shadow 160ms ease;
```

Replace with:
```css
transition: transform 160ms ease, box-shadow 160ms ease, background-color 300ms ease, border-color 300ms ease;
```

- [ ] **Step 7: Verify theme transition**

Toggle dark/light mode in the browser. The background, card surfaces, and nav should smoothly animate over ~300ms instead of snapping. Hover animations on project cards and skill domains should still feel quick (160-180ms) — the theme transition must not slow down hover effects.

- [ ] **Step 8: Commit**

```bash
git add styles.css
git commit -m "feat: smooth 300ms theme transition on body, cards, nav, and panels"
```

---

### Task 5: Sun icon — cardinal rays

Replace the plain yellow glow with a yellow circle + 4 cardinal box-shadow rays so the icon reads as a sun.

**Files:**
- Modify: `styles.css:222-225` — `:root[data-theme="dark"] .theme-toggle-icon`

- [ ] **Step 1: Replace the dark-mode sun icon rule**

Find `:root[data-theme="dark"] .theme-toggle-icon {` (around line 222). Current:
```css
:root[data-theme="dark"] .theme-toggle-icon {
    background: var(--yellow);
    box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.18);
}
```

Replace with:
```css
:root[data-theme="dark"] .theme-toggle-icon {
    background: var(--yellow);
    box-shadow:
        0 0 0 3px rgba(245, 158, 11, 0.2),
        0 -8px 0 0 var(--yellow),
        0 8px 0 0 var(--yellow),
        8px 0 0 0 var(--yellow),
        -8px 0 0 0 var(--yellow);
    border-radius: 50%;
}
```

- [ ] **Step 2: Verify the sun icon**

Switch to dark mode. The theme toggle should show a yellow circle with 4 small dots (rays) extending up, down, left, and right — clearly readable as a sun at 18px. Switch back to light mode and confirm the moon crescent is unchanged.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "fix: sun icon — add cardinal rays for recognizable sun at 18px"
```

---

### Task 6: About section heading text

One text node change in `index.html`.

**Files:**
- Modify: `index.html:134`

- [ ] **Step 1: Update the about heading**

Find line 134 in `index.html`:
```html
<h2 id="snapshot-title">The through-line is useful problem solving.</h2>
```

Replace with:
```html
<h2 id="snapshot-title">The through-line is understanding how systems actually behave.</h2>
```

- [ ] **Step 2: Verify**

Open the site and scroll to the About section. The large heading inside the bento grid should now read "The through-line is understanding how systems actually behave."

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "copy: update about heading to match backend/systems positioning"
```

---

## Spec Coverage Checklist

| Spec section | Task |
|---|---|
| 1. Light-mode CSS variables | Task 1 |
| 1. Dark-mode CSS variables | Task 2 |
| 2. Bento large gradient | Task 3 |
| 3. Theme transition animation | Task 4 |
| 4. Sun icon | Task 5 |
| 5. Systems border fix (var(--slate)) | Task 3 |
| 6. Education + Skills layout | No action — already stacked, no change needed |
| 7. About heading | Task 6 |
| 8. LinkedIn | Already implemented — no action |
| 9. Focus outline | Task 3 |
