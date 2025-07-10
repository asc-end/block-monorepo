import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {},
  optimizeDeps: {
    include: ['@blockit/ui', '@blockit/cross-ui-toolkit', '@blockit/shared'], // optional
  },
  server: {
    fs: {
      // 👇 allow Vite to read files outside the root (monorepo)
      allow: ['../..'],
    },
  },
})
