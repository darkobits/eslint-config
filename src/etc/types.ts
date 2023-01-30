import type { ESLint } from 'eslint';
import type { DeepNonNullable, MarkRequired } from 'ts-essentials';


export type Config = DeepNonNullable<MarkRequired<ESLint.ConfigData, 'rules' | 'settings' | 'parserOptions' | 'overrides'>>;
