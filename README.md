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

ESLint plugin for TypeScript / TypeScript React projects.

# Install

```
npm install --save-dev @darkobits/eslint-plugin
```

> **⚠️ Note:** This package declares ESLint and the various plugins for which it sets rules as
> **peer dependencies**. If you're using **NPM 7** or later, you don't need to do anything. If you're
> using Yarn, PNPm, or an alternative package manager that doesn't automatically install peer
> dependencies, you'll need to install this package's peer dependencies yourself.

# Use

This plugin contains two presets: [`ts`](./src/config-sets/ts.ts) for TypeScript projects and
[`tsx`](./src/config-sets/tsx.ts) for TypeScript-based React projects.

## Modern (Flat) ESLint Configuration

ESLint's [new flat configuration format](https://eslint.org/blog/2022/08/new-config-system-part-1/)
is an array of configuration objects. Configuration presets are therefore arrays of one or more
configuration objects that are merged by ESLint.

As such, if you do not need to define any custom rules, ignores, or overrides, you can export a
configuration preset directly:

> `eslint.config.js`

```ts
export { ts as default } from '@darkobits/eslint-plugin';
```

or

```ts
export { tsx as default } from '@darkobits/eslint-plugin';
```

If you need to define configuration specific to your project, spread the preset into a new array. Order
matters; configuration for files that you want to have globally ignored should precede all other
configuration while custom overrides should occur last.

```ts
import { ts } from '@darkobits/eslint-plugin';

export default [
  {
    ignores: ['unicorns/**']
  },
  ...ts,
  {
    rules: {
      'max-len': 'off'
    }
  }
];
```

### IDE Integration

To use ESLint's new flat configuration format with VS Code, add the following to the project's settings:

> `.vscode/settings.json`

```json
{
  "eslint.experimental.useFlatConfig": true,
  "eslint.options.overrideConfigFile": "eslint.config.js"
}
```

## Legacy ESLint Configuration

To extend a preset:

> `.eslintrc.js`

```js
module.exports = {
  extends: 'plugin:@darkobits/ts'
};
```

or

```js
module.exports = {
  extends: 'plugin:@darkobits/tsx'
};
```

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/189774318-67cf3578-f4b4-4dcc-ab5a-c8210fbb6838.png" style="max-width: 100%;">
</a>
