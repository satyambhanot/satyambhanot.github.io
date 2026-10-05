# satyambhanot.com

My personal site. Live at [satyambhanot.com](https://satyambhanot.com).

## Where things are

There are only two places you'll normally edit:

```text
src/
├── site.ts        ← your info: intro, Now, education, experience, tools, links, résumé
└── projects/      ← one Markdown file per project
```

Everything else is the machinery that turns those into the site:

```text
src/
├── images/        project screenshots
├── pages/         index.astro (the home page), projects/[slug].astro (case studies), 404
├── components/    Layout (header + footer), ProjectTile, Icon
├── styles.css     colours, sizes, and all styling
└── content.config.ts   the list of fields a project file can have
public/            favicon, social preview image, résumé PDF, domain name
```

## Common changes

**Add your résumé.** Put the PDF at `public/resume.pdf`, then change `resume: ''` to
`resume: '/resume.pdf'` in `src/site.ts`. Résumé buttons appear in the header, the intro, and the
contact section.

**Add a degree or a job.** Add one entry to the top of `education` or `experience` in `src/site.ts`.

**Add a project.** Create `src/projects/<name>.md`:

```markdown
---
title: My project
summary: One sentence on what it does.
order: 3                    # position on the home page; 1 gets the big tile
type: Backend               # any short category: Backend, Data, Machine learning, Web...
period: Nov 2026            # optional
context: Course or event    # optional
team: Solo                  # optional
role: What I built          # optional
stack: [Python, FastAPI]
takeaway: One line on what it taught me.   # shown on the tile
repo: https://github.com/satyambhanot/my-project   # optional; hidden if missing
---
```

- **No text below the `---`:** the project is a tile on the home page, and that's all.
- **Text below the `---`:** the project also gets its own page at `/projects/<name>/`, and its
  tile gets a "Read the case study" link. Use this for your strongest work. See
  `src/projects/lamplighter.md` for an example with a cover image and figures.

If a required field is missing or a link isn't a real URL, the build stops and says which
file is wrong.

## Run it locally

Needs Node 22.12 or newer.

```bash
npm install
npm run dev       # open http://localhost:4321; it reloads as you edit
```

> **iCloud note.** This folder is on an iCloud-synced Desktop, which can freeze `npm install`
> and builds. Fix it once with
> `mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules`
> (iCloud skips anything ending in `.nosync`), or keep the repo outside `~/Desktop`.

Pushing to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`).

## Why it's built this way

The main readers are recruiters and hiring managers, who usually spend less than a minute on a
portfolio. Every choice below aims to answer their questions quickly: who is this, what have they
built, and how do I reach them.

| Decision | Why |
| --- | --- |
| **One main page** instead of separate Work, About, and Notes pages | Nobody has to guess where something is. Scrolling shows everything in order: who I am, projects, experience, contact. |
| **Email, LinkedIn, GitHub, and résumé buttons in the first screen** | The most common next step for a recruiter is to save or forward a candidate. They shouldn't have to hunt for a way to do it. |
| **"Now" and "Open to" tiles at the top** | They answer "is this person available, and for what?" before any scrolling. |
| **Projects right after the intro, strongest first** | Work is the evidence. The first project starts within the first screen on both laptop and phone. |
| **Case-study pages only for projects with real depth** (Lamplighter, Where's Waldo) | A click should always lead to something worth reading. Smaller projects show their summary and lesson right on the tile, with no click needed. |
| **"Back to projects" at the top and bottom of every case study** | You can always get back to where you were, even if you arrived from a link on LinkedIn. |
| **Pinned header with Projects, Experience, Contact** | It's one long page, so the links stay at the top of the screen. They work the same from every page, and the logo always goes home. On phones it stays one row. |
| **Code links only where a public repo exists** | The old site's "GitHub" buttons all opened the profile page. A link that doesn't go where it says costs trust. |
| **No photo** | Your choice. The design leans on typography and project screenshots instead. |
| **Bento grid with one lime accent** | Distinct from the usual template look, easy to scan, and every tile is one idea. Lime is used only for "Now" and the main buttons, so it points at what matters. |
| **Light and dark themes**, AA contrast in both | Follows the visitor's system setting, and every text colour pair passes WCAG AA (lowest 5.4:1). |
| **Astro static site** instead of hand-written HTML | Adding a project is one file instead of copying HTML into several pages. Images are resized automatically, and pages still load as plain HTML. |
| **Works without JavaScript** | Content is never hidden behind scripts. JS only powers the theme toggle and the copy-email button. |

## License

[MIT](LICENSE)
