import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MandapProgress } from './Mandap'

// ============================================================================
// <Lighting /> — warm, moody, gold-lit. Key + rim directional lights plus two
// interior point lights. Every intensity ramps up from near-zero (the cold
// wireframe state) to full warmth as `progress` resolves the space to photoreal.
//
// Directional lights (no distance decay) carry the key/rim; point lights use
// decay={0} so intensities stay predictable without an HDRI environment.
// ============================================================================

const lerp = THREE.MathUtils.lerp
const clamp = THREE.MathUtils.clamp

export function Lighting({ progress }: { progress: MandapProgress }) {
  const key = useRef<THREE.DirectionalLight>(null)
  const rim = useRef<THREE.DirectionalLight>(null)
  const core = useRef<THREE.PointLight>(null)
  const fill = useRef<THREE.PointLight>(null)
  const amb = useRef<THREE.AmbientLight>(null)
  const hemi = useRef<THREE.HemisphereLight>(null)

  useFrame(() => {
    const p = clamp(progress.current, 0, 1)
    const s = p * p * (3 - 2 * p) // smootherstep
    if (amb.current) amb.current.intensity = lerp(0.08, 0.32, s)
    if (hemi.current) hemi.current.intensity = lerp(0.12, 0.5, s)
    if (key.current) key.current.intensity = lerp(0.25, 2.6, s)
    if (rim.current) rim.current.intensity = lerp(0.15, 1.9, s)
    if (core.current) core.current.intensity = lerp(0.2, 3.0, s)
    if (fill.current) fill.current.intensity = lerp(0.1, 1.4, s)
  })

  return (
    <>
      <ambientLight ref={amb} color="#5a4632" intensity={0.1} />
      <hemisphereLight
        ref={hemi}
        color="#3a2c1e"
        groundColor="#0a0807"
        intensity={0.2}
      />
      {/* Warm key from upper front */}
      <directionalLight
        ref={key}
        color="#ffd9a0"
        position={[6, 9, 7]}
        intensity={1}
      />
      {/* Brass rim from behind for separation */}
      <directionalLight
        ref={rim}
        color="#c8a862"
        position={[-7, 5, -8]}
        intensity={0.8}
      />
      {/* Interior glow under the dome */}
      <pointLight
        ref={core}
        color="#ffcaa0"
        position={[0, 3, 0]}
        intensity={1}
        decay={0}
        distance={0}
      />
      {/* Low front fill on the platform */}
      <pointLight
        ref={fill}
        color="#e9b878"
        position={[0, 0.6, 4.5]}
        intensity={0.6}
        decay={0}
        distance={0}
      />
    </>
  )
}
