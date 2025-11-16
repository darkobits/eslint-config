import { ts } from '@/configs/ts'
import { tsx } from '@/configs/tsx'

import type { ESLint } from 'eslint'

export const configs = { ts, tsx, recommended: ts } satisfies NonNullable<ESLint.Plugin['configs']>

export default { configs } satisfies ESLint.Plugin