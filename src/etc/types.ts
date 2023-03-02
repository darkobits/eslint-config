import type { ESLint, Linter } from 'eslint';
import type { MarkRequired } from 'ts-essentials';


// ----- Utilities -------------------------------------------------------------

/**
 * Marks the indicated properties of the provided object type as required and
 * non-nullable.
 */
export type MarkNonNullable<T, RequiredKeys extends keyof T> = T extends T
  ? MarkRequired<{
    [K in keyof T]: K extends RequiredKeys
      ? NonNullable<T[K]>
      : T[K]
  }, RequiredKeys>
  : never;


// ----- Legacy Configuration Format -------------------------------------------

export type DefinedLegacyConfigProperties =
  // 'parserOptions' |
  // 'plugins' |
  // 'rules' |
  // 'extends' |
  // 'settings' |
  // 'rules' |
  'overrides' |
  'ignorePatterns'
;

export type LegacyESLintConfig = MarkNonNullable<
  ESLint.ConfigData,
  DefinedLegacyConfigProperties
>;


// ----- New (Flat) Configuration Format ---------------------------------------

/**
 * TODO: Determine if ESLint exports a type that we can use instead of ConfigSet
 * to represent an entire config file export type.
 */

export type DefinedFlatConfigProperties =
  'files';
  // 'ignores' |
  // 'languageOptions' |
  // 'plugins' |
  // 'settings' |
  // 'rules';

/**
 * Uses eslint.config.js which should export an array of "flat" configuration
 * objects.
 *
 * See: https://eslint.org/docs/latest/use/configure/configuration-files-new
 */
export type FlatESLintConfig = MarkNonNullable<Linter.FlatConfig, DefinedFlatConfigProperties>;

/**
 * A "config set" is the top-level type that ESLint expects the user to
 * default-export from a flat configuration file; an Array of either
 * Linter.FlatConfig objects or strings referencing built-in configuration
 * presets (ie: 'recommended').
 */
export type ConfigSet = Array<Linter.FlatConfig | string>;


// ----- Misc ------------------------------------------------------------------

/**
 * Any type that meets the requirement of having a properly-formed 'rules'
 * key; both legacy and 'flat' configuration formats will satisfy this type.
 */
export interface ConfigIsh {
  rules?: Record<string, Linter.RuleEntry> | Partial<Linter.RulesRecord>;
}
