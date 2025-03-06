import { getTsconfig } from 'get-tsconfig'
import * as R from 'ramda'

import type { Linter } from 'eslint'
import type { NamedFlatEslintConfig } from 'types'

export interface TsConfigResult {
  tsConfigPath: string
  srcDir: string | undefined
  outDir: string | undefined
}

/**
 * Returns the path to the first tsconfig.json file found at or above
 * `process.cwd()`. If the file cannot be found, returns `undefined`.
 */
export function parseTsConfig(): TsConfigResult {
  const result = getTsconfig()

  if (!result) throw new Error(
    '[@darkobits/eslint-config] Unable to locate a tsconfig.json file.'
  )

  return {
    tsConfigPath: result.path,
    srcDir: result.config.compilerOptions?.baseUrl,
    outDir: result.config.compilerOptions?.outDir
  }
}

/**
 * Provided either a configuration object with a `rules` property, reduces those
 * rules into a new rules object by omitting any @typescript-eslint rules and
 * re-enabling any disabled non-TypeScript variant, applying the same settings.
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
export function convertTypeScriptRulesToJavaScriptRules(typeScriptRules: NamedFlatEslintConfig['rules'] = {}) {
  return R.reduce((javaScriptRules, [ruleName, ruleConfig]) => {
    // Not likely to happen at runtime, but narrows ruleConfig to non-nullable.
    if (!ruleConfig) return javaScriptRules

    // If not dealing with a @typescript-eslint rule, add it to the new rules
    // as-is.
    if (!ruleName.startsWith('@typescript-eslint')) {
      javaScriptRules[ruleName] = ruleConfig
      return javaScriptRules
    }

    // Otherwise, compute the name of the JavaScript variant of the rule by
    // removing the '@typescript-eslint' namespace. This assumes that
    // @typescript-eslint rules always have a non-TypeScript variant in the
    // base ESLint rules, which should always be the case.
    const jsRuleName = ruleName.replace('@typescript-eslint/', '')

    // If we have explicitly disabled the non-TypeScript variant of the rule in
    // the TypeScript configuration, re-enable it using the same settings in the
    // JavaScript configuration. This assumes that the schema for the rules is
    // the same.
    if (typeScriptRules[jsRuleName] === 'off') {
      javaScriptRules[jsRuleName] = ruleConfig
    }

    return javaScriptRules
  }, {} as Linter.RulesRecord, R.toPairs(typeScriptRules))
}

/**
 * Provided an object defining ESLint globals (a dictionary mapping strings to
 * booleans where `true` indicates the global is writable and `false` indicates
 * the global is read-only) returns an object where all keys have a value of
 * `'off'`, indicating the global is not available.
 */
export function disableGlobals(globalsObj: any) {
  return R.map(R.always('off'), globalsObj) as any
}