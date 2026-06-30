import { useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// useScrollExperience — Lenis smooth scroll (set up once) + GSAP ScrollTrigger
// reveals (re-run per route, since the page content swaps on navigation).
//
//   • Lenis drives smooth scroll, synced to the GSAP ticker + ScrollTrigger.
//   • Each [data-reveal] element fades + rises 24px once, staggered.
//   • On route change: scroll to top, then re-arm reveals for the new page.
//
// SSR-safe: all browser work lives in effects, which don't run during the
// static prerender — so the prerendered HTML ships content fully visible
// (crawlable), and the motion is layered on in the browser.
//
// prefers-reduced-motion: no smooth scroll, reveals collapse to visible.
// ============================================================================

let lenis: Lenis | null = null

function reduced() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useScrollExperience(routeKey: string) {
  // ── Smooth scroll + anchor links (once) ──────────────────────────────────
  useEffect(() => {
    if (reduced()) return

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time: number) => lenis!.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!a) return
      const hash = a.getAttribute('href') || ''
      if (hash.length <= 1) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis!.scrollTo(target as HTMLElement, { offset: -8 })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(ticker)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  // ── Reveals + scroll-to-top (per route) ──────────────────────────────────
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true })

    if (reduced()) {
      const ctx = gsap.context(() => {
        gsap.set('[data-reveal]', { opacity: 1, y: 0, clearProps: 'all' })
      })
      return () => ctx.revert()
    }

    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { opacity: 0, y: 24 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
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
    const refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 200)

    return () => {
      window.clearTimeout(refreshT)
      ctx.revert()
    }
  }, [routeKey])
}
