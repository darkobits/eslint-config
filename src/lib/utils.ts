import fs from 'fs';

import { parse } from 'comment-json';
import findUp from 'find-up';


export interface TsConfigResult {
  tsConfigPath: string;
  srcDir: string | undefined;
  outDir: string | undefined;
}


/**
 * Returns the path to the first tsconfig.json file found at or above
 * `process.cwd()`. If the file cannot be found, returns false. If the file is
 * unreadable, returns false and issues a warning.
 *
 * TODO: Use tsconfck for this.
 */
export function parseTsConfig(): TsConfigResult | false {
  const tsConfigPath = findUp.sync('tsconfig.json', { type: 'file' });

  if (!tsConfigPath) {
    return false;
  }

  let srcDir;
  let outDir;

  try {
    fs.accessSync(tsConfigPath, fs.constants.R_OK);

    // @ts-expect-error - We can use null here.
    // eslint-disable-next-line unicorn/no-null
    const parsedTsConfig: any = parse(fs.readFileSync(tsConfigPath, 'utf8'), null, true);

    if (typeof parsedTsConfig === 'object') {
      srcDir = parsedTsConfig?.compilerOptions?.baseUrl;
      srcDir = parsedTsConfig?.compilerOptions?.outDir;
    }
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

  return {
    tsConfigPath,
    srcDir,
    outDir
  };
}
