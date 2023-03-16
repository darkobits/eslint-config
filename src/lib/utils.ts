import fs from 'fs';

import { parse } from 'comment-json';
import findUp from 'find-up';
import * as R from 'ramda';

import type { ESLint, Linter } from 'eslint';
import type { FlatESLintConfigItem } from 'eslint-define-config';


export interface TsConfigResult {
  tsConfigPath: string;
  srcDir: string | undefined;
  outDir: string | undefined;
}

/**
 * Returns the path to the first tsconfig.json file found at or above
 * `process.cwd()`. If the file cannot be found, returns false. If the file is
 * unreadable, returns false and issues a warning.
 *
 * TODO: Use tsconfck for this.
 */
export function parseTsConfig(): TsConfigResult | void {
  const tsConfigPath = findUp.sync('tsconfig.json', { type: 'file' });

  if (!tsConfigPath) {
    return;
  }

  let srcDir;
  let outDir;

  try {
    fs.accessSync(tsConfigPath, fs.constants.R_OK);

    // @ts-expect-error - We can use null here.
    // eslint-disable-next-line unicorn/no-null
    const parsedTsConfig: any = parse(fs.readFileSync(tsConfigPath, 'utf8'), null, true);

    if (typeof parsedTsConfig === 'object') {
      srcDir = parsedTsConfig.compilerOptions?.baseUrl;
      outDir = parsedTsConfig.compilerOptions?.outDir;
    }
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // eslint-disable-next-line no-console
      console.warn([
        '[@darkobits/eslint-plugin] Attempted to automatically set ESLint\'s',
        `parserOptions.project to "${tsConfigPath}", but the file could not`,
        'be read. You will need to create a tsconfig.json or set',
        'parserOptions.project yourself.'
      ].join(' '));
    }

    return;
  }

  return {
    tsConfigPath,
    srcDir,
    outDir
  };
}


export interface ApplyPluginOptions {
  namespace: string;
  plugin: ESLint.Plugin;
  applyPreset?: string | Array<string>;
}

/**
 * In order for configuration in the 'rules' key to look-up rules from plug-ins
 * correctly, the key used in 'plugins' _must_ match the namespace portion of
 * the rule when referenced in 'rules'. For example:
 *
 * Let's assume that:
 * - A package named "eslint-plugin-do-something" is an ESLint plugin that
 *   defines two custom rules: "foo-rule" and "bar-rule".
 * - The plugin also exports a configuration preset named "recommended" that
 *   enables "foo-rule". "bar-rule" can be enabled by the user if they so
 *   desire.
 * - We want to add this plugin to our flat config AND use the plugin's
 *   "recommended" preset.
 *
 * In order for that to work, we have to be _extremely_ careful about what key
 * we use in 'plugins' when adding the plugin:
 *
 * ```ts
 * import foo from 'eslint-plugin-do-something';
 *
 * const config = {
 *   plugins: {
 *     // With flat config, the name of the package from which the plugin
 *     // originated is irrelevant. Instead, the key that we make up here is
 *     // what ESLint will use when resolving rules from this plugin.
 *     'baz': foo
 *   },
 *   rules: {
 *     // Example of using a built-in ESLint rule.
 *     'no-undef': 'error',
 *     // Manually configure a custom rule using the custom 'baz' namespace we
 *     // used in 'plugins' above.
 *     'baz/foo-rule': 'warn'
 *   }
 * };
 * ```
 *
 * However, all plugins written prior to the advent of "flat config" that both
 * (1) provide custom rules and (2) provide configuration presets that
 * incorporate those custom rules will (3) define said configuration presets
 * with a specific namespace, and if that namespace is not used in the 'plugins'
 * key, any 'rules' that are added to the configuration from that plugin will
 * fail to resolve the rule's implementation and throw an error.
 */
