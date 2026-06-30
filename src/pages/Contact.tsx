import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Contact as ContactSection } from '../components/sections/Contact'
import { brand, pageSeo } from '../data/content'
import { localBusiness, breadcrumb } from '../data/schema'

export default function Contact() {
  return (
    <>
      <Seo
        {...pageSeo.contact}
        path="/contact"
        jsonLd={[
          localBusiness,
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Get in Touch"
        title="Let's design your celebration"
        intro="Call, email, or send the form below. We design a limited number of events each season across Toronto and the GTA."
      />

      <ContactSection heading={false} />

      {/* Location map (no API key needed) — reinforces the local NAP signal. */}
      <section className="relative z-10 bg-ink px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="eyebrow mb-5">Based in Mississauga · Serving the GTA</h2>
          <iframe
            title={`${brand.name} location — ${brand.address}`}
            src="https://www.google.com/maps?q=1707+Sismet+Road,+Mississauga,+ON+L4W+2K8&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full rounded-sm border border-brass/15 grayscale-[0.2]"
          />
        </div>
      </section>
    </>
  )
}
