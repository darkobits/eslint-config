import { defineConfig } from 'tsdown/config'

export default defineConfig({
  /**
   * Do not bundle third party dependencies.
   *
   * See: https://tsdown.dev/options/dependencies#external
   */
  external: [/node_modules/],
  /**
   * Do not bundle output into a single file. Instead, use the same directory
   * structure as the source files.
   *
   * @see https://tsdown.dev/reference/config-options#unbundle
  */
  // unbundle: true,
  /**
  * After building, run `publint` (installed separately).
  *
  * @see https://tsdown.dev/reference/config-options#publint
  */
  publint: true,
  /**
   * Emit declaration files.
   *
   * See: https://tsdown.dev/options/dts
   */
  dts: true,
  /**
   * This will automatically keep the `main`, `module`, `types`, and `exports`
   * fields in package.json in sync with the correct files in the output
   * directory.
   *
   * Note: This sets `types` in package.json, which in turn causes tsdown to
   * emit declaration files. If this should be set to `false`, consider setting
   * `dts` to `true`.
   *
   * @see https://tsdown.dev/reference/config-options#exports
   */
  exports: true,
  /**
   * Always use the .js and .d.ts extensions.
   *
   * @see https://tsdown.dev/reference/api/Interface.InlineConfig#outextensions
   */
  outExtensions: () => ({ js: '.js', dts: '.d.ts' })
})