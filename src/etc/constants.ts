/**
 * Comma-delimited list of TypeScript extensions we want ESLint to include.
 */
export const TS_EXTS = 'ts,tsx,cts,mts'

/**
 * Comma-delimited list of JavaScript extensions we want ESLint to include.
 */
export const JS_EXTS = 'js,jsx,cjs,mjs'

/**
 * Comma-delimited list of all extensions we want ESLint to include.
 */
export const ALL_EXTS = `${TS_EXTS},${JS_EXTS}` as const
