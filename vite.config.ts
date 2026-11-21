import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the build works on any GitHub Pages path
  // (https://<user>.github.io/<repo>/) without hard-coding the repo name.
  base: './',
  build: {
    rolldownOptions: {
      output: {
        // Libraries change far less often than the guide's content: a separate chunk stays cached
        // across content updates, and keeps the app chunk under Vite's 500 kB warning.
        codeSplitting: {
          groups: [{ name: 'vendor', test: /[\\/]node_modules[\\/]/ }],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/test/**', 'src/**/*.test.{ts,tsx}'],
      thresholds: { lines: 80, functions: 80, branches: 75, statements: 80 },
    },
  },
})
