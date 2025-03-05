import path from 'node:path'

import jsEslintPlugin from '@eslint/js'
import typeScriptParser from '@typescript-eslint/parser'
import { defineFlatConfig } from 'eslint-define-config'
import globals from 'globals'
import * as R from 'ramda'

import {
  TS_EXTS,
  JS_EXTS,
  ALL_EXTS
} from 'etc/constants'
import {
  convertTypeScriptRulesToJavaScriptRules,
  parseTsConfig
} from 'lib/utils'
import { applyCommonRuleSet } from 'rules/common'
import {
  applyTSRuleSet,
  generateTypeScriptTestFileRules
} from 'rules/ts'

import type { NamedFlatEslintConfig } from 'types'

/**
 * Infer various settings from the project's tsconfig.json file.
 */
const tsConfig = parseTsConfig()

// ----- [ts] Common Configuration ---------------------------------------------

const commonConfig = applyCommonRuleSet({
  name: 'darkobits/ts/common',
  files: [
    // Include top-level configuration files in a project. This exists to
    // suppress errors in IDEs from the ESLint plugin when viewing such files.
    `*.{${ALL_EXTS}}`,
    // Include all files in sub-directories.
    `**/*.{${ALL_EXTS}}`
  ],
  ignores: R.filter(R.is(String), [
    // Ignore the project's output directory (at any level of the project tree),
    // if defined.
    tsConfig?.outDir && `**/${path.basename(tsConfig.outDir)}/**`,
    // Ignore declaration files.
    '**/*.d.ts'
  ]),
  languageOptions: {
    sourceType: 'module',
    parser: typeScriptParser,
    parserOptions: {
      project: tsConfig.tsConfigPath
    },
    ecmaVersion: 'latest',
    globals: {
      // Note: 'node' contains CommonJS globals that may not be available when
      // compiling to ESM.
      ...globals.node,
      ...globals.nodeBuiltin,
      ...globals.es2021
    }
  },
  linterOptions: {
    reportUnusedDisableDirectives: true
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': TS_EXTS.split(',').map(ext => `.${ext}`)
    },
    'import/resolver': {
      'eslint-import-resolver-typescript': {
        project: tsConfig.tsConfigPath
      }
    },
    'import/ignore': [
      'node_modules'
    ]
  },
  rules: {
    // This is the preferred way to "extend" "eslint:recommended", which is now
    // deprecated and will issue a warning if used.
    ...jsEslintPlugin.configs?.recommended?.rules
  }
})

// ----- [ts] TypeScript Files -------------------------------------------------

// Apply our rules _after_ applying plugins' rule-sets to ensure ours override
// the rule configurations from presets.
const tsFileConfig = applyTSRuleSet({
  name: 'darkobits/ts/files-ts',
  files: [`**/*.{${TS_EXTS}}`],
  ignores: commonConfig.ignores,
  // plugins: { ...commonConfig.plugins },
  languageOptions: {
    globals: {
      // See: https://github.com/Chatie/eslint-config/issues/45
      NodeJS: 'readonly'
    }
  }
})

// ----- [ts] JavaScript Files -------------------------------------------------

const jsFileConfig: NamedFlatEslintConfig = {
  name: 'darkobits/js/files-js',
  files: [`**/*.{${JS_EXTS}}`],
  ignores: commonConfig.ignores,
  plugins: { ...commonConfig.plugins },
  rules: convertTypeScriptRulesToJavaScriptRules(tsFileConfig.rules)
}

// ----- [ts] Test Files -------------------------------------------------------

const tsTestFileConfig: NamedFlatEslintConfig = {
  name: 'darkobits/ts/tests-ts',
  files: [`**/*.{spec,test}.{${TS_EXTS}}`],
  ignores: commonConfig.ignores,
  rules: generateTypeScriptTestFileRules()
}

const jsTestFileConfig: NamedFlatEslintConfig = {
  name: 'darkobits/js/tests-js',
  files: [`**/*.{spec,test}.{${JS_EXTS}}`],
  ignores: commonConfig.ignores,
  rules: convertTypeScriptRulesToJavaScriptRules(tsTestFileConfig.rules)
}

// ----- [ts] Configuration Set ------------------------------------------------

/**
 * Configuration set for TypeScript projects. This value may be exported
 * directly to ESLint or spread into a new array if additional configuration
 * objects need to be used.
 */
export const tsConfigSet = defineFlatConfig([
  commonConfig,
  tsFileConfig,
  jsFileConfig,
  tsTestFileConfig,
  jsTestFileConfig
])