/**
 * @fileoverview Uses the common rules for the 'ts' preset (see: rules/ts) to
 * build a legacy ESLint configuration object.
 */
import * as R from 'ramda';

import {
  commonConfig,
  tsFileConfig,
  jsFileConfig,
  tsTestFileConfig,
  jsTestFileConfig
} from 'config-sets/ts';
import { flatConfigToLegacyOverride } from 'lib/utils';

import type { LegacyESLintConfig } from 'etc/types';


// ----- [ts] Legacy Configuration ---------------------------------------------

const config: LegacyESLintConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // N.B. We don't copy this setting from our flat configuration because
    // ESLint infers it automatically when using flat config.
    sourceType: 'module',
    ecmaVersion: commonConfig.languageOptions.ecmaVersion,
    project: commonConfig.languageOptions.parserOptions?.project
  },
  env: {
    browser: false,
    node: true
  },
  plugins: R.keys(commonConfig.plugins),
  // These extended rule-sets will have been applied to the 'rules' that we copy
  // from the flat configuration; there is no need to use extends here as long
  // as the corresponding 'plugins' are loaded.
  // extends: [
  //   'eslint:recommended',
  //   'plugin:@typescript-eslint/eslint-recommended',
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:unicorn/recommended'
  // ],
  settings: commonConfig.settings,
  rules: commonConfig.rules,
  ignorePatterns: commonConfig.ignores,
  overrides: []
};

// Apply every other flat configuration object as an override. These types are
// were intentionally designed by ESLint to be compatible.
config.overrides.push(flatConfigToLegacyOverride(commonConfig));
config.overrides.push(flatConfigToLegacyOverride(tsFileConfig));
config.overrides.push(flatConfigToLegacyOverride(jsFileConfig));
config.overrides.push(flatConfigToLegacyOverride(tsTestFileConfig));
config.overrides.push(flatConfigToLegacyOverride(jsTestFileConfig));


export default config;
