import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import path from 'path';

export default defineConfig({
  base: '/dianshangwangzhan_dome/',
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  publicDir: 'static',
  optimizeDeps: {
    include: ['iview', 'v-distpicker']
  },
  server: {
    port: 8080
  },
  build: {
    outDir: 'dist'
  }
});
