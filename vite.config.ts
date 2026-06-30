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
    port: 5193,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Split the animation libs into their own cacheable chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/gsap/') || id.includes('/lenis/')) return 'motion'
        },
      },
    },
  },
})
