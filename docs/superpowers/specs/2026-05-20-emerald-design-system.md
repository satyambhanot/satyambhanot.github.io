# Emerald Design System & UI Polish — Design Spec
**Date:** 2026-05-20
**Author:** Satyam Bhanot

---

## Goal

Replace the generic blue (`#2563eb`) color system with a distinctive emerald (`#10b981`) palette across both light and dark themes. Apply six targeted UI improvements that were missed during the initial redesign. The result should feel premium, memorable, and consistent across both themes.

**Stack:** CSS custom properties only — no new HTML structure needed except the LinkedIn button and about heading text change.

---

## 1. CSS Color Variables

### Light Mode (`:root`)

| Variable | Current | New | Purpose |
|---|---|---|---|
| `--bg` | `#f6f8fb` | `#fafafa` | Page background (Soft Alabaster) |
| `--ink` | `#111827` | `#18181b` | Primary text (Ink Black) |
| `--muted` | `#5f6b7a` | `#52525b` | Secondary text (Muted Gray) |
| `--soft` | `#94a3b8` | `#a1a1aa` | Tertiary text (Zinc-400) |
| `--line` | `rgba(17,24,39,0.1)` | `rgba(24,24,27,0.1)` | Border tint adjusted for new ink |
| `--line-strong` | `rgba(17,24,39,0.16)` | `rgba(24,24,27,0.16)` | Stronger border tint |
| `--accent` | `#2563eb` | `#10b981` | Primary accent (Emerald-500) |
| `--accent-ink` | `#1d4ed8` | `#047857` | Accent text color (Emerald-700) |
| `--accent-soft` | `#dbeafe` | `#d1fae5` | Accent fill (Emerald-100) |
| `--rust` | `#d97706` | `#f97316` | Data domain accent (Orange-500) |
| `--blue` | `#0891b2` | `#6366f1` | Tools domain accent (Indigo-500) |
| `--nav-bg` | `rgba(255,255,255,0.86)` | `rgba(250,250,250,0.88)` | Navbar glass |
| `--profile-card-bg` | `#f8fafc` | `#f4f4f5` | Profile card background (Zinc-100) |
| `--contact-end` | `#1e3a8a` | `#064e3b` | Contact gradient end (Emerald-900) |
| `--accent-wash` | `rgba(37,99,235,0.1)` | `rgba(16,185,129,0.1)` | Button/nav hover wash |
| `--accent-border` | `rgba(37,99,235,0.2)` | `rgba(16,185,129,0.2)` | Button/chip border |
| `--chip-bg` | `rgba(219,234,254,0.7)` | `rgba(209,250,229,0.65)` | Tech chip fill (emerald-tinted) |
| `--slate` | *(new)* | `#64748b` | Systems domain border (Slate-500) |

### Dark Mode (`:root[data-theme="dark"]`)

| Variable | Current | New | Purpose |
|---|---|---|---|
| `--surface` | `#111827` | `#1e293b` | Card/nav background (true Slate Gray) |
| `--soft` | `#94a3b8` | `#64748b` | Tertiary text, darker in dark mode |
| `--line` | `rgba(226,232,240,0.13)` | `rgba(148,163,184,0.15)` | Border tint |
| `--line-strong` | `rgba(226,232,240,0.22)` | `rgba(148,163,184,0.25)` | Stronger border tint |
| `--accent` | `#60a5fa` | `#10b981` | Same emerald — the brand bridge |
| `--accent-ink` | `#bfdbfe` | `#6ee7b7` | Emerald-300 for text on dark |
| `--accent-soft` | `rgba(96,165,250,0.18)` | `rgba(16,185,129,0.18)` | Emerald wash |
| `--rust` | `#fbbf24` | `#fb923c` | Orange-400 |
| `--blue` | `#22d3ee` | `#818cf8` | Indigo-400 |
| `--nav-bg` | `rgba(17,24,39,0.88)` | `rgba(15,23,42,0.9)` | Navbar glass |
| `--contact-end` | `#1d4ed8` | `#064e3b` | Same Emerald-900 as light mode |
| `--button-primary-text` | `#07111f` | `#ffffff` | White text on emerald button |
| `--accent-wash` | `rgba(96,165,250,0.16)` | `rgba(16,185,129,0.15)` | Emerald wash |
| `--accent-border` | `rgba(96,165,250,0.28)` | `rgba(16,185,129,0.28)` | Emerald border |
| `--chip-bg` | `rgba(96,165,250,0.12)` | `rgba(16,185,129,0.12)` | Emerald chip fill |
| `--slate` | *(new)* | `#94a3b8` | Systems domain border (Slate-400) |

