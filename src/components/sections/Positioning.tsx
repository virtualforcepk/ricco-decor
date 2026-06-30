import { positioning } from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'

export function Positioning() {
  return (
    <section
      id="positioning"
      className="relative z-10 mx-auto max-w-5xl px-6 py-28 text-center md:py-40"
    >
      <div data-reveal>
        <Eyebrow className="justify-center">{positioning.eyebrow}</Eyebrow>
      </div>

      <p
        data-reveal
        className="mx-auto mt-10 max-w-4xl font-display text-3xl font-light leading-[1.18] text-cream sm:text-4xl md:text-5xl"
      >
        {positioning.statement}
      </p>
    </section>
  )
}
