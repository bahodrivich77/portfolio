import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// Vite always injects the built CSS as a render-blocking
// <link rel="stylesheet">. The bare essentials for first paint
// (background/text color, layout shell, skip-link) are already
// inlined by hand in index.html's <style> block, so the full
// Tailwind bundle can safely load asynchronously: swap it to
// `rel="preload" as="style"` with an onload handler that flips it
// to a real stylesheet, plus a <noscript> fallback for JS-disabled clients.
function deferStylesheets() {
  return {
    name: 'defer-stylesheets',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" ([^>]*href="[^"]+\.css"[^>]*)>/g,
        (_match, attrs) =>
          `<link rel="preload" as="style" ${attrs} onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" ${attrs}></noscript>`
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    deferStylesheets(),
    // Writes dist/stats.html after every build (gitignored) showing
    // exactly what's inside each chunk — open it after `npm run build`.
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  build: {
    // ✅ Target modern browsers for smaller bundles.
    target: 'es2020',

    // ✅ Code splitting to keep initial payload low.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('@studio-freight/lenis') || id.includes('lenis')) return 'lenis'
            if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor'
            if (id.includes('clsx') || id.includes('tailwind-merge')) return 'ui-vendor'
            // framer-motion is intentionally NOT forced into one chunk here:
            // domAnimation's gesture/animation features are loaded via a
            // dynamic import (src/lib/motionFeatures.js) so LazyMotion can
            // code-split them into their own async chunk. Forcing every
            // framer-motion module into a single manual chunk would merge
            // that async chunk back into the eagerly-loaded bundle.
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
