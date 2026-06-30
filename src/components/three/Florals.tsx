import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MandapProgress } from './Mandap'

// ============================================================================
// <Florals /> — instanced floral clusters around the mandap (column bases,
// platform rim, and garlands along the arches). A single InstancedMesh keeps it
// cheap. The blooms fade + grow in during the back half of the scroll progress,
// so the room "fills with flowers" as it resolves to photoreal.
//
// Rendered as a child of <Mandap>, so coordinates are in mandap-local space.
// TODO(3D): swap the icosahedron buds for a low-poly rose GLTF if desired.
// ============================================================================

const COL = 2.0
const COLUMN_TOP_Y = 0.62 + 3.8 // matches Mandap

type Bloom = {
  pos: THREE.Vector3
  scale: number
  rot: [number, number, number]
  color: THREE.Color
}

const PALETTE = ['#7a2533', '#c8a862', '#f4ede3', '#e4c98a', '#5e1f2b']

function pickColor(i: number) {
  return new THREE.Color(PALETTE[i % PALETTE.length])
}

export function Florals({ progress }: { progress: MandapProgress }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.55,
        metalness: 0.1,
        transparent: true,
        opacity: 0,
        emissive: new THREE.Color('#2a0d12'),
        emissiveIntensity: 0.25,
      }),
    [],
  )
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.13, 0), [])

  const blooms = useMemo<Bloom[]>(() => {
    const out: Bloom[] = []
    let i = 0
    const jitter = (n: number) => (((i * 9301 + 49297 + n) % 233280) / 233280 - 0.5)

    // Rings around the four column bases
    for (const [cx, cz] of [
      [COL, COL],
      [-COL, COL],
      [COL, -COL],
      [-COL, -COL],
    ] as const) {
      const n = 14
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2
        const r = 0.42 + jitter(k) * 0.12
        out.push({
          pos: new THREE.Vector3(
            cx + Math.cos(a) * r,
            0.66 + jitter(k * 3) * 0.06,
            cz + Math.sin(a) * r,
          ),
          scale: 0.7 + Math.abs(jitter(k * 7)) * 1.1,
          rot: [jitter(k) * 3, a, jitter(k * 2) * 3],
          color: pickColor(i++),
        })
      }
    }

    // Scatter along the platform rim
    const rim = 30
    for (let k = 0; k < rim; k++) {
      const a = (k / rim) * Math.PI * 2
      const r = 2.7 + jitter(k * 5) * 0.18
      out.push({
        pos: new THREE.Vector3(Math.cos(a) * r, 0.64 + jitter(k) * 0.05, Math.sin(a) * r),
        scale: 0.5 + Math.abs(jitter(k * 11)) * 0.8,
        rot: [jitter(k) * 3, a, jitter(k * 4) * 3],
        color: pickColor(i++),
      })
    }

    // Garlands tracing the four arches (radius 2.0 at column-top height)
    const archCenterY = COLUMN_TOP_Y + 0.12
    const archFaces: { axis: 'z' | 'x'; sign: number }[] = [
      { axis: 'z', sign: 1 },
      { axis: 'z', sign: -1 },
      { axis: 'x', sign: 1 },
      { axis: 'x', sign: -1 },
    ]
    for (const face of archFaces) {
      const n = 12
      for (let k = 0; k <= n; k++) {
        const t = k / n
        const ang = Math.PI * (0.12 + t * 0.76) // skip the ends near the columns
        const along = Math.cos(ang) * 2.0
        const up = archCenterY + Math.sin(ang) * 2.0
        const pos =
          face.axis === 'z'
            ? new THREE.Vector3(along, up, face.sign * COL)
            : new THREE.Vector3(face.sign * COL, up, along)
        out.push({
          pos,
          scale: 0.45 + Math.abs(jitter(k * 13)) * 0.6,
          rot: [jitter(k) * 3, jitter(k * 2) * 3, jitter(k * 3) * 3],
          color: pickColor(i++),
        })
      }
    }

    return out
  }, [])

  useLayoutEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const e = new THREE.Euler()
    const s = new THREE.Vector3()
    blooms.forEach((b, idx) => {
      e.set(b.rot[0], b.rot[1], b.rot[2])
      q.setFromEuler(e)
      s.setScalar(b.scale)
      m.compose(b.pos, q, s)
      mesh.setMatrixAt(idx, m)
      mesh.setColorAt(idx, b.color)
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [blooms])

  // Reveal during the back half of the resolve.
  useFrame(() => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1)
    const reveal = THREE.MathUtils.smoothstep(p, 0.45, 1)
    material.opacity = reveal
    if (groupRef.current) groupRef.current.scale.setScalar(0.92 + reveal * 0.08)
  })

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, blooms.length]}
        frustumCulled={false}
      />
    </group>
  )
}
