import { useState, type FormEvent } from 'react'
import { brand, contact } from '../../data/content'
import { Eyebrow } from '../ui/Eyebrow'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldBase =
  'w-full border-b border-brass/25 bg-transparent px-0 py-3 font-body text-base font-light text-cream placeholder:text-muted/50 transition-colors focus:border-brass focus:outline-none'
const labelBase =
  'eyebrow !text-[0.62rem] !tracking-[0.18em] mb-2 block text-muted'

export function Contact({ heading = true }: { heading?: boolean } = {}) {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    // Honeypot — bots fill hidden fields; humans don't.
    if (data.company) return

    setStatus('submitting')

    // MVP submit: open a pre-filled email to Ricco (works with zero backend).
    // TODO(backend): upgrade to a GoHighLevel webhook or Formspree/serverless
    // endpoint for in-page submission + CRM capture. Drop the fetch in here:
    //   await fetch(import.meta.env.VITE_INQUIRY_WEBHOOK, { method:'POST',
    //     headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) })
    try {
      const lines = [
        `Name: ${data.name ?? ''}`,
        `Email: ${data.email ?? ''}`,
        `Phone: ${data.phone ?? ''}`,
        `Event type: ${data.eventType ?? ''}`,
        `Event date: ${data.eventDate ?? ''}`,
        '',
        `${data.message ?? ''}`,
      ].join('\n')
      const href =
        `mailto:${brand.email}` +
        `?subject=${encodeURIComponent(`Event Inquiry — ${data.name ?? ''}`)}` +
        `&body=${encodeURIComponent(lines)}`
      window.location.href = href
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="relative z-10 border-t border-brass/10 bg-raised/40 px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
        {/* Invitation */}
        <div data-reveal className="md:pt-4">
          {heading && (
            <>
              <Eyebrow>{contact.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-display text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
                {contact.title}
              </h2>
              <p className="mt-6 max-w-md font-body text-base font-light leading-relaxed text-muted">
                {contact.invitation}
              </p>
            </>
          )}

          <div className="mt-10 space-y-4">
            <a
              href={brand.emailHref}
              className="block font-display text-2xl text-cream transition-colors hover:text-brass-bright"
            >
              {brand.email}
            </a>
            <a
              href={brand.phoneHref}
              className="block font-body text-base font-light tracking-wide text-muted transition-colors hover:text-cream"
            >
              {brand.phone}
            </a>
            <p className="font-body text-sm font-light leading-relaxed text-muted/80">
              {brand.address}
            </p>
            <p className="font-body text-sm tracking-[0.15em] text-muted/70 uppercase">
              {brand.region}
            </p>
          </div>
        </div>

        {/* Form */}
        <div data-reveal>
          {status === 'success' ? (
            <div
              className="flex min-h-[420px] flex-col items-start justify-center border border-brass/20 bg-ink/40 p-10"
              role="status"
              aria-live="polite"
            >
              <span className="font-display text-3xl text-brass-bright">
                Thank you.
              </span>
              <p className="mt-4 max-w-sm font-body font-light leading-relaxed text-muted">
                Your inquiry is in. We&apos;ll be in touch within two business
                days to begin designing your event.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 border border-brass/40 px-6 py-2.5 font-body text-xs tracking-[0.2em] text-brass-bright uppercase transition-colors hover:bg-brass hover:text-ink"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              {/* Honeypot (hidden from users + screen readers) */}
              <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
                <label>
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelBase}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className={fieldBase}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelBase}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    className={fieldBase}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className={labelBase}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(416) 555-0100"
                    className={fieldBase}
                  />
                </div>
                <div>
                  <label htmlFor="eventDate" className={labelBase}>
                    Event Date
                  </label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    className={`${fieldBase} [color-scheme:dark]`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="eventType" className={labelBase}>
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  required
                  defaultValue=""
                  className={`${fieldBase} cursor-pointer`}
                >
                  <option value="" disabled>
                    Select an event type
                  </option>
                  {contact.eventTypes.map((t) => (
                    <option key={t} value={t} className="bg-ink text-cream">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelBase}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your celebration — guest count, venue, vision…"
                  className={`${fieldBase} resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group inline-flex items-center gap-3 border border-brass bg-brass px-9 py-3.5 font-body text-sm tracking-[0.2em] text-ink uppercase transition-colors hover:bg-brass-bright disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
                  {status !== 'submitting' && (
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  )}
                </button>
                {status === 'error' && (
                  <p role="alert" className="font-body text-sm text-wine">
                    Something went wrong. Please email us directly.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
