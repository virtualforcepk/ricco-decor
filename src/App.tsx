import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Positioning } from './components/sections/Positioning'
import { Services } from './components/sections/Services'
import { BiggestHits } from './components/sections/BiggestHits'
import { Portfolio } from './components/sections/Portfolio'
import { Approach } from './components/sections/Approach'
import { Contact } from './components/sections/Contact'
import { ThreeBackground } from './components/three/ThreeBackground'
import { useScrollExperience } from './hooks/useScrollExperience'
import { useRef } from 'react'

function App() {
  // One scroll value (0→1) shared between the DOM scroll engine and the 3D.
  // Lenis → GSAP ScrollTrigger writes it; the <Scene> camera + wireframe→
  // photoreal resolve read it. See useScrollExperience.
  const scrollRef = useRef(0)
  useScrollExperience(scrollRef)

  return (
    <>
      {/* ───────────────────────────────────────────────────────────────────
          ARCHITECTURE: a fixed 3D <Canvas> background (z-0) sits behind all of
          this semantic content (z-10), so copy stays in the DOM for SEO/a11y
          and the 3D is pure atmosphere. A single scrollRef (Lenis →
          ScrollTrigger) drives the camera path and the wireframe→photoreal
          transition from one scroll value.
          ─────────────────────────────────────────────────────────────────── */}
      {/* Skip link for keyboard users — visible only when focused. */}
      <a
        href="#main"
        className="sr-only z-[100] rounded-sm border border-brass bg-ink px-4 py-2 font-body text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <ThreeBackground scrollRef={scrollRef} />

      <Nav />

      {/* All primary content is semantic HTML, layered above the canvas. */}
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
