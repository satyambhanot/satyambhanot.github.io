# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `satyambhanot.github.io` to target backend SWE and data/ML recruiters — adding 3 new projects, a Resume CTA, visual skill domain cards, and a rewritten hero.

**Architecture:** Single-page static site. All changes are in `index.html` and `styles.css`. One `script.js` verification step only (no changes to JS). No build tools, no framework, no new dependencies.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS

---

## File Map

| File | What changes |
|---|---|
| `index.html` | Hero, projects (6 cards), skills (domain cards), education, about, experience, contact |
| `styles.css` | Reveal animation fix, project grid layout, project visual CSS removal, skill domain cards, achievement-list border flip, resume button, mobile breakpoints |
| `script.js` | Read-only verification only — no changes |

---

## Task 1: Fix Reveal Animation CSS

**Files:**
- Modify: `styles.css:814–823`

The `.reveal` class currently has `opacity: 1; transform: translateY(0)` as its initial state — identical to `.is-visible`. The scroll animation is a no-op. This task fixes it before any visual content is added.

- [ ] **Step 1: Verify the broken state**

Open `styles.css` lines 814–823. You'll see:
```css
.reveal {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 520ms ease, transform 520ms ease;
}

.reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
}
```

- [ ] **Step 2: Fix the initial state**

Replace those lines with:
```css
.reveal {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 520ms ease, transform 520ms ease;
}

.reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
}
```

- [ ] **Step 3: Verify the JS safeguard is intact**

Open `script.js`. Confirm line 14 reads exactly:
```js
revealItems.forEach((item) => item.classList.add('is-visible'));
```
This runs immediately on page load before the IntersectionObserver, ensuring items are visible if the observer is unavailable. Do not remove or move it.

- [ ] **Step 4: Verify in browser**

Open `index.html` in a browser. Scroll below the fold. Sections should fade and rise into view as they enter the viewport. Hero elements (already in the viewport) should be immediately visible because the JS safeguard adds `is-visible` to all items on load.

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "fix: restore reveal animation initial state"
```

---

## Task 2: Add Resume Button to Navbar

**Files:**
- Modify: `index.html:56–63` (the `<nav>` element)
- Modify: `styles.css` (add `.btn-resume` rules)

- [ ] **Step 1: Add the resume link to the nav HTML**

In `index.html`, replace the `<nav class="site-nav" ...>` block (lines 56–63) with:
```html
<nav class="site-nav" id="siteNav" aria-label="Primary navigation">
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="#experience">Experience</a>
    <a href="#education">Education</a>
    <a href="#skills">Skills</a>
    <a href="#contact">Contact</a>
    <a class="btn-resume" href="resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
</nav>
```

- [ ] **Step 2: Add desktop CSS for the resume button**

In `styles.css`, add after the `.site-nav a:hover, .site-nav a.active` block (after line ~128):
```css
.site-nav .btn-resume {
    display: inline-flex;
    align-items: center;
    height: 34px;
    padding: 0 14px;
    margin-left: 6px;
    color: var(--accent-ink);
    background: rgba(15, 118, 110, 0.1);
    border: 1px solid rgba(15, 118, 110, 0.22);
    border-radius: 999px;
    font-size: 0.88rem;
    font-weight: 700;
    transition: background 160ms ease;
}

.site-nav .btn-resume:hover {
    background: rgba(15, 118, 110, 0.18);
    color: var(--accent-ink);
}
```

- [ ] **Step 3: Add mobile override**

In `styles.css`, inside the `@media (max-width: 920px)` block, add after the `.site-nav a { padding: 14px; }` rule:
```css
.site-nav .btn-resume {
    margin-left: 0;
    height: auto;
    padding: 14px;
    border-radius: 6px;
    text-align: center;
    justify-content: center;
}
```

- [ ] **Step 4: Verify in browser**

Open `index.html`. Desktop (> 920px): Resume pill appears to the right of the nav links. Mobile (< 920px): open the hamburger menu — Resume appears as the last item in the dropdown. The link will 404 until `resume.pdf` is added to the repo root — that is expected.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add Resume button to navbar"
```

---

## Task 3: Rewrite Hero Section

