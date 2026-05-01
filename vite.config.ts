import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * @see https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
})
