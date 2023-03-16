import tsLegacy from './configs-legacy/ts';
import tsxLegacy from './configs-legacy/tsx';

import type { ESLint } from 'eslint';


/**
 * This export conforms to the ESLint Plugin API spec, and will allow users with
 * legacy configuration files to 'extend' a preset using a specifier like
 * '@darkobits/ts'.
 *
 * @example
 *
 * ```js
 * module.exports = {
 *   extends: '@darkobits/ts'
 * };
 * ```
 */
export const configs = { ts: tsLegacy, tsx: tsxLegacy } as ESLint.Plugin['configs'];


/**
 * This export allows users with new/flat configuration files to export a
 * preset directly or spread it into a new configuration set.
 *
 * @example
 *
 * ```js
 * export { ts as default } from '@darkobits/eslint-plugin';
 * ```
 *
 * @example
 *
 * ```js
 * import { ts } from '@darkobits/eslint-plugin';
 *
 * export default [
 *   ...ts,
 *   {
 *     files: ['*.ts'],
 *     rules: {
 *       // Set rule overrides.
 *     }
 *   }
 * ];
 * ```
 *
 * See:
 * - https://eslint.org/docs/latest/use/configure/configuration-files-new
 * - https://eslint.org/blog/2022/08/new-config-system-part-1
 * - https://eslint.org/blog/2022/08/new-config-system-part-2
 */
export { tsConfigSet as ts } from './config-sets/ts';
export { tsxConfigSet as tsx } from './config-sets/tsx';
