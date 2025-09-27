import { ts } from '@/configs/ts'
import { tsx } from '@/configs/tsx'

import type { ESLint } from 'eslint'

export default {
  /**
   * Configuration presets exported by this package.
   *
   * See:
   * - https://eslint.org/docs/latest/use/configure/configuration-files-new
   * - https://eslint.org/blog/2022/08/new-config-system-part-1
   * - https://eslint.org/blog/2022/08/new-config-system-part-2
   */
  configs: {
    recommended: ts,
    ts,
    tsx
  }
} as const satisfies ESLint.Plugin