**Files:**
- Modify: `index.html:67–111` (entire hero section)

No CSS changes needed — existing hero CSS handles the new content correctly.

- [ ] **Step 1: Replace the entire hero section**

In `index.html`, replace the `<section class="hero section-pad" id="hero">` block (lines 67–111) with:
```html
<section class="hero section-pad" id="hero">
    <div class="hero-copy reveal">
        <p class="eyebrow">Satyam Bhanot · Computer Science Honours</p>
        <h1>Backend developer and data/ML builder.</h1>
        <p class="hero-text">CS Honours graduate from the University of Manitoba with a Math and Statistics minor. I build backend systems, data pipelines, and ML experiments — and debug them until they hold up.</p>
        <div class="hero-actions">
            <a class="button button-primary" href="#projects">View Projects</a>
            <a class="button button-secondary" href="resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
            <a class="button button-quiet" href="https://github.com/satyambhanot" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div class="hero-proof" aria-label="Profile highlights">
            <div>
                <strong>6 Projects</strong>
                <span>systems, backend, data, ML</span>
            </div>
            <div>
                <strong>Java · Python · C</strong>
                <span>primary languages</span>
            </div>
            <div>
                <strong>3.90 GPA</strong>
                <span>Dean's Honour List, Fall 2024</span>
            </div>
        </div>
    </div>
    <aside class="profile-panel reveal" aria-label="Profile summary">
        <div class="portrait-wrap">
            <img src="my-photo.jpg" alt="Portrait of Satyam Bhanot">
        </div>
        <div class="signal-card" aria-hidden="true">
            <span>debug</span>
            <span>document</span>
            <span>teach</span>
        </div>
        <div class="profile-card">
            <p class="mono-label">Currently</p>
            <ul>
                <li><span>Graduated</span> CS Honours, April 2026</li>
                <li><span>Working</span> Tech support at Rogers</li>
                <li><span>Open to</span> Backend SWE and data/ML roles</li>
                <li><span>Focused</span> Systems, databases, ML, reliability</li>
            </ul>
        </div>
    </aside>
</section>
```

- [ ] **Step 2: Verify in browser**

