import { useMemo, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'

// ============================================================================
// <Mandap /> — a stylized mandap built procedurally from Three.js primitives:
// a raised platform, four columns, semicircular arches, a crowning dome and
// finial. Each part renders TWICE — a solid surface and a glowing wireframe —
// and a single scroll `progress` (0 → 1) crossfades wireframe → photoreal.
//
// ─── GLTF DROP-IN SEAM ──────────────────────────────────────────────────────
// TODO(3D): when Ricco supplies a real Spline/Blender export, load it with
// drei's useGLTF (+ Draco) and render it INSTEAD of <Structure/> below, keeping
// this component's <group> transform and the same `progress` crossfade idea
// (animate the loaded materials' opacity / emissive instead). Procedural stays
// as the guaranteed fallback. Example:
//
//   import { useGLTF } from '@react-three/drei'
//   useGLTF.preload('/models/mandap-draco.glb')
//   const { scene } = useGLTF('/models/mandap-draco.glb')   // Draco-compressed
//   return <group ...><primitive object={scene} /></group>
// ============================================================================

export type MandapProgress = MutableRefObject<number>

/** A single structural part: a solid mesh + its glowing edge wireframe. */
function Part({
  geometry,
  solid,
  wire,
  position,
  rotation,
  scale,
}: {
  geometry: THREE.BufferGeometry
  solid: THREE.Material
  wire: THREE.Material
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}) {
  // Build the edge geometry once per source geometry.
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 18), [geometry])
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry} material={solid} castShadow receiveShadow />
      <lineSegments geometry={edges} material={wire} />
    </group>
  )
}

export function Mandap({
  progress,
  children,
}: {
  progress: MandapProgress
  children?: ReactNode
}) {
  // ── Materials (shared instances; opacity/emissive driven per-frame) ────────
  const gold = useMemo(
    () =>
      // Satin gold. Metalness kept moderate so it reads warm under the lights
      // without needing an HDRI environment map (none is loaded — fully offline).
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#c8a862'),
        metalness: 0.45,
        roughness: 0.34,
        transparent: true,
        emissive: new THREE.Color('#3a1016'),
        emissiveIntensity: 0.2,
      }),
    [],
  )
  const stone = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2a211a'),
        metalness: 0.18,
        roughness: 0.86,
        transparent: true,
      }),
    [],
  )
  const wire = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#e4c98a'),
        transparent: true,
        depthWrite: false,
      }),
    [],
  )

  // ── Geometries (created once, shared across repeated parts) ────────────────
  const g = useMemo(() => {
    return {
      platform: new THREE.CylinderGeometry(3.0, 3.4, 0.4, 56),
      platformTop: new THREE.CylinderGeometry(2.6, 2.85, 0.22, 56),
      step: new THREE.CylinderGeometry(3.5, 3.7, 0.18, 56),
      column: new THREE.CylinderGeometry(0.16, 0.19, 3.8, 20),
      columnBase: new THREE.CylinderGeometry(0.3, 0.36, 0.34, 20),
      capital: new THREE.BoxGeometry(0.52, 0.24, 0.52),
      arch: new THREE.TorusGeometry(2.0, 0.1, 10, 36, Math.PI),
      ring: new THREE.TorusGeometry(1.2, 0.09, 12, 44),
      dome: new THREE.SphereGeometry(1.2, 40, 22, 0, Math.PI * 2, 0, Math.PI * 0.5),
      domeBand: new THREE.CylinderGeometry(1.2, 1.28, 0.22, 40, 1, true),
      finialBall: new THREE.SphereGeometry(0.17, 18, 14),
      finialSpike: new THREE.ConeGeometry(0.1, 0.52, 14),
    }
  }, [])

  // Crossfade wireframe → photoreal from the shared progress value.
  useFrame(() => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1)
    // smootherstep so the resolve feels cinematic, not linear
    const s = p * p * (3 - 2 * p)
    gold.opacity = s
    stone.opacity = s
    wire.opacity = 1 - s
    gold.emissiveIntensity = 0.12 + 0.3 * s
  })

  // Column footprint (square), and arch placement at column-top height.
  const COL = 2.0
  const colY = 0.62 + 3.8 / 2 // platformTop top (0.62) + half column height
  const colTopY = 0.62 + 3.8 // 4.42
  const columnXZ: [number, number][] = [
    [COL, COL],
    [-COL, COL],
    [COL, -COL],
    [-COL, -COL],
  ]

  return (
    // Centered so the structure's mid-height sits near world origin; Scene's
    // camera frames it from there. Phase 3 leaves this static and moves the camera.
    <group position={[0, -3.7, 0]}>
      {/* Platform (stone) */}
      <Part geometry={g.step} solid={stone} wire={wire} position={[0, 0.09, 0]} />
      <Part geometry={g.platform} solid={stone} wire={wire} position={[0, 0.2, 0]} />
      <Part geometry={g.platformTop} solid={stone} wire={wire} position={[0, 0.51, 0]} />

      {/* Columns + bases + capitals (gold) */}
      {columnXZ.map(([x, z], i) => (
        <group key={i}>
          <Part geometry={g.columnBase} solid={gold} wire={wire} position={[x, 0.79, z]} />
          <Part geometry={g.column} solid={gold} wire={wire} position={[x, colY, z]} />
          <Part geometry={g.capital} solid={gold} wire={wire} position={[x, colTopY + 0.12, z]} />
        </group>
      ))}

      {/* Arches (gold) — semicircles bridging adjacent columns on each face */}
      <Part geometry={g.arch} solid={gold} wire={wire} position={[0, colTopY + 0.12, COL]} />
      <Part geometry={g.arch} solid={gold} wire={wire} position={[0, colTopY + 0.12, -COL]} />
      <Part
        geometry={g.arch}
        solid={gold}
        wire={wire}
        position={[COL, colTopY + 0.12, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Part
        geometry={g.arch}
        solid={gold}
        wire={wire}
        position={[-COL, colTopY + 0.12, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Crown: ring + dome band + dome + finial */}
      <Part
        geometry={g.ring}
        solid={gold}
        wire={wire}
        position={[0, colTopY + COL - 0.1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Part geometry={g.domeBand} solid={gold} wire={wire} position={[0, colTopY + COL, 0]} />
      <Part geometry={g.dome} solid={gold} wire={wire} position={[0, colTopY + COL + 0.1, 0]} />
      <Part geometry={g.finialBall} solid={gold} wire={wire} position={[0, colTopY + COL + 1.45, 0]} />
      <Part geometry={g.finialSpike} solid={gold} wire={wire} position={[0, colTopY + COL + 1.85, 0]} />

      {/* Florals / future GLTF children mount here */}
      {children}
    </group>
  )
}
