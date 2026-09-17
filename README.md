# Eren Nova Kim — portfolio

Personal portfolio for Eren Nova Kim, product designer. One scrollable page (hero, selected
works, about, resume) with four case studies on their own routes.

## Running it

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (type-check then production build), `npm run preview`,
`npm run typecheck`.

## Stack

Vite, React and TypeScript, with React Router for the case study routes and MDX for case study
content. Styling is vanilla CSS: design tokens in `src/styles/tokens.css` and CSS Modules per
component. Deployed as a static site on Vercel; `vercel.json` carries the single-page-app rewrite
so `/work/:slug` survives a hard refresh.

## Adding or editing a case study

Case studies are MDX files in `src/content/work/`. Drop in a new file with the frontmatter below
and it appears in the works grid, gets its own route, and joins the next-project rotation. No
other file needs to change.

```yaml
---
slug: project-slug
title: Project name
subtitle: One line on what the project is.
summary: Two sentences for the works grid.
role: UI/UX Designer
timeframe: Month Year — Month Year
context: Team or organisation
tags: ['Research', 'Prototyping']
cover: /work/project-slug.svg
coverAlt: Description of the cover image
order: 1
inProgress: false # set true to show the "case study in progress" badge
---
```

Inside the body, these blocks are available without importing them: `Figure`, `Gallery`,
`SideBySide` with `Panel`, `Pullquote`, `Stats` and `Note`.

## Content that lives elsewhere

- Name, email, LinkedIn and resume path: `src/lib/site.ts`
- Resume timeline and skill groups: `src/lib/resume.ts`
- Resume PDF and images: `public/`

## Design rules this site holds to

These came from an annotated review of reference sites and are enforced in the token layer:

- Heading hierarchy comes from family, size and weight, never from capitalisation alone
- Body text is 17px minimum, never lighter than weight 400
- Secondary text holds 6:1 contrast, actions hold 7:1
- Card borders are visible rather than hairline
- Every call to action is a real button, placed with the work it refers to
- Motion is confined to `src/lib/useReveal.ts` and respects `prefers-reduced-motion`
