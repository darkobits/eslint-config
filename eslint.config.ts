import { defineConfig } from 'eslint/config'

import { configs } from './dist/index.mjs'

export default defineConfig(
  configs.ts
)