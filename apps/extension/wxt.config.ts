import { defineConfig } from 'wxt';
const EXTENSION_PUBLIC_KEY = process.env.WXT_PUBLIC_KEY;
const WEB_URL = process.env.WXT_PUBLIC_WEB_URL || "http://localhost:5173" + "/*";


// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['storage', 'scripting', 'activeTab', "favicon"],
    host_permissions: [WEB_URL], 
    externally_connectable: {
      matches: [WEB_URL]
    },
    key: EXTENSION_PUBLIC_KEY,
  },
  vite: () => ({
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
      extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
    },
    optimizeDeps: {
      exclude: ['react-native'],
      esbuildOptions: {
        resolveExtensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
        exclude: ['react-native'],
      },
      rollupOptions: {
        external: ['react-native'],
      },
    },
  }),
});
