import * as R from 'ramda';

import {
  commonConfig,
  tsxFileConfig,
  jsxFileConfig
} from 'config-sets/tsx';
import { flatConfigToLegacyOverride } from 'lib/utils';

import type { LegacyESLintConfig } from 'etc/types';


// ----- [tsx] Legacy Configuration --------------------------------------------

const config: LegacyESLintConfig = {
  extends: [
    require.resolve('./ts')
  ],
  parserOptions: {
    // Sets 'jsx' to `true`.
    ecmaFeatures: commonConfig.languageOptions?.parserOptions?.ecmaFeatures
  },
  globals: commonConfig.languageOptions.globals,
  plugins: R.keys(commonConfig.plugins),
  settings: commonConfig.settings,
  rules: commonConfig.rules,
  // This should be inherited from 'ts' that we extend.
  ignorePatterns: [],
  overrides: []
};


config.overrides.push(flatConfigToLegacyOverride(commonConfig));
config.overrides.push(flatConfigToLegacyOverride(tsxFileConfig));
config.overrides.push(flatConfigToLegacyOverride(jsxFileConfig));


export default config;
