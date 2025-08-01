import packageJsonPlugin from 'eslint-plugin-package-json'

import eslintPlugin, { type ConfigArray } from './dist'

const config: ConfigArray = eslintPlugin.config(
  packageJsonPlugin.configs.recommended,
  {
    extends: [
      ...eslintPlugin.configs.ts
    ],
    rules: {
      // '@stylistic/max-len': ['warn', 120],
      'unicorn/no-empty-file': 'off'
    }
  }
)

export default config