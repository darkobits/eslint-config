import { defineConfig } from 'eslint-define-config';

import {
  commonConfig,
  jsxFileConfig
} from 'config-sets/tsx';
import { flatConfigToLegacyOverride } from 'lib/utils';


// ----- [tsx] Legacy Configuration --------------------------------------------

export default defineConfig({
  extends: [
    require.resolve('./ts')
  ],
  parserOptions: {
    // Sets 'jsx' to `true`.
    ecmaFeatures: commonConfig.languageOptions?.parserOptions?.ecmaFeatures
  },
  globals: commonConfig.languageOptions?.globals,
  plugins: Object.keys(commonConfig.plugins ?? {}),
  settings: commonConfig.settings,
  rules: commonConfig.rules,
  // This should be inherited from 'ts' that we extend.
  ignorePatterns: [],
  overrides: [
    flatConfigToLegacyOverride(commonConfig),
    flatConfigToLegacyOverride(jsxFileConfig)
  ]
});
