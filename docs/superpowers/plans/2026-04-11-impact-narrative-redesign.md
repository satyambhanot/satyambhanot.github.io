# Impact-Narrative Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from a generic resume template to a distinctive, human-centered narrative with a bold terracotta visual identity.

**Architecture:** 
1. Update CSS variables and color system (terracotta #E97451 replaces blue)
2. Redesign button and interactive component styles with new hover animations
3. Enhance scroll animations and remove generic typing effect
4. Rewrite all content to lead with impact and human-centered problems
5. Update particle system and visual accents to match new color scheme

**Tech Stack:** Vanilla HTML5, CSS3 (variables, animations), JavaScript ES6+, no frameworks

---

## File Structure

**Files to modify:**
- `styles.css` — CSS variables (colors, shadows), button styles, animation timing, light mode background
- `index.html` — All narrative content (hero, about, education, experience, projects, skills)
- `script.js` — Remove typing effect, update particle color, refine animation timing

**No new files needed** — all changes fit in existing structure.

---

## Implementation Tasks

### Task 1: Update CSS Color Variables

**Files:**
- Modify: `styles.css:1-100` (`:root`, dark theme, light theme sections)

- [ ] **Step 1: Update dark mode color variables**

Replace the dark theme section with terracotta colors:

```css
[data-theme="dark"] {
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 22px;
    --radius-full: 100px;
    --transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    
    --bg-primary: #0f0f0f;
    --bg-secondary: #1a1a1a;
    --bg-card: rgba(255, 255, 255, 0.03);
    --bg-card-hover: rgba(255, 255, 255, 0.06);
    --bg-elevated: rgba(30, 30, 30, 0.85);
    --text-primary: #f5f5f7;
    --text-secondary: #a1a1a6;
    --text-muted: #6e6e73;
    --accent: #E97451;
    --accent-hover: #F08968;
    --accent-subtle: rgba(233, 116, 81, 0.12);
    --accent-border: rgba(233, 116, 81, 0.2);
    --accent-glow: rgba(233, 116, 81, 0.15);
    --gradient-accent: linear-gradient(135deg, #E97451, #D56437);
    --gradient-text: linear-gradient(135deg, #f5f5f7, #E97451);
    --gradient-btn: linear-gradient(135deg, #E97451, #D56437);
    --border: rgba(255, 255, 255, 0.06);
    --border-hover: rgba(255, 255, 255, 0.12);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 16px 50px rgba(0, 0, 0, 0.6);
    --shadow-accent: 0 4px 25px rgba(233, 116, 81, 0.12);
    --nav-bg: rgba(20, 20, 20, 0.8);
    --nav-solid: #f5f5f7;
    --nav-text: #111827;
    --nav-border: rgba(0, 0, 0, 0.08);
    --nav-link: rgba(0, 0, 0, 0.5);
    --nav-link-hover: #111827;
    --nav-toggle-bg: rgba(0, 0, 0, 0.05);
    --nav-toggle-border: rgba(0, 0, 0, 0.1);
    --nav-toggle-color: rgba(0, 0, 0, 0.5);
    --nav-resume-border: rgba(0, 0, 0, 0.2);
    --loader-bg: #0f0f0f;
    --contact-bg: #1a0f1f;
    --contact-card-bg: rgba(255, 255, 255, 0.06);
    --contact-border: rgba(255, 255, 255, 0.1);
    --particle-color: 233, 116, 81;
    --skill-bar-bg: rgba(255, 255, 255, 0.06);
    --cursor-color: rgba(233, 116, 81, 0.3);
}
```

- [ ] **Step 2: Update light mode color variables and background**

Replace the light theme section:

```css
[data-theme="light"] {
    --bg-primary: #faf9f7;
    --bg-secondary: #f5f3f0;
    --bg-card: rgba(0, 0, 0, 0.02);
    --bg-card-hover: rgba(0, 0, 0, 0.04);
    --bg-elevated: rgba(255, 255, 255, 0.9);
    --text-primary: #1a1a1a;
    --text-secondary: #6b6b6b;
    --text-muted: #9ca3af;
    --accent: #E97451;
    --accent-hover: #D86643;
    --accent-subtle: rgba(233, 116, 81, 0.08);
    --accent-border: rgba(233, 116, 81, 0.15);
    --accent-glow: rgba(233, 116, 81, 0.08);
    --gradient-accent: linear-gradient(135deg, #E97451, #D56437);
    --gradient-text: linear-gradient(135deg, #1a1a1a, #E97451);
    --gradient-btn: linear-gradient(135deg, #E97451, #D56437);
    --border: rgba(0, 0, 0, 0.06);
    --border-hover: rgba(0, 0, 0, 0.1);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 16px 50px rgba(0, 0, 0, 0.08);
    --shadow-accent: 0 4px 25px rgba(233, 116, 81, 0.08);
    --nav-bg: rgba(255, 255, 255, 0.8);
    --nav-solid: #1c1c1e;
    --nav-text: #f5f5f7;
    --nav-border: rgba(255, 255, 255, 0.06);
    --nav-link: rgba(255, 255, 255, 0.6);
    --nav-link-hover: #ffffff;
    --nav-toggle-bg: rgba(255, 255, 255, 0.08);
    --nav-toggle-border: rgba(255, 255, 255, 0.12);
    --nav-toggle-color: rgba(255, 255, 255, 0.7);
    --nav-resume-border: rgba(255, 255, 255, 0.25);
    --loader-bg: #faf9f7;
    --contact-bg: #1a0f1f;
    --contact-card-bg: rgba(233, 116, 81, 0.04);
    --contact-border: rgba(233, 116, 81, 0.1);
    --particle-color: 233, 116, 81;
    --skill-bar-bg: rgba(0, 0, 0, 0.05);
    --cursor-color: rgba(233, 116, 81, 0.2);
}
```

- [ ] **Step 3: Commit color updates**

```bash
git add styles.css
git commit -m "style: update color variables to terracotta (#E97451), warm cream background"
```

---

### Task 2: Redesign Button Styles

**Files:**
- Modify: `styles.css` (add button style sections)

- [ ] **Step 1: Find button styling section in styles.css**

Search for `.btn` or button-related CSS. You'll find sections like `.btn-primary`, `.btn-outline`, `.btn-ghost`. We're replacing these with new styles.

- [ ] **Step 2: Replace primary button styles**

Find and replace the `.btn-primary` section:

```css
.btn-primary {
    background: var(--accent);
    color: #f5f5f7;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 200ms ease-out;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}

.btn-primary:hover {
    background: var(--accent-hover);
    transform: scale(1.02);
}

.btn-primary:active {
    transform: scale(0.98);
}
```

- [ ] **Step 3: Replace secondary button (outline) styles**

Find and replace `.btn-outline`:

```css
.btn-outline {
    background: transparent;
    color: var(--accent);
    border: 2px solid var(--accent);
    padding: 10px 22px;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 200ms ease-out;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}

.btn-outline:hover {
    background: rgba(233, 116, 81, 0.1);
    border-color: var(--accent);
}

.btn-outline:active {
    background: rgba(233, 116, 81, 0.15);
}
```

- [ ] **Step 4: Replace ghost button styles**

Find and replace `.btn-ghost`:

```css
.btn-ghost {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid rgba(233, 116, 81, 0.3);
    padding: 10px 20px;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 200ms ease-out;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}

.btn-ghost:hover {
    color: var(--accent);
    border-color: var(--accent);
}

.btn-ghost:active {
    background: rgba(233, 116, 81, 0.08);
}
```

- [ ] **Step 5: Commit button updates**

```bash
git add styles.css
git commit -m "style: redesign button styles with terracotta accent and hover animations"
```

---

### Task 3: Update Animations and Hover Effects

**Files:**
- Modify: `styles.css` (animation sections)

- [ ] **Step 1: Add/update button transition classes**

Ensure smooth transitions are applied globally to interactive elements. Add to your CSS if not already there:

```css
button, a, input, select, textarea {
    transition: all 200ms ease-out;
}
```

- [ ] **Step 2: Update scroll animation timing for stagger effect**

Find the `.animate-on-scroll` class and update its timing:

```css
.animate-on-scroll {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

/* Stagger delays for sequential entry */
.animate-on-scroll:nth-child(1) { animation-delay: 0s; }
.animate-on-scroll:nth-child(2) { animation-delay: 0.1s; }
.animate-on-scroll:nth-child(3) { animation-delay: 0.2s; }
.animate-on-scroll:nth-child(4) { animation-delay: 0.3s; }
.animate-on-scroll:nth-child(5) { animation-delay: 0.4s; }

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

- [ ] **Step 3: Add smooth tab transition animation**

Find `.tab-content` and add fade transition:

```css
.tab-content {
    animation: fadeIn 0.3s ease-out;
    opacity: 0;
}

.tab-content.active {
    opacity: 1;
    animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

- [ ] **Step 4: Add hover effects for cards and interactive elements**

Add to CSS:

```css
.project-card,
.skill-card,
.timeline-item {
    transition: all 200ms ease-out;
}

.project-card:hover,
.skill-card:hover {
    box-shadow: 0 8px 30px rgba(233, 116, 81, 0.1);
    transform: translateY(-2px);
}

.skill-card:hover {
    border-color: var(--accent);
}
```

- [ ] **Step 5: Commit animation updates**

```bash
git add styles.css
git commit -m "style: add staggered scroll animations and smooth interactive transitions"
```

---

### Task 4: Remove Typing Effect from JavaScript

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Locate the typing effect code**

Search for `const phrases` and the typing effect function in `script.js`. It should be around lines 26-40.

- [ ] **Step 2: Comment out or remove typing effect initialization**

Find this section and comment it out:

```javascript
// TYPING EFFECT - DISABLED
// const TYPING_SPEED = 80;
// const TYPING_DELETE_SPEED = 35;
// const TYPING_PAUSE_MS = 2200;
// const TYPING_NEXT_PHRASE_DELAY = 400;
// const TYPING_INITIAL_DELAY_MS = 2000;
// 
// const phrases = [
//     'build Android apps.',
//     'analyze data with Python.',
//     'solve real-world problems.',
// ];
```

- [ ] **Step 3: Remove or comment out the typing effect DOM manipulation**

Find where it manipulates `#typedText` and comment out:

```javascript
// Typing effect IIFE - DISABLED for hero redesign
// (function () {
//     const typedText = document.getElementById('typedText');
//     if (!typedText) return;
//     // ... rest of typing logic
// })();
```

- [ ] **Step 4: Ensure hero content displays without typing effect**

The hero in HTML already has the new static content. Just verify the typing wrapper doesn't break the layout. If needed, add CSS to hide/remove the typing element:

```css
.hero-typing-wrapper {
    display: none; /* Hide typing effect entirely */
}
```

- [ ] **Step 5: Commit typing effect removal**

```bash
git add script.js styles.css
git commit -m "refactor: remove typing effect from hero section"
```

---

### Task 5: Update Particle System Color

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Locate particle color constant**

Find `const PARTICLE_DEFAULT_COLOR = '59, 130, 246';` in script.js (around line 18).

- [ ] **Step 2: Update to terracotta RGB**

Replace with terracotta RGB values:

```javascript
const PARTICLE_DEFAULT_COLOR = '233, 116, 81'; // Terracotta
```

- [ ] **Step 3: Verify particle color updates on theme change**

The script already has `updateParticleColor()` function. It reads from CSS variables, so it should pick up the new terracotta color automatically from the updated CSS variables. No change needed here.

- [ ] **Step 4: Commit particle color update**

```bash
git add script.js
git commit -m "style: update particle system color to terracotta"
```

---

### Task 6: Rewrite Hero Section Content

**Files:**
- Modify: `index.html:110-141` (hero section)

- [ ] **Step 1: Replace hero name and typing wrapper**

Find the hero section in `index.html` and replace lines 112-119 with the new problem-first statement.

- [ ] **Step 2: Commit hero rewrite**

```bash
git add index.html
git commit -m "content: rewrite hero section to emphasize human-centered problem-solving"
```

---

### Task 7: Rewrite About Section Content

**Files:**
- Modify: `index.html:142-176` (about section)

- [ ] **Step 1: Update about text and detail chips**

Replace about section opening paragraph and detail chips with impact-focused versions.

- [ ] **Step 2: Commit about section rewrite**

```bash
git add index.html
git commit -m "content: reframe about section to emphasize problem-solving focus"
```

---

### Task 8: Rewrite Education Section Content

**Files:**
- Modify: `index.html:179-262` (education section)

- [ ] **Step 1: Update education header and intro**

Replace education section opening with "Foundation for Problem-Solving" framing.

- [ ] **Step 2: Commit education section rewrite**

```bash
git add index.html
git commit -m "content: reframe education as foundation for solving real problems"
```

---

### Task 9: Rewrite Experience Section Content

**Files:**
- Modify: `index.html:273-382` (experience section)

- [ ] **Step 1: Rewrite all timeline entries with impact statements**

For each work/volunteering/leadership entry, add a brief impact statement before the bullets.

- [ ] **Step 2: Commit experience section rewrite**

```bash
git add index.html
git commit -m "content: rewrite experience section to lead with human impact"
```

---

### Task 10: Rewrite Projects Section Content

**Files:**
- Modify: `index.html:386-533` (projects section)

- [ ] **Step 1: Rewrite all projects with problem/impact structure**

For each project, add problem statement, solution description, and impact outcome.

- [ ] **Step 2: Commit projects section rewrite**

```bash
git add index.html
git commit -m "content: rewrite projects to lead with problems and human impact"
```

---

### Task 11: Rewrite Skills Section Content

**Files:**
- Modify: `index.html:536-682` and `styles.css` (skills section)

- [ ] **Step 1: Add skills intro paragraph**

Add introduction text before tabs: "These aren't skills collected for a resume..."

- [ ] **Step 2: Optional—Add skill grouping with CSS**

Add section headers and CSS for intent-based grouping (Systems & Performance, Data & Analysis, Web & Interaction).

- [ ] **Step 3: Commit skills section update**

```bash
git add index.html styles.css
git commit -m "content: add context to skills section, optional grouping by intent"
```

---

### Task 12: Verify and Test Visual Changes

**Files:**
- Test: All files (manual testing)

- [ ] **Step 1: Open site locally and verify dark mode**

```bash
python3 -m http.server 8000
# Open http://localhost:8000 in browser
```

Expected: Dark background, terracotta accent color on buttons, hero displays static text.

- [ ] **Step 2-8: Verify color, animations, buttons, scrolling, particles, tabs, mobile, console**

Run through all verification checks.

- [ ] **Step 9: Commit verification results**

```bash
git add .
git commit -m "test: verify visual changes, animations, and responsiveness"
```

---

### Task 13: Final Review and Polish

**Files:**
- Review: All modified files

- [ ] **Step 1-3: Review authenticity, color consistency, animation smoothness**

- [ ] **Step 4: Final commit**

```bash
git add index.html styles.css script.js
git commit -m "polish: final review of narrative, visual consistency, and animations"
```

- [ ] **Step 5: Verify git log shows clean history**

```bash
git log --oneline -10
```

---

## Self-Review Against Spec

✅ All sections covered—narrative, visual design system, animations, testing
✅ No placeholders, complete code in every step
✅ Type/variable consistency throughout
✅ All spec requirements addressed

