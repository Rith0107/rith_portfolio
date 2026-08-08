# Rithwik Lagishetty — Portfolio

My personal portfolio: a React + TypeScript single-page app with a dark, monochrome
design system built around macOS-style window chrome. Live at
**[rith-portfolio-eight.vercel.app](https://rith-portfolio-eight.vercel.app/)**.

## Stack

- **React 18 + TypeScript**, bundled with **Vite**
- **React Router** for client-side routing
- Plain CSS with a shared custom-property design system (`src/index.css`) — no
  CSS framework
- **pdfjs-dist** for an in-browser, lazy-loaded resume preview
- **Formspree** for the contact form backend (no server of my own)
- Deployed on **Vercel**

## Features

- A shared `WindowFrame` component (macOS-style traffic-light chrome) used
  throughout the site for project mockups, the resume viewer, and a couple of
  easter eggs
- Hand-built SVG project thumbnails designed to look like real technical
  artifacts (a confusion matrix, a predicted-vs-actual scatter plot, a
  generation pipeline diagram) rather than generic dashboard mockups
- A hidden Pac-Man mini-game, reachable by clicking the sprite that runs along
  the top of the hero window
- A small car-silhouette easter egg tucked into the Contact page footer
- Scroll-position memory: returning to a list page (e.g. via a case study's
  "back to work" link) restores where you were, while navigating to a page
  fresh always starts at the top
- Respects `prefers-reduced-motion` for every custom animation

## Project structure

```
src/
  components/   Shared UI: Nav, Footer, WindowFrame, resume/Pac-Man modals
  pages/        Route-level pages (Home/Work, Info, Contact, CaseStudy)
  data/         Work/experience entries shown on Home and Info
  hooks/        Small reusable hooks (scroll-driven glow, media queries)
public/
  projects/     Hand-built SVG mockups for each project card
  photos/       Photos used on the Info page
  cars/         Car-silhouette footer easter egg assets
```

## Getting started

```bash
npm install
npm run dev       # start the dev server at localhost:5173
npm run build     # type-check and produce a production build in dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

## Routing

- `/` — Info (landing page)
- `/work` — project list
- `/work/:slug` — case study detail (used for both projects and experience)
- `/contact` — contact form

`vercel.json` rewrites all paths to `index.html` so client-side routes don't
404 on a hard refresh or direct link.

## Contact form

The contact form posts to a Formspree endpoint configured in
`src/pages/Contact.tsx` (`FORM_ENDPOINT`). Submissions are emailed and kept in
the Formspree dashboard — there's no database of my own.
