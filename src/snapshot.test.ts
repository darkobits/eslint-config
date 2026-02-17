import { ESLint } from 'eslint'
import { defineConfig, type Config } from 'eslint/config'
import { describe, it, expect } from 'vitest'

import { configs } from './index'

async function computeConfigForThisFile(config: ReturnType<typeof defineConfig>): Promise<Config> {
  const eslint = new ESLint({ overrideConfigFile: true, baseConfig: config })
  const computedConfig = await eslint.calculateConfigForFile(import.meta.filename)
  try {
    Reflect.deleteProperty(computedConfig, 'gitignorePath')
    Reflect.deleteProperty(computedConfig?.languageOptions?.parserOptions ?? {}, 'tsconfigRootDir')
    Reflect.deleteProperty(computedConfig?.settings['import/resolver']?.typescript, 'project')
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(`Failed to remove tsconfigRootDir from config object:`, error)
  }

  return computedConfig
}

describe('configs', () => {
  describe('ts', () => {
    it('should match the snapshot', async () => {
      expect(await computeConfigForThisFile(configs.ts)).toMatchSnapshot()
    })
  })

  describe('tsx', () => {
    it('should match the snapshot', async () => {
      expect(await computeConfigForThisFile(configs.tsx)).toMatchSnapshot()
    })
  })
})