import type { ReactNode } from 'react'

/**
 * Eyebrow label — Jost, uppercase, tracked out, brass.
 * Rendered with a short brass tick for an editorial feel.
 */
export function Eyebrow({
  children,
  className = '',
  withTick = true,
}: {
  children: ReactNode
  className?: string
  withTick?: boolean
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${className}`}>
      {withTick && (
        <span aria-hidden className="h-px w-6 bg-brass/70" />
      )}
      {children}
    </span>
  )
}
