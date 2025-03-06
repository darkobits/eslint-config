/**
 * Configuration presets (re: arrays of configuration objects) exported by this
 * plugin.
 *
 * See:
 * - https://eslint.org/docs/latest/use/configure/configuration-files-new
 * - https://eslint.org/blog/2022/08/new-config-system-part-1
 * - https://eslint.org/blog/2022/08/new-config-system-part-2
 */
export { presetTs } from './configuration-presets/preset-ts'
export { presetTsx } from './configuration-presets/preset-tsx'

/**
 * Utility for authoring type-safe configuration files.
 */
export { defineFlatConfig } from 'eslint-define-config'