import * as tseslint from 'typescript-eslint'

import { ts } from './configs/ts'
import { tsx } from './configs/tsx'

import type { ConfigHelper, Configs } from './types'

/**
 * Utility for authoring type-safe configuration files.
*/
export const config: ConfigHelper = tseslint.config

/**
 * Configuration presets exported by this package.
 *
 * See:
 * - https://eslint.org/docs/latest/use/configure/configuration-files-new
 * - https://eslint.org/blog/2022/08/new-config-system-part-1
 * - https://eslint.org/blog/2022/08/new-config-system-part-2
 */
export const configs: Configs = { ts, tsx }

export default {
  config,
  configs
}

export { type ConfigArray } from 'typescript-eslint'
export * from './types'