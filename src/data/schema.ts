import { SITE } from '../components/Seo'
import { services, socials, testimonial, faqs } from './content'

// ============================================================================
// JSON-LD builders. Ricco Decor is a real Mississauga business serving the GTA,
// so NAP (name/address/phone) is consistent everywhere — a genuine local signal.
// ============================================================================

const NAP = {
  name: 'Ricco Decor',
  telephone: '+1-647-808-9397',
  email: 'riccodecor@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1707 Sismet Road',
    addressLocality: 'Mississauga',
    addressRegion: 'ON',
    postalCode: 'L4W 2K8',
    addressCountry: 'CA',
  },
} as const

const areaServed = [
  { '@type': 'City', name: 'Toronto' },
  { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
  { '@type': 'AdministrativeArea', name: 'Ontario' },
]

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: NAP.name,
  url: `${SITE}/`,
  logo: `${SITE}/brand/ricco-logo.png`,
  image: `${SITE}/gallery/mandap-gold-red.jpg`,
  email: NAP.email,
  telephone: NAP.telephone,
  sameAs: socials.map((s) => s.href),
}

export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: NAP.name,
  url: `${SITE}/`,
}

export const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#business`,
  name: NAP.name,
  description:
    'Luxury event design and production for South Asian weddings, mandaps, florals, sangeets, and corporate events across Toronto and the Greater Toronto Area.',
  url: `${SITE}/`,
  telephone: NAP.telephone,
  email: NAP.email,
  image: `${SITE}/gallery/mandap-gold-red.jpg`,
  logo: `${SITE}/brand/ricco-logo.png`,
  priceRange: '$$$',
  address: NAP.address,
  areaServed,
  knowsLanguage: ['en'],
  sameAs: socials.map((s) => s.href),
  makesOffer: services.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.title, description: s.description },
  })),
  review: [
    {
      '@type': 'Review',
      reviewBody: testimonial.quote,
      author: { '@type': 'Person', name: testimonial.author },
    },
  ],
}

export function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE}${t.path}`,
    })),
  }
}

export function serviceSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    description,
    provider: { '@type': 'LocalBusiness', name: NAP.name, '@id': `${SITE}/#business` },
    areaServed,
  }
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export function collectionPage(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE}${path}`,
    isPartOf: { '@id': `${SITE}/#website` },
  }
}
