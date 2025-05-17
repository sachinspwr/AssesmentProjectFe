import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/images/*',
          dest: 'src/assets/images',
        },
        {
          src: 'src/assets/svgs/*',
          dest: 'src/assets/svgs',
        },
      ],
    }),
    svgr(),
  ],
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
});
