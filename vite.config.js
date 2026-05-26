import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // ✅ Target modern browsers for smaller bundles.
    target: 'es2020',

    // ✅ Code splitting to keep initial payload low.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('react-dom') || id.includes('react')) return 'react-vendor'
            if (id.includes('clsx') || id.includes('tailwind-merge')) return 'ui-vendor'
          }
        },
      },
    },

    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    sourcemap: false,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})
