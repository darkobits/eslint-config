import path from 'path';

// import log from '@darkobits/nr/dist/lib/log';
import { nr } from '@darkobits/ts';

// Use the default package scripts from 'ts'. "npm run help" for details.
export default nr(({ command, task, script }) => {
  const FIXTURES_DIR = 'fixtures';
  const LEGACY_CONFIG = '.legacy-eslintrc.js';
  const NEW_CONFIG = 'eslint.config.mjs';

  // ----- Smoke Tests ---------------------------------------------------------

  const fixturesTsLegacy = command('eslint', ['eslint', ['src'], {
    ext: 'ts,tsx,js,jsx,cjs,mjs',
    format: 'codeframe',
    config: LEGACY_CONFIG
  }], {
    prefix: () => 'ts/legacy',
    execaOptions: {
      cwd: path.resolve(FIXTURES_DIR, 'ts')
    }
  });

  const fixturesTsFlat = command('eslint', ['eslint', ['src'], {
    format: 'codeframe',
    config: NEW_CONFIG
  }], {
    prefix: () => 'ts/flat',
    execaOptions: {
      cwd: path.resolve(FIXTURES_DIR, 'ts'),
      env: {
        ESLINT_USE_FLAT_CONFIG: 'true'
      }
    }
  });


  const fixturesTsxLegacy = command('eslint', ['eslint', ['src'], {
    ext: 'ts,tsx,js,jsx,cjs,mjs',
    format: 'codeframe',
    config: LEGACY_CONFIG
  }], {
    prefix: () => 'tsx/legacy',
    execaOptions: {
      cwd: path.resolve(FIXTURES_DIR, 'tsx')
    }
  });

  const fixturesTsxFlat = command('eslint', ['eslint', ['src'], {
    format: 'codeframe',
    config: NEW_CONFIG
  }], {
    prefix: () => 'tsx/flat',
    execaOptions: {
      cwd: path.resolve(FIXTURES_DIR, 'tsx'),
      env: {
        ESLINT_USE_FLAT_CONFIG: 'true'
      }
    }
  });

  script('test.smoke.legacy', {
    group: 'Test',
    description: 'Run ESLint in the fixtures directory using a legacy configuration file.',
    timing: true,
    run: [
      task('log', () => {
        // log.info(log.prefix('test.smoke.legacy'), 'Starting test...');
      }),
      [fixturesTsLegacy, fixturesTsxLegacy]
    ]
  });

  script('test.smoke.flat', {
    group: 'Test',
    description: 'Run ESLint in the fixtures directory using a flat configuration file.',
    timing: true,
    run: [
      task('log', () => {
        // log.info(log.prefix('test.smoke.flat'), 'Starting test...');
      }),
      [fixturesTsFlat, fixturesTsxFlat]
    ]
  });

  script('test.smoke.all', {
    group: 'Test',
    description: 'Run ESLint in the fixtures directory using a both configuration files.',
    timing: true,
    run: [
      task('log', () => {
        // log.info(log.prefix('test.smoke.flat'), 'Starting test...');
      }),
      [
        fixturesTsLegacy,
        fixturesTsFlat,
        fixturesTsxLegacy,
        fixturesTsxFlat
      ]
    ]
  });


  // ----- Watch Source & Lint Fixtures ----------------------------------------

  script('test.watch.smoke', {
    group: 'Test',
    description: 'When changes are detected in the output directory, run smoke tests.',
    run: [
      command('nodemon', ['nodemon', {
        watch: ['dist', FIXTURES_DIR],
        ext: 'ts,tsx,js,jsx,cjs,mjs,json',
        delay: '100ms',
        exec: [
          'clear && ',
          // Make sure we run both smoke tests in parallel.
          'nr test.smoke.legacy; ',
          'nr test.smoke.flat'
        ].join('')
      }])
    ]
  });
});
