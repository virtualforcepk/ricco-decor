import { Link } from 'react-router-dom'
import { services } from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'

export function Services({ cta }: { cta?: { label: string; to: string } } = {}) {
  return (
    <section id="services" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <header
          data-reveal
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
              Every discipline of the room, under one roof
            </h2>
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

        {/* TODO(client): confirm the exact service taxonomy below. */}
        <ul className="mt-16 md:mt-20">
          {services.map((service, i) => (
            <li
              key={service.id}
              data-reveal
              data-service
              className="group grid grid-cols-1 gap-4 border-t border-brass/15 py-10 transition-colors md:grid-cols-12 md:gap-8 md:py-14"
            >
              <div className="md:col-span-1">
                <span className="font-display text-2xl font-light text-brass/70 md:text-3xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="md:col-span-6">
                <h3 className="font-display text-3xl font-medium leading-tight text-cream transition-colors group-hover:text-brass-bright sm:text-4xl md:text-5xl">
                  {service.title}
                </h3>
              </div>

              <div className="flex items-start md:col-span-5">
                <p className="max-w-md font-body text-base font-light leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </li>
          ))}
          {/* closing rule under the last item */}
          <li aria-hidden className="border-t border-brass/15" />
        </ul>
      </div>
    </section>
  )
}
