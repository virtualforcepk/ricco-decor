import { Link } from 'react-router-dom'
import { brand } from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'

// A conversion band that points to the full /contact page (used on Home + other
// pages) so the inquiry form lives in exactly one place.
export function ContactCta() {
  return (
    <section className="relative z-10 border-t border-brass/10 bg-raised/40 px-6 py-24 text-center md:py-32">
      <div data-reveal className="mx-auto max-w-3xl">
        <Eyebrow className="justify-center">Begin Your Event</Eyebrow>
        <h2 className="mt-6 font-display text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
          Let us architect your celebration
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-muted">
          We design a limited number of events each season across Toronto and
          the GTA. The earlier we talk, the more we can build for you.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 border border-brass bg-brass px-9 py-3.5 font-body text-sm tracking-[0.2em] text-ink uppercase transition-colors hover:bg-brass-bright"
          >
            Start an Inquiry
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href={brand.phoneHref}
            className="font-body text-base font-light tracking-wide text-muted transition-colors hover:text-cream"
          >
            or call {brand.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
