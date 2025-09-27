import { defineConfig } from 'eslint/config'
import packageJsonPlugin from 'eslint-plugin-package-json'

import plugin from './dist'

export default defineConfig({
  extends: [
    packageJsonPlugin.configs.recommended,
    plugin.configs.recommended
  ],
  rules: {
    'unicorn/no-empty-file': 'off'
  },
  settings: {
    packageJson: {
      enforceForPrivate: false
    }
  }
})