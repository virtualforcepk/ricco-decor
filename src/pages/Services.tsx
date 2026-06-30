import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Eyebrow } from '../components/ui/Eyebrow'
import { ContactCta } from '../components/sections/ContactCta'
import { services, serviceImages, serviceLong, faqs, pageSeo } from '../data/content'
import { serviceSchema, faqSchema, breadcrumb } from '../data/schema'

export default function Services() {
  return (
    <>
      <Seo
        {...pageSeo.services}
        path="/services"
        jsonLd={[
          ...services.map((s) => serviceSchema(s.title, s.description)),
          faqSchema,
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Our Services"
        title="Designed, built, and styled in full"
        intro="From hand-carved mandaps to cascading florals and printed vinyl floors — every discipline of your celebration, under one roof, by one in-house team."
      />

      {/* Service blocks, alternating image / copy */}
      <section className="relative z-10 px-6 pb-8">
        <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
          {services.map((s, i) => {
            const img = serviceImages[s.id]
            const reverse = i % 2 === 1
            return (
              <article
                key={s.id}
                data-reveal
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <div className={reverse ? 'md:order-2' : ''}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-sm object-cover"
                  />
                </div>
                <div className={reverse ? 'md:order-1' : ''}>
                  <span className="font-display text-2xl font-light text-brass/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-cream sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 font-body text-base font-light leading-relaxed text-cream/80 md:text-lg">
                    {s.description}
                  </p>
                  <p className="mt-4 max-w-md font-body text-base font-light leading-relaxed text-muted">
                    {serviceLong[s.id]}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div data-reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-cream sm:text-5xl">
              Frequently asked
            </h2>
          </div>
          <dl className="mt-10 border-t border-brass/15">
            {faqs.map((f) => (
              <div key={f.q} data-reveal className="border-b border-brass/15 py-6">
                <dt className="font-display text-xl text-cream md:text-2xl">
                  {f.q}
                </dt>
                <dd className="mt-3 font-body text-base font-light leading-relaxed text-muted">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
