import { approach } from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'

export function Approach() {
  return (
    <section id="approach" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <header data-reveal className="max-w-2xl">
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
            {approach.title}
          </h2>
        </header>

        <ol className="relative mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:gap-x-8">
          {/* Connecting rule across the band on desktop */}
          <span
            aria-hidden
            className="absolute top-[1.1rem] right-0 left-0 hidden h-px bg-gradient-to-r from-brass/0 via-brass/30 to-brass/0 md:block"
          />
          {approach.steps.map((step) => (
            <li key={step.n} data-reveal className="relative">
              <div className="flex items-center gap-4 md:block">
                <span className="relative z-10 inline-block bg-ink pr-3 font-display text-5xl font-light text-brass md:pr-4 md:text-6xl">
                  {step.n}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-medium text-cream md:mt-6 md:text-[1.7rem]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs font-body text-sm font-light leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
