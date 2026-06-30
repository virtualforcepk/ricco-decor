import { useState } from 'react'
import {
  portfolio,
  portfolioCategories,
  portfolioIntro,
  type PortfolioCategory,
} from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'

type Filter = 'All' | PortfolioCategory

const ratioClass: Record<string, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[3/2]',
  square: 'aspect-square',
}

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('All')
  const filters: Filter[] = ['All', ...portfolioCategories]
  const tiles =
    filter === 'All'
      ? portfolio
      : portfolio.filter((t) => t.category === filter)

  return (
    // Solid warm-dark background — this is where we deliberately exit the 3D
    // feel into a fast, clean 2D gallery of Ricco's real work.
    <section id="portfolio" className="relative z-10 bg-ink px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <header
          data-reveal
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <Eyebrow>{portfolioIntro.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
              {portfolioIntro.title}
            </h2>
            <p className="mt-5 max-w-xl font-body text-base font-light leading-relaxed text-muted">
              {portfolioIntro.description}
            </p>
          </div>
        </header>

        {/* Category filter */}
        <div
          data-reveal
          className="mt-10 flex flex-wrap gap-2.5"
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {filters.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={[
                  'border px-5 py-2 font-body text-xs tracking-[0.18em] uppercase transition-colors',
                  active
                    ? 'border-brass bg-brass text-ink'
                    : 'border-brass/25 text-muted hover:border-brass/60 hover:text-cream',
                ].join(' ')}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Masonry grid of Ricco's real photography (CSS columns). */}
        <div className="mt-12 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {tiles.map((tile) => (
            <figure
              key={tile.id}
              className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-sm bg-raised"
            >
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                decoding="async"
                className={[
                  'w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.05]',
                  ratioClass[tile.ratio],
                ].join(' ')}
              />

              {/* Always-on bottom scrim so the title is legible on touch too;
                  deepens on hover for desktop. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="eyebrow !text-[0.6rem] text-brass-bright">
                  {tile.category}
                </span>
                <h3 className="mt-1.5 font-display text-xl leading-tight text-cream transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-2xl">
                  {tile.title}
                </h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
