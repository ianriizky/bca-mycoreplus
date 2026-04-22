import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  oxc: false,
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'jsdom',
          environment: 'jsdom',
          include: ['tests/int/jsdom/**/*.int.spec.ts', 'tests/int/jsdom/**/*.int.spec.tsx'],
        },
      },
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['tests/int/node/**/*.int.spec.ts'],
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
        'tests/int/node/**/*.int.spec.ts',
        'tests/e2e/**/*.e2e.spec.ts',
      ],
      reporter: ['cobertura', 'json', 'lcov', 'html'],
      reportsDirectory: './tests/coverage/int',
    },
  },
}))
