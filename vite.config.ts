import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use absolute asset paths so JS/CSS chunks still load when the browser
  // is on a nested route (e.g. /news/123). Relative './' breaks refresh
  // because assets resolve under the current path and return 404s.
  base: '/',
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
