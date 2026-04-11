# Impact-Narrative Portfolio Redesign
**Date:** 2026-04-11  
**Scope:** Reframe the entire portfolio around human-centered problem-solving—restructure narrative, rewrite all descriptions, emphasize impact over credentials

## Design Goals

Transform the portfolio from generic resume showcase to a **distinctive visual and narrative experience** that shows **who you help and why it matters**. Goals:
- **Core message:** You solve problems that directly affect people—support, mentoring, accessibility, removing barriers
- **Narrative lens:** Lead with problem → solution → impact, not credentials → responsibilities → bullet points
- **Visual identity:** Bold, editorial, warm—proves you spent real time thinking about design and every detail matters
- **Feel:** Authentic, thoughtful, people-first—not self-congratulatory; confident and intentional
- **Preserve:** Vanilla HTML/CSS/JS, dark/light mode, existing interactive foundation
- **Scope:** Full visual design system + content rewrite + animations + components, no framework changes

## Core Narrative Shift

The structure stays the same (About, Education, Experience, Projects, Skills, Contact). The power is in **how you tell the story**.

### Voice Pattern

**Before (current):**
> "Tech Support Specialist at Rogers. Resolve 50+ incidents weekly, maintain IT assets..."

**After (new narrative):**
> "Tech Support Specialist at Rogers. When enterprise customers lose connectivity, it costs them time and trust. I resolve 50+ incidents weekly across hardware, software, and networks—often finding the root cause others missed—so their teams can stay productive."

