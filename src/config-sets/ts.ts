// @ts-expect-error - This package lacks type definitions.
import jsEslintPlugin from '@eslint/js';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import typeScriptParser from '@typescript-eslint/parser';
import { defineFlatConfig, type FlatESLintConfigItem } from 'eslint-define-config';
// @ts-expect-error - This package lacks type definitions.
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error - This package lacks type definitions.
import preferArrowPlugin from 'eslint-plugin-prefer-arrow';
// @ts-expect-error - This package lacks type definitions.
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import * as R from 'ramda';

import {
  TS_EXTS,
  JS_EXTS,
  ALL_EXTS
} from 'etc/constants';
import {
  applyPlugin,
  convertTypeScriptRulesToJavaScriptRules,
  parseTsConfig
} from 'lib/utils';
import {
  applyTSRuleSet,
  generateTypeScriptTestFileRules
} from 'rules/ts';

import type { ESLint } from 'eslint';


/**
 * Infer various settings from the project's tsconfig.json file.
 */
const tsConfigResult = parseTsConfig();


// ----- [ts] Common Configuration ---------------------------------------------

export const commonConfig: FlatESLintConfigItem = {
  files: [`**/*.{${ALL_EXTS}}`],
  ignores: R.filter(R.is(String), [
    // Ignore the project's output directory (at any level of the project tree),
    // if defined.
    tsConfigResult?.outDir && `**/${tsConfigResult.outDir}/**`,
    // Ignore declaration files.
    '**/*.d.ts'
  ]),
  languageOptions: {
    sourceType: 'module',
    // @ts-expect-error - ESLint's typings for this property only allow strings,
    // but the API accepts a parser instance as well.
    parser: typeScriptParser,
    parserOptions: {
      project: tsConfigResult?.tsConfigPath
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
        project: tsConfigResult?.tsConfigPath
      }
    }
  },
  rules: {
    // This is the preferred way to "extend" "eslint:recommended", which is now
    // deprecated and will issue a warning if used.
    ...jsEslintPlugin.configs?.recommended?.rules
  }
};

applyPlugin(commonConfig, { plugin: importPlugin, namespace: 'import', applyPreset: 'recommended' });
applyPlugin(commonConfig, { plugin: unicornPlugin, namespace: 'unicorn', applyPreset: 'recommended' });
applyPlugin(commonConfig, { plugin: preferArrowPlugin, namespace: 'prefer-arrow' });


// ----- [ts] TypeScript Files -------------------------------------------------

export const tsFileConfig: FlatESLintConfigItem = {
  files: [`**/*.{${TS_EXTS}}`],
  languageOptions: {
    globals: {
      // See: https://github.com/Chatie/eslint-config/issues/45
      'NodeJS': 'readonly'
    }
  }
};

applyPlugin(tsFileConfig, {
  // TODO: See if this typing issue is resolved in a future release.
  plugin: tsEslintPlugin as unknown as ESLint.Plugin,
  namespace: '@typescript-eslint',
  applyPreset: 'recommended'
});

// Apply our rules _after_ applying plugins' rule-sets to ensure ours override
// the rule configurations from presets.
applyTSRuleSet(tsFileConfig);


// ----- [ts] JavaScript Files -------------------------------------------------

export const jsFileConfig: FlatESLintConfigItem = {
  files: [`**/*.{${JS_EXTS}}`],
  rules: convertTypeScriptRulesToJavaScriptRules(tsFileConfig.rules)
};


// ----- [ts] Test Files -------------------------------------------------------

export const tsTestFileConfig: FlatESLintConfigItem = {
  files: [`**/*.{spec,test}.{${TS_EXTS}}`],
  rules: generateTypeScriptTestFileRules()
};

export const jsTestFileConfig: FlatESLintConfigItem = {
  files: [`**/*.{spec,test}.{${JS_EXTS}}`],
  rules: convertTypeScriptRulesToJavaScriptRules(tsTestFileConfig.rules)
};


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
]);
