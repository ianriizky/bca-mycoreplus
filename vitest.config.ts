import react from '@vitejs/plugin-react'
import path from 'path'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  oxc: false,
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    setupFiles: ['tests/setup.ts'],
    projects: [
      {
        extends: true,
        test: {
          name: 'jsdom',
          environment: 'jsdom',
          include: [
            'tests/int/jsdom/**/*.int.spec.ts',
            'tests/int/jsdom/**/*.int.spec.tsx',
          ],
        },
      },
    ],
    env: loadEnv(mode, '.', ''),
    globals: true,
    root: './',
    reporters: ['default', 'html', 'junit'],
    outputFile: {
      html: './tests/output/int/html/index.html',
      junit: './tests/output/int/junit.xml',
    },
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'tests/int/jsdom/**/*.int.spec.ts',
        'tests/int/jsdom/**/*.int.spec.tsx',
      ],
      reporter: ['cobertura', 'json', 'lcov', 'html'],
      reportsDirectory: './tests/coverage/int',
    },
  },
}))
