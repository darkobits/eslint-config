import type { Config } from 'release-it'

export default {
  git: {
    tagName: 'v${version}',
    requireCleanWorkingDir: true,
    commitMessage: 'chore: release v${version}\n[skip ci]',
    requireBranch: ['main', 'beta']
  },
  github: {
    release: true,
    releaseName: 'v${version}'
  },
  npm: { publish: true },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
      header:
        '# Changelog\n\nAll notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.\n'
    }
  },
  hooks: {
    'before:init': ['pnpm test', 'pnpm run build']
  }
} satisfies Config