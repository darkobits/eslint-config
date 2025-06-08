import type * as tseslint from 'typescript-eslint'

export type Config = tseslint.ConfigArray[number]

export type Rules = NonNullable<Config['rules']>