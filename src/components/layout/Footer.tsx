import { brand, services, nav, socials, footer } from '../../data/content'
import { Logo } from '../ui/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-brass/10 bg-ink/95">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a
              href="#top"
              aria-label={`${brand.name} — back to top`}
              className="inline-block"
            >
              <Logo tone="brass" className="aspect-[3/2] w-40" />
            </a>
            <p className="mt-5 max-w-sm font-body text-sm font-light leading-relaxed text-muted">
              {footer.blurb}
            </p>
            <p className="mt-6 font-body text-sm leading-relaxed text-muted">
              {brand.address}
              <br />
              {brand.region}
            </p>
          </div>

          {/* Services */}
          <nav className="md:col-span-3" aria-label="Services">
            <h2 className="eyebrow mb-5">Services</h2>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="font-body text-sm font-light text-cream/80 transition-colors hover:text-brass-bright"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-2">
            <h2 className="eyebrow mb-5">Contact</h2>
            <ul className="space-y-3 font-body text-sm font-light">
              <li>
                <a
                  href={brand.emailHref}
                  className="text-cream/80 transition-colors hover:text-brass-bright"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={brand.phoneHref}
                  className="text-cream/80 transition-colors hover:text-brass-bright"
                >
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={nav.cta.href}
                  className="text-brass transition-colors hover:text-brass-bright"
                >
                  Start an inquiry →
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h2 className="eyebrow mb-5">Follow</h2>
            <ul className="space-y-3 font-body text-sm font-light">
              {socials.map((s) => (
                <li key={s.label}>
                  {/* TODO(client): point at real social URLs. */}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-cream/80 transition-colors hover:text-brass-bright"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-brass/10 pt-8 text-xs text-muted/70 sm:flex-row sm:items-center">
          <p className="font-body tracking-wide">
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="font-body tracking-[0.15em] uppercase">
            Luxury Event Design · {brand.region}
          </p>
        </div>
      </div>
    </footer>
  )
}