export function applyPlugin(config: FlatESLintConfigItem, options: ApplyPluginOptions) {
  const { namespace, plugin, applyPreset } = options;

  config.plugins = config.plugins ?? {};
  config.rules = config.rules ?? {};

  if (!plugin) throw new Error('No plugin provided.');
  // TODO: Can we derive any info by introspecting the plugin value here? Maybe
  // resolve the package it came from?
  if (!namespace) throw new Error('No namespace provided.');

  // Apply plugin.
  config.plugins[namespace] = plugin;

  if (applyPreset) {
    if (!plugin.configs) throw new Error(`Plugin "${namespace}" does not provide any presets.`);

    const presetsToApply = Array.isArray(applyPreset)
      ? applyPreset
      : [applyPreset];

    for (const preset of presetsToApply) {
      if (!plugin.configs[preset]) throw new Error(`Plugin "${namespace}" has no preset "${preset}".`);
      const { rules } = plugin.configs[preset];
      if (!rules) throw new Error(`Preset ${namespace}/${preset} has no rule configurations.`);

      Object.entries(rules).forEach(([ruleName, ruleConfig]) => {
        config.rules = config.rules ?? {};
        if (!ruleConfig) return;
        config.rules[ruleName] = ruleConfig;
      });
    }
  }
}


export function flatConfigToLegacyOverride(flatConfig: FlatESLintConfigItem) {
  const legacyOverride: Partial<Linter.ConfigOverride> = R.pick([
    'files',
    'rules'
  ], flatConfig);

  if (flatConfig.plugins) {
    legacyOverride.plugins = R.keys(flatConfig.plugins);
  }

  // languageOptions.sourceType -> parserOptions.sourceType
  // languageOptions.ecmaVersion -> parserOptions.ecmaVersion
  // languageOptions.parserOptions.project -> parserOptions.project
  if (flatConfig.languageOptions) {
    // @ts-expect-error - Mismatch on `ecmaVersion` between legacy and flat
    // configuration types.
    legacyOverride.parserOptions = {
      ...R.omit(['sourceType', 'globals'], flatConfig.languageOptions),
      ...flatConfig.languageOptions.parserOptions
    };
  }

  if (flatConfig.languageOptions?.globals) {
    legacyOverride.globals = flatConfig.languageOptions.globals;
  }

  return legacyOverride as Linter.ConfigOverride;
}


/**
 * Provided either a legacy or flat configuration object with a `rules`
 * property, reduces those rules into a new rules object by omitting any
 * @typescript-eslint rules and re-enabling any disabled non-TypeScript variant,
 * applying the same settings.
 *
 * For example, if the provided configuration contains:
 *
 * 'no-undef': 'off'
 * '@typescript-eslint/no-undef': 'error'
 *
 * This function will output:
 *
 * 'no-undef': 'error'
 *
 */
export function convertTypeScriptRulesToJavaScriptRules(typeScriptRules: FlatESLintConfigItem['rules'] = {}) {
  return R.reduce((javaScriptRules, [ruleName, ruleConfig]) => {

    // Not likely to happen at runtime, but narrows ruleConfig to non-nullable.
    if (!ruleConfig) return javaScriptRules;

    // If not dealing with a @typescript-eslint rule, add it to the new rules
    // as-is.
    if (!ruleName.startsWith('@typescript-eslint')) {
      javaScriptRules[ruleName] = ruleConfig;
      return javaScriptRules;
    }

    // Otherwise, compute the name of the JavaScript variant of the rule by
    // removing the '@typescript-eslint' namespace. This assumes that
    // @typescript-eslint rules always have a non-TypeScript variant in the
    // base ESLint rules, which should always be the case.
    const jsRuleName = ruleName.replace('@typescript-eslint/', '');

    // If we have explicitly disabled the non-TypeScript variant of the rule in
    // the TypeScript configuration, re-enable it using the same settings in the
    // JavaScript configuration. This assumes that the schema for the rules is
    // the same.
    if (typeScriptRules[jsRuleName] === 'off') {
      javaScriptRules[jsRuleName] = ruleConfig;
    }

    return javaScriptRules;
  }, {} as Linter.RulesRecord, R.toPairs(typeScriptRules));
}


/**
 * Provided an object defining ESLint globals (a dictionary mapping strings to
 * booleans where `true` indicates the global is writable and `false` indicates
 * the global is read-only) returns an object where all keys have a value of
 * `'off'`, indicating the global is not available.
 *
 * N.B. The value "off" is disallowed in the type-def for "globals", but no type
 * error is thrown when mapObjIndexed is used. Hopefully the ESLint type-def is
 * updated to support "off" in a future version.
 */
export function disableGlobals(globalsObj: NonNullable<NonNullable<Linter.FlatConfig['languageOptions']>['globals']>) {
  // N.B. We use `mapObjIndexed` here over `map` despite the fact that Ramda's
  // `map` supports objects because its type-defs are a mess.
  return R.mapObjIndexed<boolean, 'off'>(R.always('off'), globalsObj);
}
