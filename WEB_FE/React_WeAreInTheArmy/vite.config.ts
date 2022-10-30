import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import tsconfigPaths from 'vite-tsconfig-paths';
import ViteFaviconsPlugin from 'vite-plugin-favicon';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePluginHtmlEnv({
      compiler: true,
      // compiler: false // old
    }),
  ],
});
