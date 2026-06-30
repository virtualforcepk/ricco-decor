import { brand, nav } from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'
import { Logo } from '../ui/Logo'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Warm light spill behind the wordmark — reads as a glow, not a hard
          vignette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(62% 52% at 50% 42%, rgba(200,168,98,0.18), rgba(94,31,43,0.10) 40%, rgba(12,10,9,0) 72%)',
        }}
      />
      {/* Floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3"
        style={{
          background:
            'linear-gradient(to top, rgba(200,168,98,0.06), rgba(12,10,9,0))',
        }}
      />

      <div className="relative">
        <Eyebrow className="justify-center" withTick={false}>
          {brand.region} · Luxury Event Design
        </Eyebrow>

        {/* Real Ricco Decor filigree logo, recolored brass over the 3D mandap.
            The sr-only text keeps a real <h1> for SEO. */}
        <h1 className="mt-8">
          <span className="sr-only">
            Ricco Decor — Luxury Event Design in Toronto &amp; the GTA
          </span>
          <Logo
            decorative
            tone="brass"
            className="mx-auto aspect-[3/2] w-[84vw] max-w-[540px] drop-shadow-[0_2px_24px_rgba(200,168,98,0.25)]"
          />
        </h1>

        <div className="mx-auto mt-6 h-px w-20 bg-brass/60" />

        <p className="mx-auto mt-8 max-w-2xl font-display text-2xl font-light italic leading-snug text-cream/90 sm:text-3xl">
          {brand.tagline}
        </p>

        <div className="mt-12">
          <a
            href={nav.cta.href}
            className="group inline-flex items-center gap-3 border border-brass/60 px-9 py-3.5 font-body text-sm tracking-[0.2em] text-brass-bright uppercase transition-colors hover:bg-brass hover:text-ink"
          >
            Inquire
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#positioning"
        aria-label="Scroll to explore"
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="eyebrow !text-[0.6rem] text-muted transition-colors group-hover:text-brass">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-brass/20">
          <span className="scroll-cue absolute left-0 top-0 block h-4 w-px bg-brass" />
        </span>
      </a>
    </section>
  )
}
