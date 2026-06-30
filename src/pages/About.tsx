import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Approach } from '../components/sections/Approach'
import { ContactCta } from '../components/sections/ContactCta'
import { about, testimonial, pageSeo } from '../data/content'
import { localBusiness, breadcrumb } from '../data/schema'

export default function About() {
  return (
    <>
      <Seo
        {...pageSeo.about}
        path="/about"
        jsonLd={[
          localBusiness,
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <PageHeader eyebrow={about.eyebrow} title={about.title} intro={about.lead} />

      {/* Story + image */}
      <section className="relative z-10 px-6 pb-8 md:pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div data-reveal className="space-y-6">
            {about.story.map((p, i) => (
              <p
                key={i}
                className="font-body text-base font-light leading-relaxed text-muted md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
          <div data-reveal>
            <img
              src="/gallery/mandap-gold-red.jpg"
              alt="A carved gold mandap crowned with red roses, designed by Ricco Decor"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Eyebrow>Why Ricco</Eyebrow>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {about.values.map((v) => (
              <div key={v.title} data-reveal className="border-t border-brass/15 pt-6">
                <h2 className="font-display text-2xl text-cream md:text-3xl">
                  {v.title}
                </h2>
                <p className="mt-3 max-w-md font-body text-base font-light leading-relaxed text-muted">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Approach />

      {/* Testimonial */}
      <section className="px-6 py-20 text-center md:py-28">
        <div data-reveal>
          <span aria-hidden className="mx-auto mb-8 block h-px w-12 bg-brass/50" />
          <blockquote className="mx-auto max-w-3xl font-display text-3xl font-light italic leading-snug text-cream sm:text-4xl">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <p className="eyebrow mt-6 justify-center">— {testimonial.author}</p>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
