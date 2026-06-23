# Yash Agrawal — portfolio

Personal portfolio built with **Next.js 16** (App Router, TypeScript). Two design
directions share one typed content module:

- `/instrument` — dark terminal / oscilloscope, with a typed-out terminal hero and a
  scroll-driven career timeline.
- `/datasheet` — light engineering spec-sheet, with boxed sections, a revision
  history, and an ordering table.
- `/` — landing chooser between the two.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript, CSS Modules
- `next/font` (Bricolage Grotesque · IBM Plex Mono · Hanken Grotesk)
- GSAP + ScrollTrigger for reveals, the scroll timeline, and the terminal typewriter
- `prefers-reduced-motion` respected throughout

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.tsx              root layout, fonts, metadata
  page.tsx                landing chooser
  instrument/page.tsx     dark terminal direction
  datasheet/page.tsx      light spec-sheet direction
  *.module.css            scoped styles per route
lib/
  data.ts                 all content (projects, builds, wins, links, …)
  animations.ts           GSAP reveal / arc timeline / terminal typewriter
public/assets/            photos + résumé
```
