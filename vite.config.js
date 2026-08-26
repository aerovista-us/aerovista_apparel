import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative output works both at /aerovista_apparel/ on GitHub Pages
  // and at the root when the custom domain is attached.
  base: './',
})
