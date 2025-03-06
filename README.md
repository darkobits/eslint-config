<picture>
	<source
    media="(prefers-color-scheme: dark)"
    srcset="https://github.com/darkobits/eslint-plugin/assets/441546/4cf5ec59-b2c0-4f27-aedf-fd162f4e2778"
    width="100%"
  >
	<img
    src="https://github.com/darkobits/eslint-plugin/assets/441546/fd1bf053-4b3a-4789-a891-876695793e2a"
    width="100%"
  >
</picture>
<p align="center">
  <a
    href="https://www.npmjs.com/package/@darkobits/eslint-plugin"
  ><img
    src="https://img.shields.io/npm/v/@darkobits/eslint-plugin.svg?style=flat-square"
  ></a>
  <a
    href="https://github.com/darkobits/eslint-plugin/actions?query=workflow%3Aci"
  ><img
    src="https://img.shields.io/github/actions/workflow/status/darkobits/eslint-plugin/ci.yml?style=flat-square"
  ></a>
  <a
    href="https://depfu.com/repos/github/darkobits/eslint-plugin"
  ><img
    src="https://img.shields.io/depfu/darkobits/eslint-plugin?style=flat-square"
  ></a>
  <a
    href="https://conventionalcommits.org"
  ><img
    src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"
  ></a>
    <a
    href="https://firstdonoharm.dev"
  ><img
    src="https://img.shields.io/static/v1?label=license&message=hippocratic&style=flat-square&color=753065"
  ></a>
</p>

ESLint configuration presets for TypeScript and TypeScript + React projects.

# Requirements

* Your project must be using ESLint's new [flat configuration format](https://eslint.org/blog/2022/08/new-config-system-part-1/).


# Install

```
npm install --save-dev @darkobits/eslint-plugin
```

# Use

This plugin provides two presets: [`presetTs`](./src/configuration-presets/preset-ts.ts) for TypeScript
projects and [`presetTsx`](./src/configuration-presets/preset-tsx.ts) for TypeScript projects that use
JSX and React.

In your project's `eslint.config.js` file, import the desired preset and re-export it as the default
export:

```ts
export { presetTs as default } from '@darkobits/eslint-plugin'
```

or

```ts
export { presetTsx as default } from '@darkobits/eslint-plugin'
```

If you need to define any additional configuration specific to your project, use the spread operator to
add the preset to a new array:

```ts
import { airBnb } from '@airbnb/eslint-config-airbnb-is-still-a-thing-right'
import { presetTs } from '@darkobits/eslint-plugin'

export default [
  // Exempt this directory from linting. Do this early to prevent ESLint from
  // processing these files any further.
  { ignores: ['unicorns/**'] },
  // Then, apply one or more configuration presets.
  ...airBnb,
  ...presetTs,
  // If we then wanted to disable a rule used by any of the above:
  { rules: { 'unicorn/catch-error-name': 'off' } }
]
```

> [!TIP]
> Order matters here! Configuration for files that you want to have globally ignored occur first,
> followed by one or more configuration presets, then overrides.

For more on this topic, refer to the ESLint [documentation](https://eslint.org/docs/latest/extend/shareable-configs#overriding-settings-from-shareable-configs).

### Type Safety

For added type safety, use the `defineFlatConfig` helper:

```ts
import { defineFlatConfig, presetTs } from '@darkobits/eslint-plugin'

export default defineFlatConfig([
  { ignores: ['unicorns/**'] },
  ...presetTs,
  { rules: { 'max-len': 'off' } }
])
```

### Configuration Inspector

You can use ESLint's new [Configuration Inspector](https://github.com/eslint/config-inspector#readme) to
see an exhaustive list of all rules (and their settings) applied in your project by running the
following:

```sh
npx eslint --inspect-config
```

Example:

![](https://private-user-images.githubusercontent.com/11247099/320013940-d74a057a-f674-4a8d-977f-d9b6a3cde949.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDEyNjAwMDYsIm5iZiI6MTc0MTI1OTcwNiwicGF0aCI6Ii8xMTI0NzA5OS8zMjAwMTM5NDAtZDc0YTA1N2EtZjY3NC00YThkLTk3N2YtZDliNmEzY2RlOTQ5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzA2VDExMTUwNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTAxZTc1YjY1ZjA5NDRhYTViMTY4MmQ5YmQxMzU4MWU4ODI0MDQyNzYyMGQ5MDEwMGU4YjA0ODFkZGM5ZjdkYTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Cs6PUEqZPHKWV26iMlOgz3wrKS6937e6zOeEWHLALGU)

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/189774318-67cf3578-f4b4-4dcc-ab5a-c8210fbb6838.png" style="max-width: 100%;">
</a>
