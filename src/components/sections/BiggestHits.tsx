import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { biggestHits, testimonial } from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// <BiggestHits /> — a cinematic, scroll-driven travel through Ricco's real
// best work. Each hit is a tall full-bleed photo that parallax-drifts as it
// passes (motion tied to scroll, never autoplay), with a captioned title that
// reveals via the global [data-reveal] system. Reduced-motion: no parallax,
// images sit still.
// ============================================================================

export function BiggestHits() {
  const scope = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray<HTMLImageElement>('[data-parallax]')
      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('figure'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hits" ref={scope} className="relative z-10 bg-ink">
      <header className="mx-auto max-w-7xl px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>Our Biggest Hits</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
            A walk through the work
          </h2>
        </div>
      </header>

      <div className="flex flex-col">
        {biggestHits.map((hit, i) => (
          <figure
            key={hit.id}
            className="group relative h-[72vh] overflow-hidden md:h-[88vh]"
          >
            {/* Parallax image (scaled to leave room for the drift) */}
            <img
              data-parallax
              src={hit.src}
              alt={hit.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
            />
            {/* Cinematic scrims: darken top+bottom for text, plus a side wash. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40"
            />
            <div
              aria-hidden
              className={[
                'absolute inset-0',
                i % 2 === 0
                  ? 'bg-gradient-to-r from-ink/80 via-transparent to-transparent'
                  : 'bg-gradient-to-l from-ink/80 via-transparent to-transparent',
              ].join(' ')}
            />

            <figcaption
              className={[
                'absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-14 md:pb-20',
                i % 2 === 0 ? 'items-start text-left' : 'items-end text-right',
              ].join(' ')}
            >
              <div data-reveal className="max-w-xl">
                <Eyebrow withTick={i % 2 === 0}>{hit.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-display text-4xl font-light leading-[1.05] text-cream sm:text-5xl md:text-6xl">
                  {hit.title}
                </h3>
                <p className="mt-4 font-body text-base font-light leading-relaxed text-cream/75 sm:text-lg">
                  {hit.caption}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Real client testimonial — a quiet close to the journey. */}
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <div data-reveal>
          <span aria-hidden className="mx-auto mb-8 block h-px w-12 bg-brass/50" />
          <blockquote className="font-display text-3xl font-light italic leading-snug text-cream sm:text-4xl">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <p className="eyebrow mt-6 justify-center">— {testimonial.author}</p>
        </div>
      </div>
    </section>
  )
}
