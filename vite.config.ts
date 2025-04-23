import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'configure-env',
      config: () => ({
        define: {
          'process.env.NODE_ENV': JSON.stringify('production')
        }
      })
    }
  ],
  server: {
    port: 3000,
  },
  base: './',
  build: process.env.NODE_ENV === 'development' ? {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'dev.html'),
      }
    }
  } : {
    lib: {
      entry: resolve(__dirname, process.env.NODE_ENV === 'development' ? 'src/embed.dev.tsx' : 'src/embed.tsx'),
      name: 'MetisWidget',
      fileName: 'embed',
      formats: ['iife']
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.png')) {
            return 'avatars/[name].[ext]';
          }
          return '[name].[ext]';
        }
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  publicDir: 'public',
  assetsInclude: ['**/*.png']
});
