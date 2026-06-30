import { useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Mandap } from './Mandap'
import { Florals } from './Florals'
import { Lighting } from './Lighting'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isSmallScreen = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 768px)').matches

// ============================================================================
// <Scene /> — the fixed-background WebGL scene (default export so it can be
// React.lazy()'d). One scroll value (0 → 1, whole-page progress) drives
// everything:
//   • `progress` (wireframe → photoreal) resolves within the first ~25%.
//   • the camera glides along a cinematic path across the full range.
//
// Phase 2 holds `scroll` at a constant resolved value so the mandap simply sits
// warm and lit behind the content. Phase 3 passes a `scrollRef` driven by GSAP
// ScrollTrigger and the whole thing comes alive on scroll.
// ============================================================================

const smoothstep = THREE.MathUtils.smoothstep

// Camera path keyframes, keyed by whole-page scroll progress.
type Stop = { at: number; pos: [number, number, number]; look: [number, number, number] }
const CAMERA_PATH: Stop[] = [
  { at: 0.0, pos: [0, 1.6, 16.5], look: [0, 1.2, 0] }, // hero — wide on the wireframe
  { at: 0.22, pos: [0, 0.5, 10.5], look: [0, 0.4, 0] }, // resolved — pushed in
  { at: 0.5, pos: [4.2, 1.4, 8.5], look: [0, 1.1, 0] }, // services — drift & orbit
  { at: 0.78, pos: [6.2, 2.8, 4.6], look: [-1, 1.6, 0] }, // services end — past it
  { at: 1.0, pos: [3.0, 4.2, 2.4], look: [0, 2.6, 0] }, // exit — rising away
]

function samplePath(scroll: number) {
  const s = THREE.MathUtils.clamp(scroll, 0, 1)
  let a = CAMERA_PATH[0]
  let b = CAMERA_PATH[CAMERA_PATH.length - 1]
  for (let i = 0; i < CAMERA_PATH.length - 1; i++) {
    if (s >= CAMERA_PATH[i].at && s <= CAMERA_PATH[i + 1].at) {
      a = CAMERA_PATH[i]
      b = CAMERA_PATH[i + 1]
      break
    }
  }
  const span = b.at - a.at || 1
  const tRaw = (s - a.at) / span
  const t = smoothstep(THREE.MathUtils.clamp(tRaw, 0, 1), 0, 1)
  const lerp = (x: number, y: number) => x + (y - x) * t
  return {
    pos: new THREE.Vector3(
      lerp(a.pos[0], b.pos[0]),
      lerp(a.pos[1], b.pos[1]),
      lerp(a.pos[2], b.pos[2]),
    ),
    look: new THREE.Vector3(
      lerp(a.look[0], b.look[0]),
      lerp(a.look[1], b.look[1]),
      lerp(a.look[2], b.look[2]),
    ),
  }
}

/** Derives `progress` from `scroll` and drives the camera each frame. */
function Rig({
  scroll,
  progress,
  snap = false,
}: {
  scroll: MutableRefObject<number>
  progress: MutableRefObject<number>
  snap?: boolean
}) {
  const { camera } = useThree()
  const lookAt = useRef(new THREE.Vector3(0, 0.8, 0))

  useFrame((_, delta) => {
    // Wireframe resolves to photoreal across the first 25% of the scroll.
    progress.current = smoothstep(scroll.current, 0.0, 0.25)

    const target = samplePath(scroll.current)
    // Critically-damped follow so scroll jitter doesn't snap the camera.
    // `snap` (reduced motion) jumps straight to the resolved framing.
    const k = snap ? 1 : 1 - Math.pow(0.0015, delta)
    camera.position.lerp(target.pos, k)
    lookAt.current.lerp(target.look, k)
    camera.lookAt(lookAt.current)
  })

  return null
}

export default function Scene({
  scrollRef,
}: {
  scrollRef?: MutableRefObject<number>
}) {
  // Reduced motion: freeze the 3D at a resolved still (no scroll-driven motion),
  // ignore the live scrollRef, and render on demand only.
  const reduced = prefersReducedMotion()
  const small = isSmallScreen()

  // Resolved constant used when reduced (or when no scrollRef is supplied).
  const internalScroll = useRef(0.32)
  const scroll = reduced ? internalScroll : (scrollRef ?? internalScroll)
  const progress = useRef(0)

  return (
    <Canvas
      // Cap pixel ratio; lower on small screens for fill-rate headroom.
      dpr={[1, small ? 1.5 : 2]}
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 1.6, 16.5], fov: 42, near: 0.1, far: 120 }}
      style={{ background: 'transparent' }}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.ACESFilmicToneMapping
        state.gl.toneMappingExposure = 1.12
        // DEV-only handles so the scene can be inspected/stepped without relying
        // on the preview capture surface's rAF (which it throttles).
        if (import.meta.env.DEV) {
          const w = window as unknown as {
            __riccoScene?: THREE.Scene
            __riccoState?: typeof state
          }
          w.__riccoScene = state.scene
          w.__riccoState = state
        }
      }}
    >
      {/* Warm exponential fog matches the ink page bg and adds depth. */}
      <fogExp2 attach="fog" args={['#0c0a09', 0.032]} />

      <Rig scroll={scroll} progress={progress} snap={reduced} />
      <Lighting progress={progress} />
      <Mandap progress={progress}>
        <Florals progress={progress} />
      </Mandap>

      {/* Subtle gold-glow bloom. Perf-gated: skipped on reduced-motion and on
          small screens to protect mobile fill-rate. Alpha is preserved so the
          canvas stays transparent behind the content. */}
      {!reduced && !small && (
        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.3}
            mipmapBlur
            radius={0.7}
          />
        </EffectComposer>
      )}
    </Canvas>
  )
}