**Key principle:** `--accent` is `#10b981` in BOTH modes. The bridge color does not shift. Only the surrounding tones change.

---

## 2. Bento Large Card Gradient

**Current:** `linear-gradient(135deg, #111827, #1e3a8a)` (slate-to-blue)

**New:** `linear-gradient(135deg, #111827, #064e3b)` (slate-to-dark-emerald)

This is a hardcoded gradient that does not use CSS variables. Update it directly in `.bento-large`.

---

## 3. Theme Transition Animation

Add to `body`:
```css
transition: background-color 300ms ease, color 300ms ease;
```

Add to `.site-header`, `.bento-card`, `.project-card`, `.timeline-item`, `.education-panel`, `.skills-panel`, `.skill-domain`, `.profile-panel`, `.profile-card`:
```css
transition-property: background-color, border-color, color;
transition-duration: 300ms;
transition-timing-function: ease;
```

**Important:** These transitions must not interfere with existing hover/reveal transitions on the same elements. For elements that already have a `transition` rule (e.g., `.project-card`, `.skill-domain`), append the theme-transition properties rather than replacing.

For `.project-card`, current transition is:
```css
transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
```
Extend to:
```css
transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 300ms ease, color 300ms ease;
```

For `.skill-domain`, current transition is:
```css
transition: transform 160ms ease, box-shadow 160ms ease;
```
Extend to:
```css
transition: transform 160ms ease, box-shadow 160ms ease, background-color 300ms ease, border-color 300ms ease;
```

---

## 4. Sun/Moon Toggle Icon

**Current light mode (moon):** CSS crescent using `box-shadow: inset -6px -4px 0 var(--surface)`. Keep this — it reads clearly as a moon.

**Current dark mode (sun):** Just a yellow circle with a glow. Not recognizable as a sun.

**New dark mode (sun):** Yellow circle + 4 cardinal ray box-shadows:
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

The four cardinal rays make it read as a sun at 18px without needing SVG.

---

## 5. Systems Skill Domain Border Fix

**Problem:** `.skill-domain--systems { border-left-color: var(--ink) }`. In dark mode `--ink` is `#f8fafc` (white) — a white border on a dark card looks unintentional.

**Fix:** Replace with `var(--slate)`.

```css
.skill-domain--systems { border-left-color: var(--slate); }
```

`--slate` is `#64748b` in light mode and `#94a3b8` in dark mode — a readable mid-tone in both themes.

---

## 6. Education + Skills Side-by-Side Layout

`.education-skills` currently has `grid-template-columns: 1fr` (fully stacked). Restore side-by-side:

```css
.education-skills {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    align-items: start;
}
```

At `max-width: 920px`, keep the existing responsive rule that collapses it to `1fr`.

---

## 7. About Section Heading Fix

**Current:** `<h2 id="snapshot-title">The through-line is useful problem solving.</h2>` — generic, not updated to match the backend/ML repositioning.

**New:** `<h2 id="snapshot-title">The through-line is understanding how systems actually behave.</h2>`

---

## 8. LinkedIn in Contact Section

Add LinkedIn button to the contact actions alongside the existing GitHub button.

**HTML addition** — add after the GitHub button in the contact actions:
```html
<a class="button button-secondary" href="https://linkedin.com/in/satyam-bhanot" target="_blank" rel="noopener noreferrer">LinkedIn</a>
```

---

## 9. Focus Outline Update

Current: `outline: 3px solid rgba(37, 99, 235, 0.35)` (blue)
New: `outline: 3px solid rgba(16, 185, 129, 0.35)` (emerald)

Applies to `a:focus-visible, button:focus-visible`.

---

## Out of Scope

- New fonts or icon libraries
- Any new sections or page structure
- Dark mode as the default (light remains default)
- Animations beyond the theme transition and existing reveal/hover patterns
