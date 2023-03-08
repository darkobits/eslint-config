// @ts-expect-error - This package lacks type definitions.
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// @ts-expect-error - This package lacks type definitions.
import reactPlugin from 'eslint-plugin-react';
// @ts-expect-error - This package lacks type definitions.
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { tsConfigSet } from 'config-sets/ts';
import { ALL_EXTS } from 'etc/constants';
import {
  applyPlugin,
  convertTypeScriptRulesToJavaScriptRules,
  disableGlobals
} from 'lib/utils';
import { applyTSXRuleSet } from 'rules/tsx';

import type {
  ConfigSet,
  FlatESLintConfig,
  MarkNonNullable
} from 'etc/types';


// ----- [tsx] Common Configuration --------------------------------------------

export const commonConfig: MarkNonNullable<FlatESLintConfig, 'languageOptions'> = {
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
      ...globals.browser
    }
  },
  settings: {
    // TODO: This can be removed when eslint-plugin-react adds this setting as a
    // default in a future version.
    react: {
      version: 'detect'
    }
  }
};


// ----- [tsx] TypeScript JSX Files --------------------------------------------

export const tsxFileConfig: FlatESLintConfig = {
  files: ['**/*.tsx'],
  languageOptions: {
    globals: {
      // N.B. `false` indicates the global is defined but read-only. This is
      // here to prevent the no-undef rule from throwing because it cannot
      // find the "JSX" global type. This appears to be an issue that
      // emerged in @typescript-eslint/parser@4.
      // See: https://github.com/Chatie/eslint-config/issues/45
      'JSX': false
    }
  }
};

// Apply plugins and their configuration presets.
applyPlugin(tsxFileConfig, { namespace: 'react', plugin: reactPlugin, applyPreset: 'recommended' });
applyPlugin(tsxFileConfig, { namespace: 'react-hooks', plugin: reactHooksPlugin, applyPreset: 'recommended' });
applyPlugin(tsxFileConfig, { namespace: 'jsx-a11y', plugin: jsxA11yPlugin, applyPreset: 'recommended' });

// Apply our custom rule-set _after_ applying plugins' rule-sets.
applyTSXRuleSet(tsxFileConfig);


// ----- [tsx] JavaScript JSX Files --------------------------------------------

export const jsxFileConfig: FlatESLintConfig = {
  files: ['**/*.jsx'],
  rules: convertTypeScriptRulesToJavaScriptRules(tsxFileConfig.rules)
};


// ----- [tsx] Configuration Set -----------------------------------------------

/**
 * Configuration set for TypeScript React projects. This value may be exported
 * directly to ESLint or spread into a new array if additional configuration
 * objects need to be used.
 */
export const tsxConfigSet: ConfigSet = [
  ...tsConfigSet,
  commonConfig,
  tsxFileConfig,
  jsxFileConfig
];
