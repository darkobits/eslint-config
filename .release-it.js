module.exports = {
  git: {
    tagName: 'v${version}',
    requireCleanWorkingDir: true,
    commitMessage: 'chore: release v${version}',
    requireBranch: ['main', 'master', 'beta'],
  },
  github: {
    release: true,
    releaseName: 'Release v${version}',
    preRelease: "${version.includes('-')}",
  },
  npm: { publish: true },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
      header:
        '# Changelog\n\nAll notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.\n',
    }
  },
  hooks: {
    'before:init': ['pnpm run build']
  }
}