Every section follows this pattern:
1. **Who benefits?** (the person/group/system you're helping)
2. **What problem do they face?** (concrete, specific)
3. **What did you do?** (the work)
4. **Why does it matter?** (the impact)

---

## Visual Design System

### Color Palette

**Primary Accent: Terracotta (#E97451)**
- Used for CTAs, highlights, accent borders, key statements, interactive states
- Feels warm, editorial, bold—signals intentionality and confidence
- Works equally well for any gender; reads as professional, crafted, sophisticated

**Dark Mode (Default)**
| Role | Color | Usage |
|------|-------|-------|
| Background Primary | #0f0f0f | Page background |
| Background Secondary | #1a1a1a | Card backgrounds, elevated surfaces |
| Text Primary | #f5f5f7 | Body text, primary content |
| Text Secondary | #a1a1a6 | Secondary text, metadata |
| Accent Primary | #E97451 | Buttons, highlights, key interactive elements |
| Accent Hover | #F08968 | Hover states, active links |
| Accent Subtle | rgba(233, 116, 81, 0.12) | Subtle backgrounds, borders |
| Border | rgba(233, 116, 81, 0.2) | Accent borders, dividers |

**Light Mode**
| Role | Color | Usage |
|------|-------|-------|
| Background Primary | #faf9f7 | Page background (warm cream, not pure white) |
| Background Secondary | #f5f3f0 | Card backgrounds |
| Text Primary | #1a1a1a | Body text, primary content |
| Text Secondary | #6b6b6b | Secondary text, metadata |
| Accent Primary | #E97451 | Buttons, highlights, key interactive elements |
| Accent Hover | #D86643 | Hover states (darker terracotta) |
| Accent Subtle | rgba(233, 116, 81, 0.08) | Subtle backgrounds, borders |
| Border | rgba(233, 116, 81, 0.15) | Accent borders, dividers |

**Neutral Colors (both modes)**
- Gray-50, Gray-100, Gray-200, etc. for borders, dividers, disabled states
- Derived from existing dark/light theme where possible

---

### Typography

**Font Stack (no new fonts—use existing):**
- **Display/Headings:** Syne (700-800 weight) — bold, editorial, confidence
- **Body:** DM Sans (400-500 weight) — warm, readable, human
- **Monospace/UI:** JetBrains Mono (500-600 weight) — technical credibility, logos, badges

**Sizes & Weights:**
| Element | Font | Size | Weight | Letter Spacing |
|---------|------|------|--------|-----------------|
| Hero Heading | Syne | 52-64px | 800 | -0.5px |
| Section Title | Syne | 36-44px | 700 | 0 |
| Card Title | Syne | 20-24px | 700 | 0 |
| Body Text | DM Sans | 14-16px | 400 | 0 |
| Labels/Tags | JetBrains Mono | 11-12px | 600 | 1px |
| Button Text | JetBrains Mono | 12-14px | 600 | 1-2px |

---

### Button & Interactive Component Styles

**Primary Button (CTA—"View My Work", "Get In Touch")**
- Background: Terracotta (#E97451)
- Text: White (#f5f5f7)
- Border: None
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Background becomes lighter terracotta (#F08968), slight scale up (1.02x)
- Font: JetBrains Mono, 14px, 600 weight

**Secondary Button (Alternative action)**
- Background: Transparent
- Border: 2px solid terracotta (#E97451)
- Text: Terracotta (#E97451)
- Padding: 10px 22px (accounts for border)
- Border Radius: 8px
- Hover: Background becomes terracotta with 10% opacity, text stays terracotta
- Font: JetBrains Mono, 14px, 600 weight

**Tertiary / Ghost Button (Less prominent)**
- Background: Transparent
- Border: 1px solid rgba(233, 116, 81, 0.3)
- Text: Text Secondary color
- Padding: 10px 20px
- Border Radius: 8px
- Hover: Text becomes terracotta, border becomes solid terracotta
- Font: JetBrains Mono, 14px, 500 weight

**Skill Card / Tag Button**
- Background: rgba(233, 116, 81, 0.08) [light subtle]
- Border: 1px solid rgba(233, 116, 81, 0.2)
- Text: Text Primary
- Padding: 8px 14px
- Border Radius: 6px
- Hover: Background becomes rgba(233, 116, 81, 0.15), border becomes solid terracotta
- Font: 13px

---

### Animations & Micro-interactions

**Philosophy:** Animations should feel *intentional and purposeful*, not decorative. Every motion should communicate or guide the user.

**Hero Section**
- Remove typing effect (it's generic)
- Hero content fades in on page load (300ms ease-out)
- Particles continue to animate subtly in background (existing particle system, but colored terracotta)

**Scroll Animations**
- Section titles fade and slide up slightly on scroll (300ms)
- Content blocks stagger in: each element has 100ms delay offset from previous
- No bounce—pure ease-in-out for sophistication
- Happens once on first scroll into view

**Button Interactions**
- Hover: Color shift + subtle scale (1.02x, 200ms ease-out)
- Active/Clicked: Color deepens slightly, no animation jar
- Disabled: Opacity 50%, no hover effect

**Card Interactions**
- Hover: Subtle shadow increase, optional very slight scale (1.01x)
- No overlay animations—keep clean
- Links within cards have underline that appears on hover

**Form Focus States**
- Input field: Terracotta border appears (2px solid), background stays clear
- Label floats slightly above on focus (if using floating labels)
- Smooth transition 150ms

**Tab Switching**
- Active tab border/underline animates in (200ms)
- Content crossfades (150ms)

**Particle Effects**
- Existing particle system stays
- Color updates to terracotta (#E97451)
- Opacity/behavior unchanged

---

### Visual Details & Polish

**Borders & Dividers**
- Section dividers: 1px terracotta at reduced opacity (rgba(233, 116, 81, 0.2))
- Card borders: Subtle, 1px, same color
- Accent borders on key elements: 2px solid terracotta

**Shadows**
- Keep existing shadow system but optionally enhance for depth
- Dark mode: shadows stay dark and subtle
- Light mode: shadows should be warm-tinted (very subtle warm tint) rather than pure gray

**Spacing & Layout**
- Maintain current responsive grid
- Increase breathing room around key sections (especially hero and calls-to-action)
- Content width stays readable (max-width around 1200px)

**Icons & Visual Cues**
- Project cards: Small terracotta accent line or icon next to "Problem" statement
- Experience timeline: Timeline marker becomes terracotta instead of neutral
- Skills section: Optional intent-based grouping with subtle terracotta dividers between groups
- SVG icons: Color updates to terracotta for primary actions

**Logo / Branding**
- `<SB/>` logo in navbar and hero: Change to terracotta color
- Maintains monospace styling (JetBrains Mono or similar)

---

### Dark Mode & Light Mode Implementation

**Dark Mode (Primary)**
- Stays as the default, more polished variant
- Terracotta accent pops against dark backgrounds
- Warmth of accent balances the cool darkness

**Light Mode**
- Background shifts from pure white to warm cream (#faf9f7) for sophistication
- Same terracotta accent, but slightly darker shade (#D86643) for contrast
- Less harsh than pure white on eyes, aligns with warm aesthetic

**Theme Toggle**
- Switch indicator becomes terracotta
- Smooth transition between themes (200ms)

---

### Overall Visual Narrative

The design says: **"I'm technical and thoughtful. I spent time on this. I care about how things feel, not just how they work. The warmth of terracotta means I'm human-focused; the editorial boldness means I'm intentional; the clean lines mean I respect your time."**

Every visual choice reinforces the narrative: problem-solving with purpose, designed with care, built with intention.

---

## Section-by-Section Design

### 1. Hero Section: Problem First

**Current state:**
- "Hi, I'm Satyam Bhanot"
- Typing effect with skills
- CTA buttons

**New approach:**
Replace the name-first intro with a problem-first statement that establishes who you help:

**Copy:**
> "I help when things break—or before they do.
>
> When a student is stuck on recursion, when a system fails under load, when someone from another country feels lost on a new campus—I find what's really going on and fix it. Fourth-year CS student building skills to solve real problems that affect real people."

**Changes:**
- Remove typing effect (it was generic—this statement is the unique part)
- Keep CTA buttons (View My Work, Get In Touch) but they now sit in context of "here's what I can do for you"
- Keep particle effects / orbs in background (they're well-executed and add visual depth)
- Optional: Adjust accent color to something warmer/more connected if it fits your brand (current spec from prior work used rose—could keep or shift based on preference)

**Constraint:** Hero must feel natural and authentic—if this wording doesn't sound like you, it needs adjustment.

---

### 2. About Section: Foundation for Connection

**Current state:**
- Bio paragraph about CS Honours, math/stats minor
- List of roles and achievements

**New approach:**
Lead with *why* you care about the fields you're in, then show credentials as evidence:

**Structure:**
1. **Opening statement:** Why you chose this path (the human reason, not just "interested in")
   - Example: "I chose computer science because data and algorithms let you understand patterns—in systems, in student struggles, in trends. The math and stats minor gives me the tools to turn observations into insights."

2. **Credentials as proof:** Reframe the detail chips
   - Instead of "CS Honours, UofM" it's "CS Honours, UofM—rigorous foundation in algorithms, systems, and problem-solving"
   - Instead of "Rogers Communications" it's "Rogers Communications—solving real customer and enterprise problems at scale"

3. **Why it matters:** Close with the connection to your core mission
   - Example: "Every role—student, developer, mentor, support specialist—teaches me something about how to help people solve real problems."

**Visual:** Keep the photo and detail chips. The reframe is content, not design.

---

### 3. Education Section: Tools for Thinking

**Current state:**
- Education card with degree, minor, achievements
- Tabbed coursework by category (Computer Science, Mathematics, Statistics)

**New approach:**
Reframe education as foundational tools, not just credentials:

**Opening statement:**
> "**Foundation for Problem-Solving**
>
> Bachelor of Science — Computer Science Honours, University of Manitoba (Apr 2026)  
> Minor: Mathematics & Statistics
>
> I chose this path because data and algorithms let you understand patterns—in systems, in student struggles, in trends. The coursework gave me tools: how databases actually work under load, how machine learning reveals insights, how networks fail and how to fix them. Dean's Honour List reflects not just grades, but the ability to learn deeply."

**Changes:**
- Keep the achievements (Dean's Honour List, etc.) but contextualize them
- Keep the coursework tabs but optional: group courses within each tab by application area (e.g., under CS: "Systems & Performance" courses vs. "Data & AI" courses)
- The goal is to show "these are tools I mastered to solve real problems," not "here's the resume line"

---

### 4. Experience Section: Impact Timeline

**Current state:**
- Three tabs: Work, Volunteering, Leadership
- Timeline entries with dates, title, place, bullet points

**New approach:**
Keep the tab structure (it's scannable). Reframe *every* entry to lead with impact:

**Tech Support Specialist (Work):**
> "When customers lose connectivity, time stops. I resolve 50+ incidents weekly across hardware, software, and networks—debugging issues others can't crack, finding root causes hidden in complexity. Every ticket solved is a business staying productive, a team staying connected.
>
> - Troubleshoot 50+ weekly incidents across hardware, software, networks
> - Maintain 200+ IT asset records, tracking lifecycles and warranty statuses
> - Collaborate with engineering teams to resolve complex multi-tier issues
> - Document solutions to build institutional knowledge"

**Peer Tutor (Volunteering):**
> "Students often think they're bad at math or CS. I work with them one-on-one to find where understanding breaks down, then rebuild it. Watching someone go from 'I don't get this' to explaining it back to me—that's the work that matters.
>
> - Delivered personalized sessions in CS, math, and statistics
> - Created study materials that helped students actually understand, not just memorize
> - Mentored through data structures, calculus, probability—students showed measurable improvement
> - Upheld academic integrity by guiding toward independence, not quick answers"

**Mentor (Leadership):**
> "New students often feel lost. I guide them through not just academics but belonging. Regular check-ins, tailored resources, group events—small things that help someone realize 'I can do this.'
>
> - Provide biweekly mentorship to incoming Science students
> - Organize study sessions and peer support circles
> - Connect mentees with advising, tutoring, and mental health resources
> - Foster community among first-year students"

**Pattern:** Opening statement about impact, then bullets that show the work. The impact frame makes the bullets feel like evidence, not just responsibilities.

---

### 5. Projects Section: Problem → Solution → Impact

**Current state:**
- Tab for Personal and Academic projects
- Card format with emoji placeholder, title, description, tech tags
- Academic projects split into "Individual" and "Group" subsections

**New approach:**
Every project tells a story: what problem did it solve, who did it help?

**Personal Project—Portfolio Website:**
> **Portfolio Website**
>
> **Problem:** Generic templates make it hard to show who you really are. Recruiters see the same layouts everywhere, and your actual thinking gets hidden behind conventional structure.
>
> **Solution:** Built from scratch with pure HTML, CSS, and JavaScript. No framework, no template. Every design choice is intentional.
>
> **Result:** A fast, accessible site that shows care and thoughtfulness. The particle effects aren't decoration—they show attention to detail. Dark/light mode works because people deserve choice. It's a living example of the belief: solve real problems, even small ones.
>
> **Tech:** HTML, CSS, JavaScript, GitHub Pages

**Academic Project—Example (PetObject):**
> **PetObject**
>
> **Problem:** Managing state in a mobile app is hard. Users expect forms that validate, navigation that makes sense, and data that persists. Teams struggle to build clean architecture under real constraints.
>
> **Solution:** Built a full-featured Android app with form validation, bottom navigation, pet management, and a multi-fragment architecture that separates concerns cleanly.
>
> **Result:** Every piece has a clear responsibility. Testable. Maintainable. A demonstration that good structure enables good features—and that good features serve users.
>
> **Tech:** Java, Android, HSQLDB, JUnit, Git

**Change:** Lead with problem and impact, tech tags at the end. This positions projects as solutions, not resume bullets.

**Visual:** Keep cards and tabs. Maybe add a subtle icon or visual cue (like a small accent line or indicator) next to the problem statement to highlight it visually.

---

### 6. Skills & Technologies: Tools for Impact

**Current state:**
- Three tabs: Programming Languages, Frameworks, Developer Tools
- Skill cards with icons/logos

**New approach:**
Add a short intro that recontextualizes why you know these skills:

**Opening statement:**
> "**Skills & Technologies**
>
> These aren't skills collected for a resume—they're tools I've used to solve real problems. I pick the right tool for the job, not the fanciest one."

**Optional structural enhancement:**
Within each tab, group skills by *intent* (how you use them), not just category. For example:

**Programming Languages tab:**
- **Systems & Performance** (C, C++, Java, LC3 Assembly) — for problems that need to be fast and reliable
- **Data & Analysis** (Python, R, SQL) — for understanding patterns and trends
- **Web & Interaction** (JavaScript, HTML, CSS) — for building things people actually use

This subtle grouping shows *why* you know each tool.

**Visual:** Keep the card grid and icons. The reframe is in the intro and optional grouping.

---

### 7. Contact Section: Unchanged

The contact section is already good—personal, warm, actionable. No changes needed.

---

## Implementation Details

### Content Changes
- **Hero:** Replace typing effect copy with problem-first statement
- **All sections:** Rewrite opening paragraphs to lead with impact, not credentials
- **Bullets/descriptions:** Keep specificity, add context (who benefits, why it matters)
- **Tone:** Authentic, specific, humble—not self-promotional

### Visual Changes (Comprehensive)
- **Color System:** Update all primary accent colors from blue (#3b82f6) to terracotta (#E97451)
  - Affects: CTA buttons, hover states, accent borders, highlights, timeline markers, logos
  - Light mode background: Shift to warm cream (#faf9f7) instead of pure white
- **Buttons:** Redesign primary/secondary/tertiary buttons per spec with new colors and interactions
- **Animations:** 
  - Remove typing effect from hero
  - Add button hover animations (color shift + scale)
  - Enhance scroll animations with staggered entry (already have structure, refine timing)
  - Smooth tab transitions
  - Particle system color update to terracotta
- **Visual Accents:**
  - Project cards: Add terracotta accent element next to problem statements
  - Timeline markers: Change to terracotta
  - SVG icons: Update primary action icons to terracotta
  - Logo `<SB/>`: Change to terracotta color
- **Typography:** Keep existing fonts (Syne, DM Sans, JetBrains Mono), refine sizing/weights per spec
- **Shadows & Spacing:** Optionally warm-tint shadows in light mode, increase breathing room around key sections

### Technical Changes
- **HTML:** Update content + add visual hooks for new accent elements
- **CSS:** 
  - Update CSS variables for terracotta colors (both dark and light modes)
  - New button styles with hover states
  - Animation timing and stagger delays
  - Optional skill grouping styles
  - Light mode background color
  - Icon color updates
- **JavaScript:** Minimal changes—may refine particle system color or animation timing, no major logic changes

---

## Success Criteria

**Narrative:**
✅ Hero immediately establishes that you solve problems for people  
✅ Every section leads with impact, not credentials  
✅ Voice feels authentic and specific, not templated  
✅ Readers understand who benefits from your work  
✅ Recruiters can still scan for skills/experience  

**Visual:**
✅ Terracotta accent color is bold and distinctive—reads as intentional, editorial, warm  
✅ Button styles and interactions feel polished and responsive  
✅ Animations feel purposeful and guide the user, not distract  
✅ Dark/light mode both feel cohesive and sophisticated  
✅ Overall impression: "Someone spent real time thinking about this"  

**Technical:**
✅ Dark/light mode, interactions, and performance preserved  
✅ No framework changes—vanilla HTML/CSS/JS  
✅ All visual updates in CSS variables for easy maintenance  
✅ Particle system, scroll effects, and existing functionality preserved  

---

## Files to Modify

- **index.html:** Update all section content/copy
- **styles.css:** Optional—add grouping styles for skills if pursuing intent-based organization
- **script.js:** No changes needed (existing animations/interactions remain)

---

## Scope & Out of Scope

### In Scope
- Content rewrite across all sections (narrative shift)
- Hero redesign (remove typing effect, add problem-first statement)
- Optional visual enhancements (groupings, subtle cues)
- Preserve dark/light mode, existing interactions

### Out of Scope
- Framework adoption
- Major layout restructuring
- New sections or projects
- Navigation structure changes
- Fundamental design overhaul

---

## Notes & Decisions

1. **Authenticity first:** If the wording feels inauthentic, adjust. The power is in genuine voice, not perfect copy.
2. **Brevity matters:** Each opening statement should be 1-2 sentences max—enough to set context, not a paragraph.
3. **Technical accuracy:** The "problem → solution → impact" frame works for your actual work. Make sure each project/experience reflects a real problem you solved.
4. **Grouping skills by intent is optional:** If it feels forced, the intro alone reframes the list well enough.
