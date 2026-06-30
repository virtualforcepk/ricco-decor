import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Bind all interfaces (IPv4 included). This box's Chrome is IPv4-only, so
    // a default IPv6-only `localhost` bind is unreachable — host:true fixes it.
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Code-split the heavy 3D/animation stack so first paint ships only the
        // semantic shell. The <Canvas> is lazy-loaded (see ThreeBackground), so
        // the three/r3f chunks stay out of the initial graph and load on demand.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/three/') || id.includes('three-stdlib')) return 'three'
          if (
            id.includes('@react-three') ||
            id.includes('postprocessing') ||
            id.includes('/maath/')
          )
            return 'r3f'
          if (id.includes('/gsap/') || id.includes('/lenis/')) return 'motion'
        },
      },
    },
  },
})
