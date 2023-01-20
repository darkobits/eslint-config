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

> **⚠️ Note:** This package requires NPM 7, as it leverages its `peerDependencies` strategy.

```
npm install --save-dev @darkobits/eslint-preset
```

# Use

This plugin contains two presets: [`ts`](./src/configs/preset-ts.js) for TypeScript libraries and
[`tsx`](./src/configs/preset-tsx.js) for TypeScript-based React projects.

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

* [`@darkobits/ts`](https://github.com/darkobits/ts) – Build toolchain which incorporates the `ts` preset.
* [`@darkobits/tsx`](https://github.com/darkobits/tsx) – React build toolchain which incorporates the `tsx` preset.
* [`@darkobits/ts-template`](https://github.com/darkobits/ts-template) – Template repository that uses `@darkobits/ts`.

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/189774318-67cf3578-f4b4-4dcc-ab5a-c8210fbb6838.png" style="max-width: 100%;">
</a>
