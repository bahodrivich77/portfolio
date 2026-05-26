import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // ✅ Target modern browsers — kichikroq bundle
    target: 'es2020',

    // ✅ Chunk splitting — first load kamayadi
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunklari alohida — cache ishlaydi
          'react-vendor': ['react', 'react-dom'],
          'motion':       ['framer-motion'],
          'ui':           ['lucide-react'],
        },
      },
    },

    // ✅ CSS minify
    cssMinify: true,

    // ✅ Chunk size warning
    chunkSizeWarningLimit: 600,

    // ✅ Source map faqat dev da
    sourcemap: false,
  },

  // ✅ Dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})
