import {
  defineFlatConfig,
  type FlatESLintConfig
} from 'eslint-define-config'
// @ts-expect-error - This package lacks type definitions.
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
// @ts-expect-error - This package lacks type definitions.
import reactPlugin from 'eslint-plugin-react'
// @ts-expect-error - This package lacks type definitions.
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

import { tsConfigSet } from 'config-sets/ts'
import { ALL_EXTS } from 'etc/constants'
import {
  applyPlugin,
  convertTypeScriptRulesToJavaScriptRules,
  disableGlobals
} from 'lib/utils'
import { applyTSXRuleSet } from 'rules/tsx'

// ----- [tsx] Common Configuration --------------------------------------------

export const commonConfig: FlatESLintConfig = {
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
      'JSX': 'readonly'
    }
  },
  settings: {
    // TODO: This can be removed when eslint-plugin-react adds this setting as a
    // default in a future version.
    react: {
      version: 'detect'
    }
  }
}

// Apply plugins and their configuration presets.
applyPlugin(commonConfig, { namespace: 'react', plugin: reactPlugin, applyPreset: 'recommended' })
applyPlugin(commonConfig, { namespace: 'react-hooks', plugin: reactHooksPlugin, applyPreset: 'recommended' })
applyPlugin(commonConfig, { namespace: 'jsx-a11y', plugin: jsxA11yPlugin, applyPreset: 'recommended' })

// Apply our custom rule-set _after_ applying plugins' rule-sets.
applyTSXRuleSet(commonConfig)

// ----- [tsx] JavaScript JSX Files --------------------------------------------

export const jsxFileConfig: FlatESLintConfig = {
  files: ['**/*.{js,jsx}'],
  rules: convertTypeScriptRulesToJavaScriptRules(commonConfig.rules)
}

// ----- [tsx] Configuration Set -----------------------------------------------

/**
 * Configuration set for TypeScript React projects. This value may be exported
 * directly to ESLint or spread into a new array if additional configuration
 * objects need to be used.
 */
export const tsxConfigSet = defineFlatConfig([
  ...tsConfigSet,
  commonConfig,
  jsxFileConfig
])