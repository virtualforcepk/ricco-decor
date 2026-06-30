// ============================================================================
// RICCO DECOR — site content (single source of truth for all copy)
// ----------------------------------------------------------------------------
// Brand DNA, services, testimonial, socials, and portfolio extracted from the
// live site (riccodecor.com) + gallery. Photography is Ricco's real work,
// downloaded into /public/gallery. TODO(client): confirm titles & final copy.
// ============================================================================

export const brand = {
  name: 'Ricco Decor',
  wordmark: ['RICCO', 'DECOR'] as const,
  logo: '/brand/ricco-logo.png', // real filigree logo (black art → masked brass)
  tagline:
    "We don't just decorate spaces. We architect unforgettable experiences.",
  region: 'Toronto & GTA',
  // Real Ricco Decor contact details (from riccodecor.com/contact).
  email: 'riccodecor@gmail.com',
  phone: '647-808-9397',
  phoneHref: 'tel:+16478089397',
  emailHref: 'mailto:riccodecor@gmail.com',
  address: '1707 Sismet Road, Mississauga, ON L4W 2K8',
  site: 'https://www.riccodecor.com',
}

export const nav = {
  links: [
    { label: 'Work', href: '#hits' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#portfolio' },
    { label: 'Approach', href: '#approach' },
  ],
  cta: { label: 'Inquire', href: '#contact' },
}

export const positioning = {
  eyebrow: 'Traditional & Royal · Modern & Sophisticated',
  // Lightly polished from Ricco's real brand statement.
  statement:
    'Ricco Decor is a luxury event design house serving Toronto and the GTA. We design the room before it exists — then build it in full.',
}

export const testimonial = {
  quote: 'Most professional operation I have worked with. The very best.',
  author: 'Katie Jones',
}

// Real Ricco service taxonomy. TODO(client): confirm one-line descriptions.
export const services = [
  {
    id: 'weddings',
    title: 'Weddings & Receptions',
    description:
      'Full-scale design for South Asian weddings and receptions — traditional, royal, modern, or sophisticated.',
  },
  {
    id: 'mandaps',
    title: 'Mandaps',
    description:
      'Hand-carved gold, ivory, and floral mandaps built as the centerpiece of your ceremony.',
  },
  {
    id: 'florals',
    title: 'Florals & Stage Design',
    description:
      'Cascading florals and architectural stages — roses by the thousand, engineered to scale.',
  },
  {
    id: 'sangeet',
    title: 'Lady Sangeet & Mehndi',
    description:
      'Colour-drenched sangeet and mehndi setups — drapes, swings, and printed floors.',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description:
      'Galas, launches, and brand activations designed and produced end to end.',
  },
  {
    id: 'signage',
    title: 'Welcome Signs & Vinyl Floors',
    description:
      'Custom signage and printed vinyl floors that carry your theme underfoot.',
  },
] as const

export type PortfolioCategory =
  | 'Mandaps'
  | 'Receptions'
  | 'Florals'
  | 'Sangeet & Mehndi'

export const portfolioCategories: PortfolioCategory[] = [
  'Mandaps',
  'Receptions',
  'Florals',
  'Sangeet & Mehndi',
]

// Ricco's real work (photos in /public/gallery). ratio is an aspect hint so the
// masonry reserves space (no layout shift); images are object-cover within it.
export const portfolio: {
  id: string
  title: string
  category: PortfolioCategory
  src: string
  alt: string
  ratio: 'portrait' | 'landscape' | 'square'
}[] = [
  { id: 'mandap-gold-red', title: 'The Royal Gold Mandap', category: 'Mandaps', src: '/gallery/mandap-gold-red.jpg', alt: 'Carved gold mandap crowned with a canopy of red roses and gold thrones', ratio: 'landscape' },
  { id: 'reception-candlelit', title: 'Candlelit Garden Reception', category: 'Receptions', src: '/gallery/reception-candlelit.jpg', alt: 'Dark reception with white floral arches lit by chandeliers and candlelight, ghost chairs', ratio: 'landscape' },
  { id: 'sangeet-color', title: 'A Sangeet in Full Colour', category: 'Sangeet & Mehndi', src: '/gallery/sangeet-color.jpg', alt: 'Vibrant sangeet with rainbow ceiling drapes and a patterned printed vinyl floor', ratio: 'landscape' },
  { id: 'florals-cascade', title: 'Cascading Rose Stage', category: 'Florals', src: '/gallery/florals-cascade.jpg', alt: 'Cascading pink and blush roses pouring over a gold-framed sweetheart loveseat', ratio: 'landscape' },
  { id: 'mandap-garden', title: 'Garden Floral Mandap', category: 'Mandaps', src: '/gallery/mandap-garden.jpg', alt: 'Outdoor floral mandap with white roses and blush drapes in a garden gazebo', ratio: 'landscape' },
  { id: 'reception-arches', title: 'Ivory & Gold Reception', category: 'Receptions', src: '/gallery/reception-arches.jpg', alt: 'Modern reception stage with gold geometric arches, ivory drapes and white florals', ratio: 'landscape' },
  { id: 'sangeet-swing', title: 'Rainbow Sangeet Swing', category: 'Sangeet & Mehndi', src: '/gallery/sangeet-swing.jpg', alt: 'Bride on a decorated swing framed by rainbow drapes and gold urns', ratio: 'portrait' },
  { id: 'reception-starlight', title: 'Starlight Reception', category: 'Receptions', src: '/gallery/reception-starlight.jpg', alt: 'Reception stage against a starry backdrop with purple uplighting and white florals', ratio: 'landscape' },
  { id: 'mandap-marquee', title: 'Marquee Mandap Ceremony', category: 'Mandaps', src: '/gallery/mandap-marquee.jpg', alt: 'Carved ivory mandap and floral aisle in a garden marquee with chiavari chairs', ratio: 'portrait' },
  { id: 'stage-royal-ivory', title: 'Ivory Royal Stage', category: 'Receptions', src: '/gallery/stage-royal-ivory.jpg', alt: 'Ornate ivory carved wedding stage with greenery garlands and a tufted loveseat', ratio: 'landscape' },
  { id: 'mandap-gold-aisle', title: 'Gold Mandap & Petal Aisle', category: 'Mandaps', src: '/gallery/mandap-gold-aisle.jpg', alt: 'White and gold mandap at the end of a rose-petal aisle in a ballroom', ratio: 'square' },
  { id: 'reception-blossom', title: 'Blossom Sweetheart Table', category: 'Florals', src: '/gallery/reception-blossom.jpg', alt: 'Sweetheart table with cherry blossom trees and florals under purple uplighting', ratio: 'landscape' },
]

export const portfolioIntro = {
  eyebrow: 'Selected Work',
  title: 'Rooms we have made unforgettable',
  description:
    'A selection of weddings, mandaps, florals, and sangeets across the Greater Toronto Area.',
}

// The cinematic "biggest hits" journey — large real photos scrolled through.
export const biggestHits = [
  {
    id: 'hit-mandap',
    src: '/gallery/mandap-gold-red.jpg',
    eyebrow: 'Mandaps',
    title: 'The Royal Mandap',
    caption: 'Hand-carved gold, crowned in a canopy of roses.',
    alt: 'Carved gold mandap with a red rose canopy and gold thrones',
  },
  {
    id: 'hit-candlelit',
    src: '/gallery/reception-candlelit.jpg',
    eyebrow: 'Receptions',
    title: 'Candlelight & Florals',
    caption: 'A dark room turned luminous with white florals and flame.',
    alt: 'Dark candlelit reception with white floral arches and ghost chairs',
  },
  {
    id: 'hit-sangeet',
    src: '/gallery/sangeet-color.jpg',
    eyebrow: 'Lady Sangeet',
    title: 'A Sangeet in Full Colour',
    caption: 'Every hue, suspended — and a floor printed to match.',
    alt: 'Colourful sangeet with rainbow drapes and a printed vinyl floor',
  },
  {
    id: 'hit-florals',
    src: '/gallery/florals-cascade.jpg',
    eyebrow: 'Florals',
    title: 'Florals That Pour',
    caption: 'Roses by the thousand, cascading over gold.',
    alt: 'Cascading pink roses over a gold-framed loveseat',
  },
  {
    id: 'hit-modern',
    src: '/gallery/reception-arches.jpg',
    eyebrow: 'Receptions',
    title: 'Modern Royalty',
    caption: 'Ivory drapes, gold geometry, quiet restraint.',
    alt: 'Reception with gold geometric arches and ivory drapes',
  },
]

export const approach = {
  eyebrow: 'How We Work',
  title: 'From first conversation to final candle',
  steps: [
    {
      n: '01',
      title: 'Consultation',
      description:
        'We listen first — your story, your guests, and the feeling you want them to carry home.',
    },
    {
      n: '02',
      title: 'Design & 3D Visualization',
      description:
        'We design the room before it exists. You walk it in 3D, then approve every detail.',
    },
    {
      n: '03',
      title: 'Production',
      description:
        'Fabrication, florals, and logistics handled in full by our in-house team.',
    },
    {
      n: '04',
      title: 'Event Day',
      description:
        'We build, style, and stand by — so you arrive to a finished room and simply celebrate.',
    },
  ],
} as const

export const contact = {
  eyebrow: 'Begin Your Event',
  title: 'Let us architect your celebration',
  invitation:
    'Tell us about your day. We design a limited number of events each season — the earlier we talk, the more we can build.',
  // TODO(client): confirm the event-type options Ricco wants to capture.
  eventTypes: [
    'Wedding',
    'Reception',
    'Mandap / Ceremony',
    'Lady Sangeet / Mehndi',
    'Corporate Event',
    'Other',
  ],
}

// Real Ricco socials (from riccodecor.com). TODO(client): add TikTok if any.
export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/riccodecor/', handle: '@riccodecor' },
  { label: 'Facebook', href: 'https://www.facebook.com/Ricco-Decor-762409177172737/', handle: 'Ricco Decor' },
]

export const footer = {
  blurb:
    'A luxury event design house for weddings, mandaps, and corporate celebrations across Toronto and the GTA — traditional and royal to modern and sophisticated.',
}
