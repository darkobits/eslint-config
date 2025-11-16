import { ESLint } from 'eslint'
import { defineConfig, type Config } from 'eslint/config'
import { describe, it, expect } from 'vitest'

import { configs } from './index'

async function computeConfigForThisFile(config: ReturnType<typeof defineConfig>): Promise<Config> {
  const eslint = new ESLint({ overrideConfigFile: true, baseConfig: config })
  return eslint.calculateConfigForFile(import.meta.filename)
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

// describe('rule diffs', async () => {
//   const noRulesConfig = await computeConfigForThisFile(configs.tsNoRules)
//   const tsConfig = await computeConfigForThisFile(configs.ts)
//   Object.entries(tsConfig.rules ?? {}).forEach(([ruleName, ruleConfig]) => {
//     const baseConfig = Reflect.get(noRulesConfig.rules ?? {}, ruleName)
//     if (!ruleConfig || !baseConfig) return
//     if (JSON.stringify(baseConfig) !== JSON.stringify(ruleConfig)) {
//       it(`${ruleName} config mismatch`, () => {
//         expect(baseConfig).toMatchObject(ruleConfig as any)
//       })
//     }
//   })
// })