// ============================================================================
// PlaceholderImage — a labeled, on-brand stand-in for real photography.
// ----------------------------------------------------------------------------
// TODO(assets): every instance of this component marks where a real Ricco photo
// drops in later. Swap the whole component for <img src=... alt=... /> at the
// correct aspect ratio. DO NOT use random web images. The labels below name the
// intended shot so the photographer/editor knows what belongs in each frame.
//
// variant="full"  → labeled frame (intended shot named in the center). Use for
//                    standalone placeholders.
// variant="frame" → atmospheric frame only (category chip + corner). Use when an
//                    external caption supplies the title, e.g. the portfolio grid.
// ============================================================================

const ratioClass: Record<string, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
  hero: 'aspect-[21/9]',
}

export function PlaceholderImage({
  label,
  category,
  ratio = 'landscape',
  className = '',
  rounded = true,
  variant = 'full',
}: {
  label: string
  category?: string
  ratio?: keyof typeof ratioClass
  className?: string
  rounded?: boolean
  variant?: 'full' | 'frame'
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder — ${label}${category ? `, ${category}` : ''}`}
      className={[
        'group/ph relative isolate flex w-full flex-col justify-between overflow-hidden',
        'border border-brass/15 bg-raised',
        rounded ? 'rounded-sm' : '',
        ratioClass[ratio],
        className,
      ].join(' ')}
    >
      {/* Warm editorial gradient + faint vignette so the frame reads intentional. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 90% at 30% 18%, rgba(200,168,98,0.10), rgba(94,31,43,0.06) 45%, rgba(12,10,9,0) 72%), linear-gradient(150deg, #1b1611 0%, #120e0b 55%, #0c0a09 100%)',
        }}
      />
      {/* Subtle diagonal sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'linear-gradient(115deg, transparent 40%, rgba(228,201,138,0.06) 50%, transparent 60%)',
        }}
      />

      {/* Top row: category tag (full variant only) + a small brass corner accent */}
      <div className="flex items-start justify-between p-4">
        {category && variant === 'full' ? (
          <span className="eyebrow !text-[0.6rem] text-brass/80">{category}</span>
        ) : (
          <span />
        )}
        <span aria-hidden className="mt-1 block h-4 w-4 border-r border-t border-brass/40" />
      </div>

      {variant === 'full' && (
        <>
          {/* Center: the intended shot, in display type */}
          <div className="px-5 pb-1 text-center">
            <span aria-hidden className="mx-auto mb-3 block h-px w-8 bg-brass/40" />
            <p className="font-display text-xl leading-tight text-cream/90 sm:text-2xl">
              {label}
            </p>
          </div>

          {/* Bottom marker that this is a placeholder, not final art */}
          <div className="flex items-center justify-center p-4">
            <span className="font-body text-[0.62rem] uppercase tracking-[0.2em] text-muted/60">
              Photography placeholder
            </span>
          </div>
        </>
      )}

      {variant === 'frame' && <span aria-hidden />}
    </div>
  )
}