Open `index.html`. Check:
- Headline reads "Backend developer and data/ML builder."
- Three CTA buttons present: View Projects (teal), Download Resume (teal outline), GitHub (white/quiet)
- Stat cards show: "6 Projects / systems, backend, data, ML", "Java · Python · C / primary languages", "3.90 GPA / Dean's Honour List, Fall 2024"
- Profile panel "Currently" list shows "Graduated · CS Honours, April 2026" as first item

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: rewrite hero with backend/ML positioning and resume CTA"
```

---

## Task 4: Replace Project Section with 6-Card 2-Column Grid

**Files:**
- Modify: `index.html:142–220` (entire projects section)
- Modify: `styles.css` (project-stack grid, project-card flex, remove 14 visual CSS blocks, add project-course + github-more, update responsive rules)

The decorative project visuals (terminal window, thread rows, memory grid, phone frame) are removed entirely. All 6 cards are text-only, compact, and consistent.

- [ ] **Step 1: Replace the entire projects section HTML**

In `index.html`, replace the `<section class="projects section-pad" ...>` block (lines 142–220) with:
```html
<section class="projects section-pad" id="projects" aria-labelledby="projects-title">
    <div class="section-heading reveal">
        <p class="eyebrow">Selected Work</p>
        <h2 id="projects-title">Six projects across backend, data, ML, and systems.</h2>
    </div>
    <div class="project-stack">
        <article class="project-card reveal">
            <div class="project-copy">
                <p class="project-label">Machine Learning</p>
                <h3>Credit Card Fraud Detection</h3>
                <p>Compared 6 classifiers — Logistic Regression, Decision Tree, Random Forest, KNN, XGBoost, and LightGBM — for fraud detection on a highly imbalanced dataset. Used SMOTE and class weighting to handle class imbalance.</p>
                <p class="project-note">What stuck with me: how much the choice of evaluation metric matters when positive cases are less than 0.2% of your data.</p>
                <div class="tag-row"><span>Python</span><span>scikit-learn</span><span>XGBoost</span><span>LightGBM</span><span>SMOTE</span></div>
            </div>
        </article>

        <article class="project-card reveal">
            <div class="project-copy">
                <p class="project-label">Computer Vision</p>
                <h3>Where's Waldo? CNN Detection</h3>
                <p>Compared YOLOv8, RetinaNet, SSD MobileNetV2, and a custom CNN for Waldo detection across annotated and synthetic image data. YOLOv8 achieved the best F1 score; RetinaNet delivered the highest precision.</p>
                <p class="project-note">What stuck with me: the gap between precision and recall tells you something real about how each architecture reasons about ambiguous cases.</p>
                <div class="tag-row"><span>Python</span><span>PyTorch</span><span>YOLOv8</span><span>RetinaNet</span><span>SSD</span></div>
                <p class="project-course">COMP 4360 · Machine Learning · University of Manitoba</p>
            </div>
        </article>

        <article class="project-card reveal">
            <div class="project-copy">
                <p class="project-label">Data Engineering</p>
                <h3>Winnipeg City Analysis</h3>
                <p>Analyzed best Winnipeg neighbourhoods using multi-source civic data — transit stops, parks, hospitals, and 911 incidents — fetched via the City of Winnipeg open data API and joined across inconsistent schemas.</p>
                <p class="project-note">What stuck with me: joining across data sources forces you to make explicit decisions about what "same location" actually means.</p>
                <div class="tag-row"><span>Java</span><span>SQL</span><span>REST API</span></div>
                <p class="project-course">COMP 3380 · Databases · University of Manitoba</p>
            </div>
        </article>

        <article class="project-card reveal">
            <div class="project-copy">
                <p class="project-label">Systems Programming</p>
                <h3>ExFAT Shell</h3>
                <p>Built a custom shell in C for interacting with an ExFAT file system, including UNIX-style commands, process execution, I/O redirection, and piping.</p>
                <p class="project-note">What stuck with me: reliable tools feel simple only after the parsing, errors, and edge cases are handled carefully.</p>
                <div class="tag-row"><span>C</span><span>Linux</span><span>File Systems</span><span>Processes</span></div>
                <p class="project-course">COMP 3430 · Operating Systems · University of Manitoba</p>
            </div>
        </article>

        <article class="project-card reveal">
            <div class="project-copy">
                <p class="project-label">Concurrency</p>
                <h3>Cooperative Threads Library</h3>
                <p>Implemented a C thread library modeled on pthread-style behavior, with mutex support and FIFO, round-robin, and MLFQ scheduling policies.</p>
                <p class="project-note">What stuck with me: concurrency becomes easier to reason about when scheduling and synchronization rules are explicit.</p>
                <div class="tag-row"><span>C</span><span>Scheduling</span><span>Mutexes</span><span>Valgrind</span></div>
                <p class="project-course">COMP 3430 · Operating Systems · University of Manitoba</p>
            </div>
        </article>

        <article class="project-card reveal">
            <div class="project-copy">
                <p class="project-label">Software Engineering</p>
                <h3>PetObject</h3>
                <p>Built an Android app with a team for managing a virtual pet, with a focus on validation, navigation, editing flows, testing, and maintainable project structure.</p>
                <p class="project-note">What stuck with me: collaboration gets much easier when architecture and tests make the app predictable.</p>
                <div class="tag-row"><span>Java</span><span>Android</span><span>HSQLDB</span><span>JUnit</span></div>
                <p class="project-course">COMP 3350 · Software Engineering 1 · University of Manitoba</p>
            </div>
        </article>
    </div>
    <p class="github-more">More on <a href="https://github.com/satyambhanot" target="_blank" rel="noopener noreferrer">GitHub →</a></p>
