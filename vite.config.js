import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // This ensures assets are loaded from the root directory
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  }
})