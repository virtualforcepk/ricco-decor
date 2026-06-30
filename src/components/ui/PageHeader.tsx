import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

// Page hero band — carries the single <h1> for each inner page, over a warm
// glow, clearing the fixed nav.
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
}) {
  return (
    <header className="relative overflow-hidden px-6 pt-36 pb-14 text-center md:pt-44 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 0%, rgba(200,168,98,0.14), rgba(94,31,43,0.07) 42%, rgba(12,10,9,0) 72%)',
        }}
      />
      <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
      <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-light leading-[1.02] text-cream sm:text-6xl md:text-7xl">
        {title}
      </h1>
      {intro && (
        <p className="mx-auto mt-7 max-w-2xl font-body text-lg font-light leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </header>
  )
}
