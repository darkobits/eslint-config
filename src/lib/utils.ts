import fs from 'fs';

import findUp from 'find-up';


/**
 * Returns the path to the first tsconfig.json file found at or above
 * `process.cwd()`. If the file cannot be found, returns false. If the file is
 * unreadable, returns false and issues a warning.
 *
 * TODO: Use tsconfck for this.
 */
export function findTsConfig() {
  const tsConfigPath = findUp.sync('tsconfig.json', { type: 'file' });

  if (!tsConfigPath) {
    return false;
  }

  try {
    fs.accessSync(tsConfigPath, fs.constants.R_OK);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // eslint-disable-next-line no-console
      console.warn([
        '[@darkobits/eslint-plugin] Attempted to automatically set ESLint\'s',
        `parserOptions.project to "${tsConfigPath}", but the file could not`,
        'be read. You will need to create a tsconfig.json or set',
        'parserOptions.project yourself.'
      ].join(' '));
    }

    return false;
  }

  return tsConfigPath;
}
