# Portfolio Redesign — Design Spec
**Date:** 2026-05-20
**Author:** Satyam Bhanot

---

## Goal

Redesign the personal portfolio at `satyambhanot.github.io` to better target tech company recruiters hiring for backend SWE and data/ML engineering roles. The site should communicate Satyam's profile in under 10 seconds, provide a resume download, and present projects in a way that signals engineering capability rather than coursework completion.

**Stack:** Vanilla HTML, CSS, JS — no frameworks. Existing file structure (`index.html`, `styles.css`, `script.js`) is preserved.

---

## Audience & Goals

- **Primary audience:** Recruiters at tech companies screening for backend SWE and data/ML engineering internships or new grad roles
- **Primary goal:** Recruiter lands on site → immediately understands "backend + data/ML" → finds resume → finds strong projects → has contact info
- **Secondary goal:** Looks polished and professional; not a generic student template

---

## Section 1: Navbar

**Change:** Add a "Resume" button on the right side of the navbar.

- Style: small pill, teal outline (`button-secondary` or a new `button-nav-resume` variant)
- Links to `resume.pdf` in the repo root (user must add their PDF)
- On mobile: appears as the last item in the dropdown nav menu
- On desktop: sits to the right of the nav links, before the right edge of the pill header

---

## Section 2: Hero

**Headline rewrite:**
- Current: "Computer science student building practical, reliable software."
- New: Two-line, domain-forward headline — e.g. **"Backend engineer.\nData builder."** (exact wording can be adjusted but must signal the two target domains)

**Subtitle:** Trim to 2 sentences max. Drop references to Rogers support work from the lead — move that context to the Experience section. Focus the subtitle on CS background + what Satyam builds.

**CTA row:** Three buttons — `View Projects` (primary), `Download Resume` (secondary, links to resume.pdf), `GitHub` (quiet). Resume gets a dedicated CTA in the hero.

**Hero-proof stats (3 cards):** Replace current stats with recruiter-relevant signals:
- `4 Projects` + label "systems, backend, data, ML"
- `Java · Python · C` + label "primary languages"
- `3.90 GPA` + label "Dean's Honour List, Fall 2024"

**Profile panel (right side):** Keep existing structure. The "Currently" card and signal chips (`debug`, `document`, `teach`) stay. Update graduation entry — `Apr 2026` is now past; update to reflect current status accurately.

---

## Section 3: About (Bento Grid)

Minor copy polish only. Structure and layout unchanged. The large dark bento card headline should be updated to match the new "backend + data/ML" positioning rather than the generic "find the real issue" framing.

---

## Section 4: Projects

**Layout change:** Replace the vertical stack of 4 cards with a **2-column card grid** of 6 projects. Add a domain filter bar above the grid: `All · Systems · ML & Data · Apps`. Filter uses CSS class toggling — no library.

**6 featured projects (in recommended display order):**

1. **Credit Card Fraud Detection** (ML & Data)
   - Stack: Python, scikit-learn (or similar ML stack)
   - Description: Comparative analysis of ML classifiers for detecting fraudulent transactions in highly imbalanced datasets
   - Lead label: "Machine Learning"

2. **Finding Waldo** (ML & Data)
   - Stack: Python, ML models (computer vision)
   - Description: Object detection across multiple model architectures; model comparison and evaluation
   - Lead label: "Computer Vision"

3. **Winnipeg City Analysis** (ML & Data)
   - Stack: Java, SQL, City of Winnipeg REST API
   - Description: Analyzed best city areas using multi-source civic data — transit, parks, hospitals, 911 calls, stops
   - Lead label: "Data Engineering"

4. **ExFAT Shell** (Systems)
   - Stack: C, Linux
   - Description: Custom UNIX-style shell with file system interaction, process execution, I/O redirection, piping
   - Lead label: "Systems Programming"

5. **Cooperative Threads Library** (Systems)
   - Stack: C, Valgrind
   - Description: Thread library with mutex support and FIFO, round-robin, and MLFQ scheduling
   - Lead label: "Concurrency"

6. **PetObject** (Apps)
   - Stack: Java, Android, HSQLDB, JUnit
   - Description: Android app built with a team; clean architecture, validation flows, full JUnit test suite
   - Lead label: "Software Engineering"

**Excluded from grid:** Mark-and-Sweep Garbage Collector. Link to GitHub from a small "More on GitHub →" line below the grid.

**Card copy framing:** Each card leads with the domain label (e.g. "Machine Learning"), not the course number. Course info is preserved as a secondary line in smaller, muted text. The "What stuck with me" note is kept as a left-border pullquote — it differentiates this portfolio from generic ones.

---

## Section 5: Experience

Minor copy polish only. Layout and structure unchanged.

- Tighten vague bullets: each bullet should state a concrete action or outcome
- Rogers role bullets are good; tutor and mentor bullets need one concrete outcome each
- Peer Tutor dates `Sep 2023 – Aug 2025` are accurate — leave as-is

---

## Section 6: Education & Skills

**Education panel:**
- Move Dean's Honour List / GPA callout to the top of the card (currently buried at bottom)
- Update graduation status — `Expected Apr 2026` is now past; change to `University of Manitoba · Graduated 2026` or appropriate current phrasing

**Skills panel — full redesign:**
Replace plain text skill groups with a **4-card domain grid**. Each card has:
- A colored left border matching the domain accent color
- Domain heading
- Technology pills (reuse existing `tag-row span` chip style)
- One-line description of usage context

| Domain | Accent color (CSS var) | Technologies |
|---|---|---|
| Backend & Apps | `--accent` (teal) | Java, Python, JavaScript, Node.js, FastAPI, React |
| Systems & Low-level | `--ink` (dark slate) | C, C++, Linux, gdb, lldb, Valgrind, Makefile |
| Data & ML | `--rust` (orange) | SQL, PostgreSQL, MongoDB, R, Jupyter, scikit-learn |
| Workflow & Tools | `--blue` | Git, Docker, GitHub, Figma, testing, documentation |

No new colors required — all four use existing CSS variables.

---

## Section 7: Contact

**Minor addition only.** Add one sentence below the headline naming the role types Satyam is open to:
> "Open to backend SWE, data engineering, and ML engineering roles — internship and new grad."

This gives recruiters landing directly on the contact section the context they need to act.

---

## Section 8: Global Polish

1. **Fix broken reveal animation:** The `.reveal` class currently sets `opacity: 1; transform: translateY(0)` as its initial state — identical to `.is-visible`. Fix: initial state should be `opacity: 0; transform: translateY(18px)`. The JS observer already handles adding `is-visible` correctly; only CSS needs updating.

2. **Skill card hover states:** Add subtle `translateY(-2px)` and `box-shadow` lift on hover for the new skill domain cards, consistent with project card hover behavior.

3. **Resume PDF:** Add `resume.pdf` to repo root. Both navbar button and hero CTA link to it.

4. **Graduation date:** Update any reference to `Expected Apr 2026` to reflect current status.

---

## Out of Scope

- Dark mode toggle
- Animations beyond existing reveal pattern
- Filterable project grid with JavaScript (filter is CSS class toggle only — no JS library)
- New fonts or icon libraries
- Backend / contact form
