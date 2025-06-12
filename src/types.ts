import type * as tseslint from 'typescript-eslint'

export type Config = tseslint.ConfigArray[number]

export type Rules = NonNullable<Config['rules']>

export type ConfigHelper = (
  ...configs: Array<tseslint.InfiniteDepthConfigWithExtends>
) => tseslint.ConfigArray

export interface Configs {
  ts: tseslint.ConfigArray
  tsx: tseslint.ConfigArray
}