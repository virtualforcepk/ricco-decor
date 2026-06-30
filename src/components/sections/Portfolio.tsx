import { useState } from 'react'
import { Link } from 'react-router-dom'
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

/**
 * Masonry gallery of Ricco's real photography. Full on /gallery; a capped,
 * filter-less teaser on the home page (pass `limit` + `cta`).
 */
export function Portfolio({
  showHeader = true,
  showFilter = true,
  limit,
  cta,
}: {
  showHeader?: boolean
  showFilter?: boolean
  limit?: number
  cta?: { label: string; to: string }
} = {}) {
  const [filter, setFilter] = useState<Filter>('All')
  const filters: Filter[] = ['All', ...portfolioCategories]
  const filtered =
    filter === 'All' ? portfolio : portfolio.filter((t) => t.category === filter)
  const tiles = limit ? portfolio.slice(0, limit) : filtered

  return (
    <section id="portfolio" className="relative z-10 bg-ink px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {showHeader && (
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
            {cta && (
              <Link
                to={cta.to}
                className="group inline-flex shrink-0 items-center gap-2 border border-brass/50 px-6 py-3 font-body text-xs tracking-[0.2em] text-brass-bright uppercase transition-colors hover:bg-brass hover:text-ink"
              >
                {cta.label}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </header>
        )}

        {/* Category filter */}
        {showFilter && !limit && (
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
        )}

        {/* Masonry grid (CSS columns). */}
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
