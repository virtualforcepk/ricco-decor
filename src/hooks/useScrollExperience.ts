import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// useScrollExperience — Lenis smooth scroll + GSAP ScrollTrigger reveals.
//
//   • Lenis drives smooth scrolling, synced to the GSAP ticker + ScrollTrigger.
//   • Every [data-reveal] element fades + rises 24px once, staggered in groups.
//   • In-page anchor links scroll smoothly through Lenis.
//
// prefers-reduced-motion: no scroll hijack, reveals collapse to "already
// visible" (no motion).
// ============================================================================

export function useScrollExperience() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Reduced motion: show content, no smooth scroll, bail out ─────────────
    if (reduced) {
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

    // ── Section reveals — fade + 24px rise, grouped stagger ──────────────────
    const ctx = gsap.context(() => {
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
    })

    // Recalculate once late-loading fonts/images settle the layout.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    const refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 600)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('load', onLoad)
      window.clearTimeout(refreshT)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      ctx.revert()
    }
  }, [])
}
