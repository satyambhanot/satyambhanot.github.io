# Editorial-Technical Portfolio Redesign
**Date:** 2026-04-09  
**Scope:** Visual refresh with distinctive typography and accent color—editorial aesthetic, no framework changes

## Design Goals

Transform the portfolio from generic functional to distinctive editorial-technical aesthetic. Goals:
- **Aesthetic:** Editorial-technical (high-end tech magazine crossed with terminal)
- **Typography:** Monospace headings for boldness, body fonts for readability
- **Color:** Rose accent (#f43f5e) for warmth and contrast, muted dark base
- **Feel:** Crafted, intentional, not templated
- **Constraints:** Vanilla HTML/CSS/JS only, preserve all content and links, maintain dark/light mode

## Design Decisions

### 1. Accent Color: Rose (#f43f5e)
- **Choice:** Warm rose instead of purple, teal, amber, or red
- **Rationale:** Modern, editorial, slightly warmer than pure red. Sophisticated without being trendy. High contrast against dark backgrounds.
- **Usage:** CTA buttons, accent lines, highlights, logo color, hover states, labels
- **Light Mode:** Darken rose to #d9356f for adequate contrast on light backgrounds

### 2. Hero Section: Centered & Refined
**Current state:** Generic greeting ("Hi, I'm Satyam Bhanot") with lines on either side  
**New approach:**
- **Layout:** Centered, vertically spaced composition
- **Logo:** `<SB/>` in rose, monospace, prominent placement above text
- **Heading:** Large centered monospace headings split across lines:
  - First line: "Computer Science"
  - Second line: "student with taste" (rose color)
- **Subheading:** Clean prose description (not typing effect styled differently)
- **CTAs:** Two buttons in monospace (PROJECTS, CONTACT), rose fill and border variants
- **Backdrop:** Subtle rose gradient orb (already in current code, keep similar approach)
- **Typing effect:** Remove or repurpose—the "student with taste" is the statement now

**Spacing & hierarchy:** Large monospace headings (52-56px), prose body (14-16px), breathing room between sections

### 3. Navbar: Keep Current Style
**Rationale:** Functional, familiar, provides good dark/light mode toggle and resume link  
**Changes:** 
- Logo text `<SB/>` in rose accent color
- Hover states on nav links use rose accent
- Resume button border/text uses rose accent
- Theme toggle button uses rose for the toggle indicator

**No structural changes**—preserve existing hamburger menu for mobile, theme toggle, all links

### 4. Project Cards: Keep Current Style
**Rationale:** Existing card design is solid—rounded corners, clear hierarchy, hover interactions  
**Changes:**
- Card label text (e.g., "PERSONAL") in rose accent
- Tech tag borders and text in rose
- Hover states emphasize rose accent
- No numbering (01, 02...) added—keep clean current structure

### 5. Skills Section: Keep Icon Grid
**Rationale:** Visual, approachable, distinctive from prose-heavy sections  
**Changes:**
- Icon grid stays (emoji or icons per skill)
- Labels below icons in current style
- Hover states use rose accent or subtle background tint
- Optional: Add rose border to selected/highlighted skill cards on hover

### 6. Section Transitions: Staggered Fade-Ins
**New addition:** Replace simultaneous fade-ins with intentional stagger
- **Trigger:** On scroll into view (Intersection Observer already in code)
- **Behavior:**
  - Section title fades in first (duration: 300ms, delay: 0ms)
  - Content blocks fade in sequentially (duration: 300ms each, 100ms offset between blocks)
  - No bounce or elastic easing—pure fade (ease-in-out)
  - Happens once per section on first scroll into view
  - No repeat on scroll back up
- **Implementation:** CSS animations triggered by `.animate-on-scroll` class with staggered `animation-delay`

### 7. Preserved Elements
- **About section:** Layout, photo, details chips—only rose accent changes
- **Education section:** Tab layout, timeline, coursework tags—rose accent updates
- **Contact form:** Fields, layout, validation—rose accent on focus states
- **Particles & effects:** Existing particle system, noise overlay, cursor glow stay as-is
- **Dark/light mode:** Fully preserved—all rose accent darkens appropriately in light mode

## Color Palette

| Role | Light Mode | Dark Mode | Hex |
|------|-----------|-----------|-----|
| Accent Primary | #d9356f | #f43f5e | #f43f5e (dark), #d9356f (light) |
| Accent Subtle | rgba(217, 53, 111, 0.15) | rgba(244, 63, 94, 0.1) | varies |
| Text Primary | #1a1a1a | #f5f5f7 | existing |
| Text Muted | #666 | #a1a1a1 | existing |
| Background | #f9f9fa | #0f0f0f | existing |
| Border | #e0e0e0 | #333 | existing |

## Typography

| Element | Font | Size | Weight | Letter Spacing | Usage |
|---------|------|------|--------|-----------------|-------|
| Display/Logo | Syne or monospace | 48-56px | 700-800 | -0.5px to 2px | Hero heading, section titles |
| Monospace Accent | JetBrains Mono | 11-12px | 500-600 | 1-2px | Labels, buttons, logo |
| Body | DM Sans | 14-16px | 400-500 | 0 | Prose, descriptions |

## Component Changes

### Hero Section Structure
```
<section class="hero">
  <div class="hero-content">
    <div class="hero-logo"><!-- <SB/> in rose --></div>
    <h1 class="hero-heading">
      <span class="hero-line">Computer Science</span>
      <span class="hero-line hero-highlight">student with taste</span>
    </h1>
    <p class="hero-description">Prose description</p>
    <div class="hero-buttons">
      <button>PROJECTS</button>
      <button>CONTACT</button>
    </div>
  </div>
</section>
```

### Staggered Animation Example
```css
.animate-on-scroll {
  animation: fadeIn 0.3s ease-in-out forwards;
  opacity: 0;
}

.hero-logo {
  animation-delay: 0s;
}

.hero-heading {
  animation-delay: 0.1s;
}

.hero-description {
  animation-delay: 0.2s;
}

.hero-buttons {
  animation-delay: 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Scope & Out of Scope

### In Scope
- Rose accent color system integrated throughout
- Hero section redesign (centered, monospace headings, logo prominence)
- Staggered fade-in transitions for all sections
- Navbar/cards/skills accent color updates
- Dark/light mode color adaptation
- CSS variable updates for accent colors

### Out of Scope
- Framework adoption
- New sections or content changes
- Navigation structure changes
- Mobile responsiveness overhaul (keep existing breakpoints)
- New effects or animations beyond staggered fades
- Font family changes (keep Syne, DM Sans, JetBrains Mono)

## Files to Modify

- **styles.css:** Update CSS variables, hero styling, animation delays, accent colors
- **index.html:** Update hero section markup, button text/styling
- **script.js:** Optional enhancement for animation timing (mostly CSS-driven)

## Testing Checklist

- [ ] Hero section renders centered on desktop/mobile
- [ ] Rose accent visible in all updated elements (buttons, labels, tags)
- [ ] Staggered animations trigger on scroll
- [ ] Dark mode rose accent renders with adequate contrast
- [ ] Light mode rose accent (#d9356f) readable
- [ ] No console errors
- [ ] All links and CTAs still functional
- [ ] Typing effect behavior confirmed or removed
- [ ] Particle effects still render
- [ ] Theme toggle works and applies rose accent changes

## Success Criteria

✅ Portfolio feels editorial-technical, not generic  
✅ Rose accent is bold and intentional throughout  
✅ Hero section has distinctive typography and layout  
✅ Staggered transitions feel crafted, not abrupt  
✅ Dark/light mode maintains visual coherence  
✅ All content preserved, no functionality broken  
✅ Vanilla HTML/CSS/JS only—no frameworks added