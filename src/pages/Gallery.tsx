import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Portfolio } from '../components/sections/Portfolio'
import { ContactCta } from '../components/sections/ContactCta'
import { pageSeo } from '../data/content'
import { collectionPage, breadcrumb } from '../data/schema'

export default function Gallery() {
  return (
    <>
      <Seo
        {...pageSeo.gallery}
        path="/gallery"
        jsonLd={[
          collectionPage(
            'Gallery — Ricco Decor',
            'Real weddings, mandaps, florals, and sangeets designed by Ricco Decor across Toronto and the GTA.',
            '/gallery',
          ),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/gallery' },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Selected Work"
        title="Rooms we have made unforgettable"
        intro="A gallery of weddings, mandaps, florals, and sangeets across the Greater Toronto Area — filter by category to explore."
      />

      <Portfolio showHeader={false} />

      <ContactCta />
    </>
  )
}
