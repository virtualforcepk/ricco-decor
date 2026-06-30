# Ricco Decor — immersive 3D marketing site

A single-page, immersive site for **Ricco Decor**, a luxury event design company in
Toronto / GTA. A fixed WebGL mandap resolves from glowing wireframe to warm
photoreal as you scroll, while a fast, SEO-clean 2D portfolio proves the work.

Dark, warm, editorial luxury · slow cinematic motion.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (`@theme` tokens in `src/index.css`)
- **three / @react-three/fiber / drei / postprocessing** — the 3D system
- **GSAP + ScrollTrigger** + **Lenis** — one scroll value drives the camera,
  the wireframe→photoreal transition, and section reveals
- **@fontsource** — Cormorant Garamond (display) + Jost (body)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build
```

## Architecture

A fixed full-viewport `<Canvas>` (`z-0`, lazy-loaded, `pointer-events-none`,
`aria-hidden`) sits **behind** all semantic content (`z-10`). All copy lives in
the DOM — never inside WebGL — so the site reads and ranks as a normal page with
3D disabled.

```
src/
  data/content.ts            ← ALL copy (single source of truth)
  index.css                  ← design tokens (@theme) + global styles
  App.tsx                    ← owns the scrollRef, assembles the page
  hooks/useScrollExperience  ← Lenis → GSAP ScrollTrigger → one scroll value (0→1)
  components/
    layout/   Nav, Footer
    sections/ Hero, Positioning, Services, Portfolio, Approach, Contact
    ui/       Eyebrow, PlaceholderImage
    three/    ThreeBackground (lazy) → Scene → Mandap + Florals + Lighting
```

**One scroll value** (`App` → `useScrollExperience` writes it; `Scene` reads it):
the wireframe resolves to photoreal in the first ~25%; the camera glides a
cinematic path across the full hero→portfolio span. `prefers-reduced-motion`
disables the smooth-scroll hijack, freezes the 3D at a resolved still, and
replaces reveals with plain visibility.

## Retuning the brand

All design tokens are CSS variables in the `@theme` block of `src/index.css`
(`--color-brass`, `--color-ink`, fonts, …). Edit there and the whole site
retunes. All copy is in `src/data/content.ts`.

## ⚠️ Stubbed assets — replace before launch (search `TODO`)

| What | Where | Notes |
|---|---|---|
| **Photography** | `ui/PlaceholderImage.tsx` (every use) | Labeled placeholders at correct aspect ratios. Swap each for `<img>`. **Do not use random web images.** |
| **Logo** | `Nav.tsx`, `Footer.tsx`, `public/favicon.svg` | Text wordmark + a mandap favicon mark stand in for the real logo. |
| **Mandap GLTF** | `three/Mandap.tsx` (marked seam) | Procedural now. Drop a Spline/Blender Draco `.glb` via `useGLTF`; keep the `progress` crossfade. |
| **Form backend** | `sections/Contact.tsx` `handleSubmit` | Stub simulates success. Wire GoHighLevel webhook / Formspree / email. |
| **Contact + socials** | `data/content.ts` | Email, phone, Instagram/Facebook/Pinterest are placeholders. |
| **SEO domain + OG image** | `index.html`, `public/robots.txt`, `public/sitemap.xml` | Set the real `riccodecor.com` domain + a 1200×630 OG image. |
| **Service taxonomy / copy** | `data/content.ts` | All copy is suggested — confirm with the client. |

## Performance

First paint ships only the semantic shell + scroll engine (~120 kB gzip). The
three.js stack (~255 kB gzip) is code-split and lazy-loaded with the `<Canvas>`.
`dpr` is capped (lower on mobile), florals are instanced, and bloom is
perf-gated (off on small screens / reduced-motion).