</section>
```

- [ ] **Step 2: Update project-stack to 2-column grid**

In `styles.css`, find `.project-stack` (around line 439). Replace:
```css
.project-stack {
    display: grid;
    gap: 18px;
}
```
With:
```css
.project-stack {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}
```

- [ ] **Step 3: Update project-card to flex column**

In `styles.css`, find `.project-card` (around line 444). Replace the entire rule with:
```css
.project-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}
```

- [ ] **Step 4: Remove dead project-visual CSS**

Delete the following CSS blocks from `styles.css`. These rules all reference HTML elements removed in Step 1. Keep `pre { }` and `pre`-adjacent rules if they appear elsewhere; keep `.project-copy`, `.project-copy p`, `.project-note`, `.tag-row`, `.tag-row span`.

Blocks to delete (search for these selectors and remove their full rule blocks):
- `.project-visual { ... }`
- `.visual-shell { ... }`
- `.terminal-window { ... }`
- `.terminal-bar { ... }`
- `.terminal-bar span { ... }`
- `.terminal-bar span:nth-child(2) { ... }`
- `.terminal-bar span:nth-child(3) { ... }`
- `pre { ... }` (only used in the terminal window — safe to remove)
- `.visual-threads { ... }`
- `.thread-row { ... }`
- `.thread-row span { ... }`
- `.thread-row i { ... }`
- `.thread-row:nth-child(2) i { ... }`
- `.thread-row:nth-child(3) i { ... }`
- `.scheduler-line { ... }`
- `.visual-memory { ... }`
- `.memory-grid { ... }`
- `.memory-grid span { ... }`
- `.memory-grid span.live { ... }`
- `.visual-memory p { ... }`
- `.visual-app { ... }`
- `.phone-frame { ... }`
- `.phone-top { ... }`
- `.app-card { ... }`
- `.app-line { ... }`
- `.app-line.short { ... }`
- `.app-buttons { ... }`
- `.app-buttons span { ... }`

- [ ] **Step 5: Add project-course and github-more CSS**

In `styles.css`, after the `.tag-row span, .focus-grid span { ... }` block, add:
```css
.project-course {
    margin-top: 12px;
    margin-bottom: 0;
    color: var(--soft);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
}

.github-more {
    margin-top: 12px;
    text-align: right;
    color: var(--muted);
    font-size: 0.92rem;
}

.github-more a {
    color: var(--accent-ink);
    font-weight: 750;
}
```

- [ ] **Step 6: Update responsive CSS for projects**

In `styles.css`, inside `@media (max-width: 920px)`, find:
```css
.hero,
.project-card,
.timeline-item,
.education-skills {
    grid-template-columns: 1fr;
}
```
Replace with:
```css
.hero,
.timeline-item,
.education-skills {
    grid-template-columns: 1fr;
}

.project-stack {
    grid-template-columns: 1fr;
}
```

Still inside `@media (max-width: 920px)`, find and delete the entire `.project-visual` rule:
```css
.project-visual {
    min-height: 260px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
}
```

In `styles.css`, inside `@media (max-width: 640px)`, find the block that includes `.memory-grid`, `.terminal-window`, `pre` — remove those rules as they are dead code after Step 4.

- [ ] **Step 7: Verify in browser**

Open `index.html` and scroll to Projects:
- 6 cards in a 2-column grid
- Each card: teal domain label, h3 title, muted description, teal-left-border pullquote, teal tech chips, muted-light course label at bottom
- "More on GitHub →" right-aligned below the grid
- Resize to < 920px: cards stack to 1 column

- [ ] **Step 8: Commit**

```bash
git add index.html styles.css
git commit -m "feat: replace project stack with 6-card 2-column grid"
```

---

## Task 5: Redesign Skills Section with 4 Domain Cards

**Files:**
- Modify: `index.html:295–316` (skills-panel div)
- Modify: `styles.css` (replace `.skill-groups` CSS with `.skill-domain-grid` + `.skill-domain` rules)

- [ ] **Step 1: Replace the skills-panel HTML**

In `index.html`, find `<div class="skills-panel reveal" id="skills">` (around line 295) and replace the entire block:
```html
<div class="skills-panel reveal" id="skills">
    <p class="eyebrow">Skills</p>
    <h2>Grouped by how I use them.</h2>
    <div class="skill-domain-grid">
        <div class="skill-domain skill-domain--backend">
            <h3>Backend &amp; Apps</h3>
            <p class="skill-domain-desc">APIs, services, and application logic</p>
            <div class="tag-row">
                <span>Java</span><span>Python</span><span>JavaScript</span>
                <span>Node.js</span><span>FastAPI</span><span>React</span>
            </div>
        </div>
        <div class="skill-domain skill-domain--systems">
            <h3>Systems &amp; Low-level</h3>
            <p class="skill-domain-desc">C-level programming, debugging, memory</p>
            <div class="tag-row">
                <span>C</span><span>C++</span><span>Linux</span>
                <span>gdb</span><span>lldb</span><span>Valgrind</span><span>Makefile</span>
            </div>
        </div>
        <div class="skill-domain skill-domain--data">
            <h3>Data &amp; ML</h3>
            <p class="skill-domain-desc">Pipelines, analysis, and model work</p>
            <div class="tag-row">
                <span>SQL</span><span>PostgreSQL</span><span>MongoDB</span>
                <span>R</span><span>Jupyter</span><span>scikit-learn</span>
            </div>
        </div>
        <div class="skill-domain skill-domain--tools">
            <h3>Workflow &amp; Tools</h3>
            <p class="skill-domain-desc">Dev process and collaboration</p>
            <div class="tag-row">
                <span>Git</span><span>Docker</span><span>GitHub</span>
                <span>Figma</span><span>testing</span><span>documentation</span>
            </div>
        </div>
    </div>
