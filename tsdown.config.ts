import { defineConfig } from 'tsdown/config'

export default defineConfig({
  /**
   * Any TypeScript file (except for tests) in the source directory should be
   * considered an entry.
   *
   * @see https://tsdown.dev/reference/config-options#entry
   */
  entry: ['src/**/*.ts', '!src/**/*.test.ts'],
  /**
   * Do not bundle output into a single file. Instead, use the same directory
   * structure as the source files.
   *
   * @see https://tsdown.dev/reference/config-options#unbundle
  */
  unbundle: true,
  /**
  * Check for unused dependencies with `unplugin-unused` (installed separately).
  *
  * @see https://tsdown.dev/reference/config-options#unused
  */
  unused: true,
  /**
  * After building, run `publint` (installed separately).
  *
  * @see https://tsdown.dev/reference/config-options#publint
  */
  publint: true,
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
  exports: true
})