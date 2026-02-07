# Satyam Bhanot — Portfolio Website

A clean, responsive personal portfolio website built from scratch with **HTML**, **CSS**, and **JavaScript**. Designed to showcase my skills, projects, experience, and provide a way for recruiters and collaborators to get in touch.

**Live Site:** [satyambhanot.github.io](https://satyambhanot.github.io)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customization](#customization)
- [Performance & Accessibility](#performance--accessibility)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## About

This portfolio serves as a central hub for my professional presence online. It highlights my background as a fourth-year Computer Science Honours student at the University of Manitoba, my work experience at Rogers Communications, my leadership and mentoring roles, and the projects I've built throughout my academic journey.

The site is fully static with no frameworks or build tools — just pure HTML, CSS, and JavaScript — making it lightweight, fast, and easy to maintain. It is hosted for free using GitHub Pages.

---

## Features

- **Typing Animation** — A dynamic hero section that cycles through phrases describing my interests and skills, built with vanilla JavaScript.
- **Scroll-Triggered Animations** — Elements fade and slide into view as the user scrolls, powered by the Intersection Observer API for optimal performance.
- **Interactive Project Cards** — Hover effects reveal GitHub and live demo links with smooth overlay transitions.
- **Responsive Design** — Fully responsive layout using CSS Grid and Flexbox that adapts seamlessly across desktop, tablet, and mobile devices.
- **Sticky Navigation** — A frosted-glass navbar that becomes visible on scroll with active section highlighting.
- **Contact Form** — A functional contact form with client-side validation and success feedback.
- **Smooth Scrolling** — Anchor-based navigation with smooth scroll behavior and proper scroll offset for the fixed navbar.
- **Mobile Menu** — A hamburger toggle menu for smaller screens with animated transitions.
- **Floating Orb Background** — Subtle animated gradient orbs in the hero section for visual depth without distraction.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic page structure and content |
| CSS3 | Styling, animations, responsive layout |
| JavaScript (ES6+) | Typing effect, scroll observer, form handling |
| Google Fonts | Typography (Outfit, JetBrains Mono) |
| GitHub Pages | Hosting and deployment |
| Git | Version control |

No external frameworks, libraries, or build tools are used. Everything is written from scratch.

---

## Project Structure

```
satyambhanot.github.io/
├── index.html          # Main HTML — all sections and semantic structure
├── styles.css          # Complete stylesheet — variables, layout, animations, responsive
├── script.js           # All interactivity — typing, scroll effects, nav, form
├── README.md           # Project documentation (this file)
└── LICENSE             # MIT License
```

**Design Decisions:**

- **Single HTML file** — All sections live in one page for smooth scrolling navigation, which is the standard for personal portfolio sites.
- **Separate CSS and JS files** — Keeps concerns separated for maintainability and caching benefits.
- **CSS Custom Properties** — All colors, shadows, radii, and transitions are defined as variables in `:root` for easy theming.
- **No build step** — The site can be opened directly in a browser by double-clicking `index.html`. No `npm install`, no bundler, no configuration.

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning and contributing)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/satyambhanot/satyambhanot.github.io.git

# Navigate to the project
cd satyambhanot.github.io

# Open in your browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

No dependencies to install. No server required. It just works.

### Run with a Local Server (Optional)

For a more realistic development experience:

```bash
# Using Python (built into macOS)
python3 -m http.server 8000

# Then visit http://localhost:8000 in your browser
```

---

## Customization

### Changing Colors

All colors are defined as CSS custom properties in `styles.css`. Modify the `:root` block to change the entire theme:

```css
:root {
    --blue-500: #3b82f6;    /* Primary accent */
    --blue-600: #2563eb;    /* Buttons, links */
    --blue-700: #1d4ed8;    /* Hover states */
    --gray-900: #0f172a;    /* Headings */
    --gray-600: #475569;    /* Body text */
}
```

### Editing Typing Phrases

In `script.js`, find the `phrases` array:

```javascript
const phrases = [
    'build Android apps.',
    'analyze data with Python.',
    'solve real-world problems.',
    // Add or change phrases here
];
```

### Adding a New Project

In `index.html`, copy an existing `<div class="project-card">` block inside the projects grid and update the emoji, title, description, tech tags, and links.

### Adding a New Timeline Entry

Copy an existing `<div class="timeline-item">` block and update the date, title, place, and description.

---

## Performance & Accessibility

- **Semantic HTML** — Proper use of `<nav>`, `<section>`, `<footer>`, headings hierarchy, and ARIA labels.
- **No external dependencies** — Zero JavaScript libraries means zero extra network requests and no render-blocking resources.
- **Intersection Observer** — Scroll animations use the native Intersection Observer API instead of expensive scroll event listeners, ensuring smooth 60fps performance.
- **CSS animations** — All visual effects use CSS transforms and opacity, which are GPU-accelerated and don't trigger layout recalculations.
- **Responsive images** — The design uses CSS-based visuals and SVG icons, avoiding heavy image downloads.
- **Preconnect hints** — Google Fonts are loaded with `preconnect` for faster font delivery.

---

## Roadmap

- [ ] Add real project screenshots to replace emoji placeholders
- [ ] Integrate contact form with a backend service (Formspree or EmailJS)
- [ ] Add dark mode toggle with system preference detection
- [ ] Add a blog section for technical writing
- [ ] Add page load animations and page transition effects
- [ ] Set up a custom domain (e.g., `satyambhanot.dev`)
- [ ] Add SEO meta tags and Open Graph tags for link previews
- [ ] Add Google Analytics for visitor tracking

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this code with attribution.

---

## Contact

**Satyam Bhanot**

- **Email:** [satyambhanot@gmail.com](mailto:satyambhanot@gmail.com)
- **LinkedIn:** [linkedin.com/in/satyam-bhanot](https://linkedin.com/in/satyam-bhanot)
- **GitHub:** [github.com/satyambhanot](https://github.com/satyambhanot)
- **Portfolio:** [satyambhanot.github.io](https://satyambhanot.github.io)

---

> Built with care by Satyam Bhanot — 2025