</div>
```

- [ ] **Step 2: Replace skill-groups CSS with skill-domain CSS**

In `styles.css`, find and delete the following three rules (around lines 751–764):
```css
.skill-groups { ... }
.skill-groups div { ... }
.skill-groups h3 { ... }
```

Also find:
```css
.achievement-list p,
.skill-groups p {
    margin-bottom: 0;
    color: var(--muted);
}
```
Replace with (remove `.skill-groups p` since that class no longer exists):
```css
.achievement-list p {
    margin-bottom: 0;
    color: var(--muted);
}
```

In their place, add:
```css
.skill-domain-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 18px;
}

.skill-domain {
    padding: 18px 20px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-left: 4px solid var(--accent);
    border-radius: var(--radius);
    box-shadow: 0 8px 24px rgba(16, 24, 40, 0.05);
    transition: transform 160ms ease, box-shadow 160ms ease;
}

.skill-domain:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 42px rgba(16, 24, 40, 0.1);
}

.skill-domain--backend { border-left-color: var(--accent); }
.skill-domain--systems { border-left-color: var(--ink); }
.skill-domain--data    { border-left-color: var(--rust); }
.skill-domain--tools   { border-left-color: var(--blue); }

.skill-domain h3 {
    margin-bottom: 4px;
    font-size: 1rem;
    color: var(--ink);
}

.skill-domain-desc {
    color: var(--muted);
    font-size: 0.88rem;
    margin-bottom: 14px;
}
```

- [ ] **Step 3: Add mobile collapse for skill-domain-grid**

In `styles.css`, inside `@media (max-width: 640px)`, add:
```css
.skill-domain-grid {
    grid-template-columns: 1fr;
}
```

- [ ] **Step 4: Verify in browser**

Open `index.html` and scroll to Skills:
- 4 cards in a 2×2 grid inside the skills panel
- Left border colors: teal (Backend), dark ink (Systems), orange (Data & ML), blue (Tools)
- Each card: heading, one-line description, tech chips
- Hover any card: it lifts 2px and shadow deepens
- At < 640px: cards stack to 1 column

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "feat: redesign skills section with 4 domain cards"
```

---

## Task 6: Update Education Panel

**Files:**
- Modify: `index.html:277–293` (education-panel div)
- Modify: `styles.css` (flip `achievement-list` border from top to bottom)

- [ ] **Step 1: Replace the education-panel HTML**

In `index.html`, find `<div class="education-panel reveal" id="education">` (around line 277) and replace the entire block:
```html
<div class="education-panel reveal" id="education">
    <p class="eyebrow">Education</p>
    <h2>Computer Science Honours with a Math and Statistics minor.</h2>
    <p class="degree">Bachelor of Science · University of Manitoba · Graduated April 2026</p>
    <div class="achievement-list">
        <p><strong>Dean's Honour List</strong> · Fall 2024, GPA 3.90</p>
        <p><strong>University 1 Honour List</strong> · Winter 2021, GPA 3.83</p>
    </div>
    <div class="focus-grid">
        <span>Operating Systems</span>
        <span>Databases</span>
        <span>Machine Learning</span>
        <span>Security</span>
        <span>Algorithms</span>
        <span>Statistics</span>
    </div>
</div>
```

