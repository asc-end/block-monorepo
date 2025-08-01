import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['@blockit/ui', '@blockit/cross-ui-toolkit', '@blockit/shared', 'buffer'], // optional
  },
  server: {
    fs: {
      // 👇 allow Vite to read files outside the root (monorepo)
      allow: ['../..'],
    },
  },
})
