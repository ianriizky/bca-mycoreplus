import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

/**
 * @see https://vite.dev/config/
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/fabric')) {
            return 'fabric'
          }

          if (id.includes('node_modules/colorthief')) {
            return 'colorthief'
          }

          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/zustand') ||
            id.includes('node_modules/@tanstack')
          ) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
