import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'ViteBuild',
      fileName: (format) => `vite-build.${format}.js`
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.js')
      }
    }
  }
});
