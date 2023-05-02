<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/129463138-5a449242-fdbf-4a1b-8b55-c21706ca0946.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/eslint-plugin"><img src="https://img.shields.io/npm/v/@darkobits/eslint-plugin.svg?style=flat-square"></a>
  <a href="https://github.com/darkobits/eslint-plugin/actions?query=workflow%3Aci"><img src="https://img.shields.io/github/actions/workflow/status/darkobits/eslint-plugin/ci.yml?style=flat-square"></a>
  <a href="https://depfu.com/repos/github/darkobits/eslint-plugin"><img src="https://img.shields.io/depfu/darkobits/eslint-plugin?style=flat-square"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"></a>
</p>

ESLint plugin for TypeScript / TypeScript React projects.

# Install

```
npm install --save-dev @darkobits/eslint-preset
```

> **⚠️ Note:** This package declares ESLint and the various plugins for which it sets rules as
> **peer dependencies**. If you're using **NPM 7** or later, you don't need to do anything. If you're
> using Yarn, PNPm, or an alternative package manager that doesn't automatically install peer
> dependencies, you'll need to install this package's `peerDependencies` yourself.

# Use

This plugin contains two presets: [`ts`](./src/config-sets/ts.ts) for TypeScript projects and
[`tsx`](./src/config-sets/tsx.ts) for TypeScript-based React projects.

## Modern ESLint Configuration

ESLint's new configuration format consists of arrays of configuration objects. Presets are therefore
arrays of various configurations that are merged by ESLint.

If you do not need to define any custom rules, ignores, or overrides, you can export a configuration set
directly:

> `eslint.config.js`

```ts
export { ts as default } from '@darkobits/eslint-plugin';
```

or

```ts
export { tsx as default } from '@darkobits/eslint-plugin';
```

If you need to define configuration specific to your project:

```ts
import { ts } from '@darkobits/eslint-plugin';

export default [{
  ignores: ['unicorns/**'],
  rules: {
    'max-len': 'off'
  }
}, ...ts];
```

### IDE Integration

To use ESLint's new flat configuration format with VS Code, add the following to `.vscode/settings.json`
in your project:

```json
  "eslint.experimental.useFlatConfig": true,
  "eslint.options.overrideConfigFile": "eslint.config.js",
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

## See Also

* [`@darkobits/ts`](https://github.com/darkobits/ts) – Vite-based toolchain for Node projects.
* [`@darkobits/tsx`](https://github.com/darkobits/tsx) – Vite-based toolchain for React projects.
* [`@darkobits/ts-template`](https://github.com/darkobits/ts-template) – Starter template for `@darkobits/ts`.

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/189774318-67cf3578-f4b4-4dcc-ab5a-c8210fbb6838.png" style="max-width: 100%;">
</a>
