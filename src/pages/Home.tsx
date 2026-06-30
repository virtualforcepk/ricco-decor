import { Seo } from '../components/Seo'
import { Hero } from '../components/sections/Hero'
import { Positioning } from '../components/sections/Positioning'
import { Services } from '../components/sections/Services'
import { BiggestHits } from '../components/sections/BiggestHits'
import { Portfolio } from '../components/sections/Portfolio'
import { ContactCta } from '../components/sections/ContactCta'
import { pageSeo } from '../data/content'
import { organization, website, localBusiness } from '../data/schema'

export default function Home() {
  return (
    <>
      <Seo
        {...pageSeo.home}
        path="/"
        jsonLd={[organization, website, localBusiness]}
      />
      <Hero />
      <Positioning />
      <Services cta={{ label: 'All services', to: '/services' }} />
      <BiggestHits />
      <Portfolio
        showFilter={false}
        limit={6}
        cta={{ label: 'Full gallery', to: '/gallery' }}
      />
      <ContactCta />
    </>
  )
}
