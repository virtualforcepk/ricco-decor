# Ricco Decor — marketing site

A single-page, editorial marketing site for **Ricco Decor**, a luxury event
design house in Toronto / GTA (South Asian weddings, mandaps, florals, corporate
events). Dark, warm, editorial luxury · slow cinematic motion · their real work
front and centre.

**Live:** https://ricco-decor.vercel.app

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (`@theme` tokens in `src/index.css`)
- **GSAP + ScrollTrigger** + **Lenis** — smooth scroll, section reveals, and the
  parallax in the "Biggest Hits" journey
- **@fontsource** — Cormorant Garamond (display) + Jost (body)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build
```

## Architecture

```
src/
  data/content.ts            ← ALL copy + photo manifest (single source of truth)
  index.css                  ← design tokens (@theme) + global styles
  App.tsx                    ← assembles the page
  hooks/useScrollExperience  ← Lenis smooth scroll + GSAP reveals
  components/
    layout/   Nav, Footer
    sections/ Hero, Positioning, Services, BiggestHits, Portfolio, Approach, Contact
    ui/       Eyebrow, Logo, PlaceholderImage
```

All copy is semantic HTML for SEO/accessibility. `prefers-reduced-motion`
disables the smooth-scroll hijack and shows content without motion.

## Brand assets

Ricco's real logo (`public/brand/`) and photography (`public/gallery/`) were
pulled from riccodecor.com. The logo is black line-art, recolored to brass via a
CSS mask (`components/ui/Logo.tsx`). Retune the palette in the `@theme` block of
`src/index.css`; edit all copy in `src/data/content.ts`.

## ⚠️ Before a full launch (search `TODO`)

| What | Where | Notes |
|---|---|---|
| **Form backend** | `sections/Contact.tsx` | MVP opens a pre-filled email (mailto). Upgrade to a GoHighLevel webhook / Formspree / serverless endpoint. |
| **Copy / taxonomy** | `data/content.ts` | Service one-liners and project titles are suggested — confirm with the client. |
| **High-res photos** | `public/gallery/` | Current images are web-res from the Wix CDN; originals would be crisper. |
| **OG image + domain** | `index.html`, `public/{robots,sitemap}` | Set the real production domain; a dedicated 1200×630 OG image is ideal. |

## Deploy

Hosted on **Vercel** (project `ricco-decor`). Redeploy with `vercel --prod` from
this folder. Repo: https://github.com/virtualforcepk/ricco-decor
