import { Head } from 'vite-react-ssg'

// Per-page SEO head. vite-react-ssg + unhead inject these into the prerendered
// HTML, so each route ships its own title/description/canonical/OG/JSON-LD.
//
// TODO(client): set SITE to the real production domain once live. Canonicals
// are self-referencing to the deployed domain so this build is the indexed one.
export const SITE = 'https://ricco-decor.vercel.app'

export function Seo({
  title,
  description,
  path,
  image = '/gallery/mandap-gold-red.jpg',
  jsonLd,
}: {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: object | object[]
}) {
  const url = SITE + path
  const img = SITE + image
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ricco Decor" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_CA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  )
}
