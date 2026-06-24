# Yash Agrawal — portfolio

Personal portfolio built with **Next.js 16** (App Router, TypeScript).

- `/` — the **Instrument** direction: a dark terminal / oscilloscope, with a typed-out
  terminal hero and a scroll-driven career timeline.

A second **Datasheet** direction (light engineering spec-sheet) is kept in
`app/_datasheet/` — preserved but hidden (the leading underscore makes it a private,
un-routed segment). Rename it back to `app/datasheet/` to re-enable that route.

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
  page.tsx                root — renders the Instrument page
  instrument/page.tsx     dark terminal direction
  _datasheet/page.tsx     light spec-sheet direction (hidden / not routed)
  *.module.css            scoped styles per route
lib/
  data.ts                 all content (projects, builds, wins, links, …)
  animations.ts           GSAP reveal / arc timeline / terminal typewriter
public/assets/            photos + résumé
```