- [ ] **Step 2: Flip achievement-list separator to bottom border**

In `styles.css`, find `.achievement-list` (around line 739). Replace:
```css
.achievement-list {
    display: grid;
    gap: 8px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
}
```
With:
```css
.achievement-list {
    display: grid;
    gap: 8px;
    padding-bottom: 20px;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--line);
}
```

- [ ] **Step 3: Verify in browser**

Open `index.html` and scroll to Education:
- Degree reads "Graduated April 2026" (not "Expected Apr 2026")
- Dean's Honour List and GPA appear immediately below the degree line, above a separator
- Focus chips (Operating Systems, Databases, etc.) appear below the separator

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: update education — graduated April 2026, GPA callout moved to top"
```

---

## Task 7: Copy Polish — About, Experience, Contact

**Files:**
- Modify: `index.html` (about bento h3, experience bullets, contact h2 and p)

- [ ] **Step 1: Update the about bento large card headline**

In `index.html`, find the `.bento-large` article. Locate its `<h3>` (around line 121):
```html
<h3>Find the real issue, make it understandable, then fix it carefully.</h3>
```
Replace with:
```html
<h3>I like problems where getting the logic right is the hard part.</h3>
```

- [ ] **Step 2: Update the contact section**

In `index.html`, find the contact `<h2>` and `<p>` (around lines 322–323):
```html
<h2 id="contact-title">Open to software roles, technical support work, tutoring, and practical projects.</h2>
<p>If something here connects with the kind of work you need done, send me a note.</p>
```
Replace with:
```html
<h2 id="contact-title">Open to backend SWE, data engineering, and ML engineering roles.</h2>
<p>New grad, available now. If something here connects with the work you need done, send me a note.</p>
```

- [ ] **Step 3: Tighten Peer Tutor experience bullets**

In `index.html`, find the Peer Tutor `<article>` (around lines 243–256). Replace its `<ul>`:
```html
<ul>
    <li>Delivered one-on-one and group sessions in CS, mathematics, and statistics.</li>
    <li>Built practice problem sets and step-by-step explanations for common sticking points.</li>
    <li>Helped students move from memorization to independent problem solving.</li>
</ul>
```

- [ ] **Step 4: Tighten Student Mentor experience bullets**

In `index.html`, find the Student Mentor `<article>` (around lines 257–272). Replace its `<ul>`:
```html
<ul>
    <li>Mentored incoming and international Science students through academic and social transitions.</li>
    <li>Supported international students in navigating university systems and campus resources.</li>
    <li>Served as Treasurer for the Statistics Club — managed budget and financial reporting.</li>
</ul>
```

- [ ] **Step 5: Verify in browser**

Open `index.html`. Check:
- About dark bento card headline reads "I like problems where getting the logic right is the hard part."
- Contact heading reads "Open to backend SWE, data engineering, and ML engineering roles."
- Contact subtext reads "New grad, available now. If something here connects..."
- Peer Tutor and Student Mentor bullets are specific and outcome-focused

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: copy polish — about bento, contact role types, experience bullets"
```

---

## Post-Implementation

After all 7 tasks are committed:

1. **Add resume.pdf** — Place your resume PDF at the repo root as `resume.pdf`. Both the navbar Resume button and the hero Download Resume CTA link to this file.

2. **Verify all nav anchor links** — Click each nav item (About, Projects, Experience, Education, Skills, Contact) and confirm smooth scroll lands on the correct section.

3. **Check mobile at 375px** — Open browser devtools, set to iPhone SE width. Verify navbar hamburger works, hero stacks correctly, 6 project cards stack to 1 column, skill domain cards stack to 1 column.

4. **Deploy** — `git push origin main` — GitHub Pages will build automatically.
