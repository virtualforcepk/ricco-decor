# Ricco Decor — marketing site

A prerendered, multi-page marketing site for **Ricco Decor**, a luxury event
design house in Mississauga serving Toronto / GTA (South Asian weddings, mandaps,
florals, sangeets, corporate events). Dark, warm, editorial luxury · their real
work front and centre.

**Live:** https://ricco-decor.vercel.app · **Pages:** `/` · `/about` ·
`/services` · `/gallery` · `/contact`

## Stack

- **Vite 7 + React 19 + TypeScript**
- **vite-react-ssg** — prerenders a static HTML file per route (real, crawlable
  content + per-page `<head>`), with **React Router** for real `/path` URLs
- **Tailwind CSS v4** (`@theme` tokens in `src/index.css`)
- **GSAP + ScrollTrigger** + **Lenis** — smooth scroll, reveals, parallax
- **unhead** (via `<Seo>`) — per-page title/description/canonical/OG/JSON-LD
- **@fontsource** — Cormorant Garamond (display) + Jost (body)

## Run

```bash
npm install
npm run dev      # vite-react-ssg dev (http://localhost:5193)
npm run build    # tsc + prerender → dist/{index,about,services,gallery,contact}.html
npm run preview  # serve the build
```

## Architecture

```
src/
  main.tsx                   ← ViteReactSSG entry (routes → prerendered pages)
  routes.tsx                 ← / (Layout) → Home, About, Services, Gallery, Contact
  Layout.tsx                 ← Nav + Footer + scroll experience (per-route reveals)
  pages/                     ← one component per route (own <h1>, copy, photos, <Seo>)
  components/
    Seo.tsx                  ← per-page <head> (title/desc/canonical/OG/JSON-LD)
    layout/   Nav, Footer    ← React Router <Link> nav
    sections/ Hero, Positioning, Services, BiggestHits, Portfolio, Approach, Contact, ContactCta
    ui/       Eyebrow, Logo, PageHeader, PlaceholderImage
  data/
    content.ts               ← ALL copy + photo manifest + per-page SEO strings
    schema.ts                ← JSON-LD (LocalBusiness, Service, FAQ, Breadcrumb, CollectionPage)
```

## SEO

- **Prerendered**: each route ships real HTML (1300–4200 crawlable chars), not an
  empty `<div id="root">`. Lighthouse SEO **100/100**, on-page checklist **100/100**.
- Exactly one `<h1>` per page; unique title (≤60) + description (50–160); self
  canonical; OG/Twitter; `en-CA`.
- Structured data: `LocalBusiness` (real Mississauga NAP), `Service` per offer,
  `FAQPage`, `BreadcrumbList`, `CollectionPage`.
- `public/sitemap.xml` lists every route; `public/robots.txt` points to it;
  `vercel.json` serves clean URLs.

## ⚠️ Before a full launch (search `TODO`)

| What | Where | Notes |
|---|---|---|
| **Domain** | `components/Seo.tsx` (`SITE`), `sitemap.xml`, `robots.txt` | Canonicals/sitemap point at the Vercel URL — swap to the real domain. |
| **Form backend** | `sections/Contact.tsx` | MVP opens a pre-filled email (mailto). Upgrade to a GoHighLevel webhook / Formspree / serverless endpoint. |
| **Copy / taxonomy** | `data/content.ts` | Service copy, FAQs, and titles are drafted — confirm with the client. |
| **High-res photos + OG image** | `public/gallery/` | Web-res from the Wix CDN; originals + a dedicated 1200×630 OG image would be crisper. |

## Deploy

Hosted on **Vercel** (project `ricco-decor`). Redeploy with `vercel --prod`.
Repo: https://github.com/virtualforcepk/ricco-decor
