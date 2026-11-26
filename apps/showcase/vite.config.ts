import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@dev_x_mohit/opti-kit': path.resolve(__dirname, '../../packages/opti-kit/dist/index.mjs'),
    },
  },
})
