import { ts } from '@/configs/ts'
import { tsx } from '@/configs/tsx'

import type { ESLint } from 'eslint'

export const configs = { recommended: ts, ts, tsx } satisfies NonNullable<ESLint.Plugin['configs']>

export default { configs } satisfies ESLint.Plugin