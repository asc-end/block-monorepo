import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer',
      'react-native': 'react-native-web',
      'expo-app-blocker': './src/lib/expo-app-blocker-stub.ts',
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['@blockit/ui', '@blockit/cross-ui-toolkit', '@blockit/shared', 'buffer', 'react-native-web'],
    exclude: ['react-native'],
  },
  server: {
    fs: {
      // 👇 allow Vite to read files outside the root (monorepo)
      allow: ['../..'],
    },
  },
})
