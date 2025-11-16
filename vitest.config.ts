import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig, defaultExclude } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: [...defaultExclude, 'dist', 'coverage']
  }
})