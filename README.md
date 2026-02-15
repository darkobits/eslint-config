<picture>
	<source
    media="(prefers-color-scheme: dark)"
    srcset="https://github.com/user-attachments/assets/bb885092-d9f2-4cf7-a58d-ba4b3426e05f"
    width="100%"
  >
	<img
    src="https://github.com/user-attachments/assets/65940eda-121f-43cb-af21-2693fd90397d"
    width="100%"
  >
</picture>
<p align="center">
  <a
    href="https://www.npmjs.com/package/@darkobits/eslint-config"
  ><img
    src="https://img.shields.io/npm/v/@darkobits/eslint-config.svg?style=flat-square"
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

## Requirements

* ESLint `>=9.0.0`.
* Your project must be using ESLint's new [flat configuration format](https://eslint.org/blog/2022/08/new-config-system-part-1/).

## Install

```
npm install --save-dev @darkobits/eslint-config
```

## Use

This package provides two presets: [`ts`](./src/configs/ts.ts) for TypeScript
projects and [`tsx`](./src/configs/tsx.ts) for TypeScript projects that use
JSX and React.

If you do not need to modify the preset in any way, a minimal config file:

> `eslint.config.ts`

```ts
export { configs } from '@darkobits/eslint-config'
export default configs.ts
// Or
export default.configs.tsx
```

If you need to extend a preset, the `defineConfig` helper should be used:


import the desired preset and re-export it as the default
export:

> `eslint.config.ts`

```ts
import { configs } from '@darkobits/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig({
  // Any global ignores should be defined early in a separate config object.
  ignores: []
}, {
  extends: [configs.ts],
  rules: {
    // ...
  }
})
```

See:

- [ESLint Documentation](https://eslint.org/docs/latest/extend/shareable-configs#overriding-settings-from-shareable-configs).

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
