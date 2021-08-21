const fs = require('fs');

const findUp = require('find-up');


/**
 * Returns the path to the host package's tsconfig.json file. If the file cannot
 * be found, returns false. If the file is unreadable, returns false and issues
 * a warning.
 */
export function findTsConfig() {
  const tsConfigPath = findUp.sync('tsconfig.json', { type: 'file' });

  if (!tsConfigPath) {
    return false;
  }

  try {
    fs.accessSync(tsConfigPath, fs.constants.R_OK);
  } catch (err) {
    if (err.code === 'ENOENT') {
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
