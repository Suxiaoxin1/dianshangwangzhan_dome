import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import path from 'path';
import fs from 'fs';

const repoName = 'dianshangwangzhan_dome';

function fixPublicAssetPaths() {
  return {
    name: 'fix-public-asset-paths',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      function walk(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            walk(fullPath);
          } else if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            const original = content;
            content = content.replace(/(['"])\/img\//g, `$1/${repoName}/img/`);
            if (content !== original) {
              fs.writeFileSync(fullPath, content, 'utf-8');
              console.log(`[fix-public-asset-paths] Fixed: ${fullPath}`);
            }
          }
        }
      }

      walk(distDir);
    }
  };
}

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [createVuePlugin(), fixPublicAssetPaths()],
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
    outDir: 'dist',
    rollupOptions: {
      external: [/^img\//]
    }
  }
});
