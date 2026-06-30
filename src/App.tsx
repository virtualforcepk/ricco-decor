import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Positioning } from './components/sections/Positioning'
import { Services } from './components/sections/Services'
import { BiggestHits } from './components/sections/BiggestHits'
import { Portfolio } from './components/sections/Portfolio'
import { Approach } from './components/sections/Approach'
import { Contact } from './components/sections/Contact'
import { useScrollExperience } from './hooks/useScrollExperience'

function App() {
  // Lenis smooth scroll + GSAP ScrollTrigger reveals.
  useScrollExperience()

  return (
    <>
      {/* Skip link for keyboard users — visible only when focused. */}
      <a
        href="#main"
        className="sr-only z-[100] rounded-sm border border-brass bg-ink px-4 py-2 font-body text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="relative z-10">
        <Hero />
        <Positioning />
        <Services />
        <BiggestHits />
        <Portfolio />
        <Approach />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
