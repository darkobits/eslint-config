import { defineConfig } from 'eslint/config'

import { configs } from './dist/index.js'

export default defineConfig({
  name: 'root',
  extends: [configs.ts]
})