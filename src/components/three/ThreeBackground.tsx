import { Suspense, lazy, type MutableRefObject } from 'react'

// Lazy-load the entire WebGL stack so first paint ships only the semantic shell.
// The three/r3f/drei chunks load on demand (see vite.config manualChunks).
const Scene = lazy(() => import('./Scene'))

/**
 * Fixed, full-viewport WebGL background layer (z-0). All page content scrolls
 * over it at z-10. Decorative + non-interactive: aria-hidden and
 * pointer-events-none so it never traps focus or blocks clicks.
 */
export function ThreeBackground({
  scrollRef,
}: {
  scrollRef?: MutableRefObject<number>
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      <Suspense fallback={null}>
        <Scene scrollRef={scrollRef} />
      </Suspense>
    </div>
  )
}
