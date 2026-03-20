import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        legacy: resolve(__dirname, 'legacy.html'),
        collection: resolve(__dirname, 'collection.html'),
        aboutServices: resolve(__dirname, 'about-services.html')
      }
    }
  }
});
