import { brand } from '../../data/content'

// ============================================================================
// <Logo /> — Ricco Decor's real filigree logo. The source PNG is black line-art
// on transparent, so we render it as a CSS mask over a solid fill: the fill
// shows only where the logo art is. That recolors it cleanly to brass/cream to
// sit on the dark theme (no baked-in white box, crisp at any size).
//
// `decorative` → aria-hidden (use when an adjacent <h1>/sr-only text already
// names the brand, e.g. the hero). Otherwise it exposes an image label.
// ============================================================================

const maskStyle = {
  WebkitMaskImage: `url("${brand.logo}")`,
  maskImage: `url("${brand.logo}")`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
} as const

export function Logo({
  className = '',
  tone = 'brass',
  decorative = false,
}: {
  className?: string
  tone?: 'brass' | 'cream' | 'current'
  decorative?: boolean
}) {
  const fill =
    tone === 'cream' ? 'bg-cream' : tone === 'current' ? 'bg-current' : 'bg-brass'
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img', 'aria-label': `${brand.name} logo` }
  return <span {...a11y} className={`block ${fill} ${className}`} style={maskStyle} />
}
