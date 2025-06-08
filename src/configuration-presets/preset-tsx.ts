// @ts-expect-error - This package lacks type definitions.
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import * as tseslint from 'typescript-eslint'

import { getTypeScriptReactRules } from 'rules/tsx'

import { ts } from './preset-ts'

export const tsx: tseslint.ConfigArray = tseslint.config(
  // ----- TypeScript Files ----------------------------------------------------
  {
    files: ['**/*.ts'],
    extends: [ts],
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'jsx-a11y': jsxA11yPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...getTypeScriptReactRules()
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