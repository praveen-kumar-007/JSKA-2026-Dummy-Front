import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative asset paths so the app works when hosted on a subpath
  // (avoids blank screen when deployed under a path or served from a CDN)
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep only lucide-react in a separate chunk (icons).
          // Avoid forcing React / react-dom into their own chunk because
          // that can create a circular dependency with other vendor modules
          // (react-router, etc.) which leads to runtime errors like
          // "Cannot read properties of undefined (reading 'createContext')".
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'icons';
            // let Vite decide the rest to avoid problematic circular imports
          }
        }
      }
    }
  }
})
