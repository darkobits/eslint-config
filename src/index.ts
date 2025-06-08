import * as tseslint from 'typescript-eslint'

import { ts } from './configuration-presets/preset-ts'
import { tsx } from './configuration-presets/preset-tsx'

import type { ConfigArray, InfiniteDepthConfigWithExtends } from 'typescript-eslint'

export type ConfigHelper = (
  ...configs: Array<InfiniteDepthConfigWithExtends>
) => ConfigArray

export interface Configs {
  ts: ConfigArray
  tsx: ConfigArray
}

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