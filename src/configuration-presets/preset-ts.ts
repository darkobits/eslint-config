import path from 'node:path'

import eslint from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
// @ts-expect-error - This package lacks type definitions.
import importPlugin from 'eslint-plugin-import'
// @ts-expect-error - This package lacks type definitions.
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'
import unicornPlugin from 'eslint-plugin-unicorn'
import { getTsconfig } from 'get-tsconfig'
import * as tseslint from 'typescript-eslint'

import { getCommonRules } from 'rules/common'
import { getTypeScriptRules } from 'rules/ts'

const tsconfigPath = getTsconfig()?.path
const tsconfigRootDir = path.dirname(tsconfigPath ?? '')

export const ts: tseslint.ConfigArray = tseslint.config(
  // ----- TypeScript Files ----------------------------------------------------
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      unicornPlugin.configs.recommended
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir
      }
    },
    plugins: {
      '@stylistic': stylisticPlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'import': importPlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'prefer-arrow': preferArrowPlugin
      // 'unicorn': unicornPlugin
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    settings: {
      'import/resolver': {
        'eslint-import-resolver-typescript': {
          project: tsconfigPath
        }
      },
      'import/ignore': [
        'node_modules'
      ]
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      ...getCommonRules(),
      ...getTypeScriptRules(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...importPlugin.configs.recommended.rules
    }
  },
  // ----- JavaScript Files ----------------------------------------------------
  {
    files: ['**/*.js'],
    extends: [
      tseslint.configs.disableTypeChecked
    ],
    rules: {
      // turn off rules that don't apply to JS code
      // '@typescript-eslint/explicit-function-return-type': 'off',
    }
  }
)