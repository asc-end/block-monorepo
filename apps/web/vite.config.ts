import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@blockit/ui': path.resolve(__dirname, '../../packages/ui'),
      '@blockit/cross-ui-toolkit': path.resolve(__dirname, '../../packages/cross-ui-toolkit'),
    },
  },
  optimizeDeps: {
    include: ['@ui'], // optional
  },
  server: {
    fs: {
      // 👇 allow Vite to read files outside the root (monorepo)
      allow: ['../..'],
    },
  },
})
