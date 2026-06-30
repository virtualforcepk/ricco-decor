import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { brand, nav } from '../../data/content'

/**
 * Fixed top navigation. Transparent over the home hero, solid warm-dark once
 * scrolled — and solid from the top on every non-home page. Logo left, route
 * links + "Inquire" right. On mobile the links collapse into an overlay menu.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const solid = scrolled || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu on route change.
  useEffect(() => setMenuOpen(false), [pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'border-b border-brass/10 bg-ink/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="font-display text-xl tracking-[0.28em] text-cream transition-colors hover:text-brass-bright sm:text-2xl"
          aria-label={`${brand.name} — home`}
        >
          RICCO<span className="text-brass"> DECOR</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-9">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={[
                    'font-body text-sm font-light tracking-wide transition-colors hover:text-cream',
                    pathname === link.href ? 'text-brass' : 'text-muted',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={nav.cta.href}
            className="group inline-flex items-center gap-2 border border-brass/60 px-6 py-2.5 font-body text-sm tracking-[0.15em] text-brass-bright uppercase transition-colors hover:border-brass hover:bg-brass hover:text-ink"
          >
            {nav.cta.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={[
                'absolute left-0 block h-px w-6 bg-cream transition-all duration-300',
                menuOpen ? 'top-1/2 rotate-45' : 'top-0',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-0 top-1/2 block h-px w-6 bg-cream transition-all duration-300',
                menuOpen ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-0 block h-px w-6 bg-cream transition-all duration-300',
                menuOpen ? 'top-1/2 -rotate-45' : 'top-full',
              ].join(' ')}
            />
          </span>
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        className={[
          'fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink/97 backdrop-blur-lg transition-all duration-500 md:hidden',
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        ].join(' ')}
      >
        <ul className="flex flex-col items-center gap-7">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="font-display text-4xl text-cream transition-colors hover:text-brass-bright"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={nav.cta.href}
          className="mt-4 inline-flex items-center gap-2 border border-brass px-10 py-3 font-body text-sm tracking-[0.2em] text-brass-bright uppercase transition-colors hover:bg-brass hover:text-ink"
        >
          {nav.cta.label}
        </Link>
      </div>
    </header>
  )
}
