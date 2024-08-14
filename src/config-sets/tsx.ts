import stylisticPlugin from '@stylistic/eslint-plugin'
import {
  defineFlatConfig,
  type FlatESLintConfig
} from 'eslint-define-config'
// import importPlugin from 'eslint-plugin-import'
// @ts-expect-error - This package lacks type definitions.
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
// @ts-expect-error - This package lacks type definitions.
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'
// @ts-expect-error - This package lacks type definitions.
import reactPlugin from 'eslint-plugin-react'
// @ts-expect-error - This package lacks type definitions.
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import unicornPlugin from 'eslint-plugin-unicorn'
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
applyPlugin(commonConfig, { plugin: stylisticPlugin, namespace: '@stylistic' })
applyPlugin(commonConfig, { plugin: preferArrowPlugin, namespace: 'prefer-arrow' })
applyPlugin(commonConfig, { plugin: reactPlugin, namespace: 'react', applyPreset: 'recommended' })
// applyPlugin(commonConfig, { plugin: importPlugin, namespace: 'import', applyPreset: 'recommended' })
applyPlugin(commonConfig, { plugin: unicornPlugin, namespace: 'unicorn', applyPreset: 'recommended' })
applyPlugin(commonConfig, { plugin: jsxA11yPlugin, namespace: 'jsx-a11y', applyPreset: 'recommended' })
applyPlugin(commonConfig, { plugin: reactHooksPlugin, namespace: 'react-hooks', applyPreset: 'recommended' })

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