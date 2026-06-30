import { useLayoutEffect, type MutableRefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// useScrollExperience — the single scroll engine for the whole page.
//
//   Lenis (smooth scroll) ──drives──▶ GSAP ticker ──drives──▶ ScrollTrigger
//
// From that one timeline we derive:
//   • `scrollRef` — whole-experience progress 0→1 (hero → portfolio), handed to
//     the 3D <Scene> to drive the camera path + wireframe→photoreal resolve.
//   • section reveals — every [data-reveal] element fades + rises 24px once,
//     staggered in groups.
//
// prefers-reduced-motion: no scroll hijack, the 3D is frozen at a resolved
// value, and reveals collapse to "already visible" (no motion).
// ============================================================================

const RESOLVED_STILL = 0.32 // frozen 3D state for reduced-motion / no-scroll

export function useScrollExperience(scrollRef: MutableRefObject<number>) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Reduced motion: freeze everything, show content, bail out ────────────
    if (reduced) {
      scrollRef.current = RESOLVED_STILL
      const ctx = gsap.context(() => {
        gsap.set('[data-reveal]', { opacity: 1, y: 0, clearProps: 'all' })
      })
      return () => ctx.revert()
    }

    // ── Smooth scroll ────────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    // Smooth-scroll in-page anchor links (nav, scroll cue, footer) through Lenis.
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as
        | HTMLAnchorElement
        | null
      if (!a) return
      const hash = a.getAttribute('href') || ''
      if (hash.length <= 1) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, {
        offset: hash === '#top' ? -200 : -8,
      })
    }
    document.addEventListener('click', onAnchorClick)

    // ── Animations + master progress (scoped in a context for clean teardown) ─
    const ctx = gsap.context(() => {
      // Section reveals — fade + 24px rise, grouped stagger.
      gsap.set('[data-reveal]', { opacity: 0, y: 24 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 86%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.1,
            overwrite: true,
          }),
      })

      // Master progress: hero top → portfolio enters. Drives the 3D camera +
      // wireframe→photoreal resolve via scrollRef. Past this span the 3D simply
      // holds its "exited" state while the 2D portfolio/approach/contact scroll.
      ScrollTrigger.create({
        trigger: '#top',
        start: 'top top',
        endTrigger: '#portfolio',
        end: 'top center',
        onUpdate: (self) => {
          scrollRef.current = self.progress
        },
      })
    })

    // Recalculate once late-loading fonts settle the layout.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    const refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 600)

    if (import.meta.env.DEV) {
      ;(
        window as unknown as {
          __riccoLenis?: Lenis
          __riccoScrollRef?: MutableRefObject<number>
        }
      ).__riccoLenis = lenis
      ;(
        window as unknown as { __riccoScrollRef?: MutableRefObject<number> }
      ).__riccoScrollRef = scrollRef
    }

    return () => {
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('load', onLoad)
      window.clearTimeout(refreshT)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      ctx.revert()
    }
  }, [scrollRef])
}
