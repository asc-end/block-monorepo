import { defineConfig } from 'wxt';

const EXTENSION_PUBLIC_KEY = process.env.WXT_PUBLIC_KEY;
const WEB_URL = (process.env.WXT_PUBLIC_WEB_URL || "http://localhost:5173") + "/*";


// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Blockit',
    description: 'Block distracting apps and websites',
    permissions: ['storage', 'scripting', 'activeTab', "favicon", "tabs"],
    host_permissions: ["<all_urls>"], 
    externally_connectable: {
      matches: [WEB_URL, "https://blockit-web-production.up.railway.app/*"]
    },
    key: EXTENSION_PUBLIC_KEY,
    icons: {
      16: '/icon/icon.png',
      32: '/icon/icon.png',
      48: '/icon/icon.png',
      96: '/icon/icon.png',
      128: '/icon/icon.png'
    },
  },
  vite: () => ({
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
      extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
    },
    optimizeDeps: {
      exclude: ['react-native', '**/*.native.*'],
      esbuildOptions: {
        resolveExtensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
        exclude: ['react-native', /\.native\./],
      },
      rollupOptions: {
        external: ['react-native'],
      },
    },
  }),
});
