import { defineFlatConfig } from 'eslint-define-config'
import globals from 'globals'

import { presetTs } from 'configuration-presets/preset-ts'
import { ALL_EXTS } from 'etc/constants'
import {
  convertTypeScriptRulesToJavaScriptRules,
  disableGlobals
} from 'lib/utils'
import { applyTSXRuleSet } from 'rules/tsx'

import type { NamedFlatEslintConfig } from 'types'

// ----- [tsx] Common Configuration --------------------------------------------

// Apply our custom rule-set _after_ applying plugins' rule-sets.
const commonConfig = applyTSXRuleSet({
  name: 'darkobits/tsx/common',
  files: [`**/*.{${ALL_EXTS}}`],
  languageOptions: {
    // This should be set upstream by the 'ts' config set.
    // parser: typeScriptParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: {
      ...disableGlobals(globals.node),
      ...globals.browser,
      // See: https://github.com/Chatie/eslint-config/issues/45
      JSX: 'readonly'
    }
  },
  settings: {
    // TODO: This can be removed when eslint-plugin-react adds this setting as a
    // default in a future version.
    react: {
      version: 'detect'
    }
  }
})

// ----- [tsx] JavaScript JSX Files --------------------------------------------

export const jsxFileConfig: NamedFlatEslintConfig = {
  name: 'darkobits/tsx/files-jsx',
  files: ['**/*.{js,jsx}'],
  rules: convertTypeScriptRulesToJavaScriptRules(commonConfig.rules)
}

// ----- [tsx] Configuration Set -----------------------------------------------

/**
 * Configuration set for TypeScript React projects. This value may be exported
 * directly to ESLint or spread into a new array if additional configuration
 * objects need to be used.
 */
export const presetTsx = defineFlatConfig([
  ...presetTs,
  commonConfig,
  jsxFileConfig
])