import eslintPlugin, { type ConfigArray } from './dist'

const config: ConfigArray = eslintPlugin.config(
  eslintPlugin.configs.ts,
  {
    rules: {
      '@stylistic/max-len': ['warn', 120],
      'unicorn/no-empty-file': 'off'
    }
  }
)

export default config