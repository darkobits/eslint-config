// @ts-expect-error - This package lacks type definitions.
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import * as tseslint from 'typescript-eslint'

import { ts } from './ts'

export const tsx: tseslint.ConfigArray = tseslint.config(
  // ----- TypeScript Files ----------------------------------------------------
  {
    files: ['**/*.ts'],
    extends: [ts],
    plugins: {
       
      'jsx-a11y': jsxA11yPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin
    },
     
    rules: {
       
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // ----- Plugin: React -------------------------------------------------------

      // Require button elements to have an explicit "type" attribute.
      'react/button-has-type': ['error'],

      // Do not require components to set the `displayName` property.
      'react/display-name': 'off',

      // Require that named components be defined as arrow functions or function
      // declarations, and that unnamed components be defined as arrow functions.
      'react/function-component-definition': ['error', {
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: 'arrow-function'
      }],

      // Prevent usage of array indexes in `key` attributes.
      'react/no-array-index-key': ['error'],

      // Prevent usage of dangerous JSX properties.
      'react/no-danger': ['error'],

      // Prevent usage of deprecated methods.
      'react/no-deprecated': ['error'],

      // Prevent invalid characters from appearing in markup.
      //
      // DISABLED: While it may prevent certain mistakes, these can usually be
      // caught by proof-reading copy. Leaving this rule enabled makes drafting copy
      // in JSX unwieldy.
      'react/no-special-entities': 'off',

      // Prevent usage of unknown DOM properties.
      'react/no-unknown-property': ['error'],

      // PropTypes is deprecated.
      'react/prop-types': 'off',

      // Do not require importing React when using JSX; newer JSX transformers
      // handle this for us.
      'react/react-in-jsx-scope': 'off',

      // Prevent extra closing tags for components without children.
      'react/self-closing-comp': ['error'],

      // Require that the value of the `style` prop be an object or a variable that
      // is an object.
      'react/style-prop-object': ['error'],

      // Prevent passing children to void DOM elements (ie: <img />, <br />).
      'react/void-dom-elements-no-children': ['error'],

      // Enforce explicit boolean attribute notation in JSX.
      'react/jsx-boolean-value': ['error'],

      // Validate closing bracket location in JSX elements.
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],

      // Disallow unnecessary curly braces in JSX props and children.
      'react/jsx-curly-brace-presence': ['error', 'never'],

      // Enforce consistent line breaks in curly braces in JSX attributes and
      // expressions.
      //
      // DISABLED: This rule does not have a configuration option that allows for
      // the following:
      //
      // {someValue
      //   ? <div>Value is true!</div>
      //   : <div>Value is false.</div>
      // }
      'react/jsx-newline': 'off',

      // Disallow spaces inside of curly braces in JSX attributes and expressions.
      'react/jsx-curly-spacing': ['error', {
        when: 'never',
        objectLiterals: 'never'
      }],

      // Disallow spaces around equal signs in JSX attributes.
      'react/jsx-equals-spacing': ['error', 'never'],

      // Restrict which file extensions may contain JSX.
      'react/jsx-filename-extension': ['error', {
        extensions: ['.tsx', '.jsx']
      }],

      // Require that the first JSX property be on a new line if the JSX tag takes
      // up multiple lines and there are multiple properties.
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

      // Enforce shorthand for React fragments (ie: <>...</>).
      'react/jsx-fragments': ['error', 'syntax'],

      // Require indentation of 2 spaces in JSX, including attributes and logical
      // expressions.
      'react/jsx-indent': ['error', 2, {
        checkAttributes: true,
        indentLogicalExpressions: true
      }],

      // Enforce an indentation level of 2 spaces for multi-line JSX props relative
      // to their tags.
      'react/jsx-indent-props': ['error', 2],

      // Report missing `key` props in iterators/collection literals.
      'react/jsx-key': ['error', {
        checkFragmentShorthand: true
      }],

      // Warn on excessive JSX indentation depth.
      'react/jsx-max-depth': ['warn', {
        max: 16
      }],

      // Limit the maximum number of props on a single line in JSX.
      'react/jsx-max-props-per-line': ['error', {
        maximum: 4
      }],

      // Control what kinds of functions can be used in JSX props.
      'react/jsx-no-bind': ['error', {
      // Allow anonymous arrow functions.
        allowArrowFunctions: true,
        // Disallow regular functions.
        allowFunctions: false,
        // Disallow .bind().
        allowBind: false,
        // Do not exempt vanilla DOM element from this rule.
        ignoreDOMComponents: false,
        // Do not exempt refs from this rule.
        ignoreRefs: false
      }],

      // Prevent comments from accidentally being inserted as text nodes.
      'react/jsx-no-comment-textnodes': ['error'],

      // Disallow duplicate properties in JSX.
      'react/jsx-no-duplicate-props': ['error'],

      // Disallow the usage of `javascript:` URLs.
      'react/jsx-no-script-url': ['error', [{
      // Include the popular Link component from React Router.
        name: 'Link',
        props: ['to']
      }]],

      // Disallow a `target="_blank"` attribute without an accompanying
      // `rel="noopener noreferrer"` attribute.
      'react/jsx-no-target-blank': ['error'],

      // Disallow undeclared variables in JSX.
      'react/jsx-no-undef': ['error', {
        allowGlobals: false
      }],

      // Disallow unnecessary JSX fragments.
      'react/jsx-no-useless-fragment': ['error'],

      // Enforce PascalCase for user-defined JSX components.
      'react/jsx-pascal-case': ['error'],

      // Disallow multiple spaces between inline JSX props.
      'react/jsx-props-no-multi-spaces': ['error'],

      // Disallow JSX props spreading. This enhances readability of code by being
      // more explicit about what props are received by the component.
      'react/jsx-props-no-spreading': ['error', {
      // Allow props spreading when the properties being spread are explicitly
      // enumerated.
        explicitSpread: 'ignore'
      }],

      // Validate whitespace in and around the JSX opening and closing brackets.
      'react/jsx-tag-spacing': ['error', {
      // Disallow spaces after `<` opening tags.
        afterOpening: 'never',
        // Disallow spaces before `>` closing tags.
        beforeClosing: 'never',
        // Require a space before `/>` self-closing tags.
        beforeSelfClosing: 'always',
        // Disallow spaces between `</` or `/>` characters.
        closingSlash: 'never'
      }],

      // Prevent variables used in JSX from being incorrectly marked as unused.
      'react/jsx-uses-vars': ['error'],

      // Require parens around multi-line JSX expressions in certain contexts.
      'react/jsx-wrap-multilines': ['error', {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore'
      }],

      // ----- Plugin: React Hooks -------------------------------------------------

      // Warn when hooks do not declare dependencies they use.
      //
      // TEMPORARILY DISABLED: This rule has a very aggressive regular expression to
      // test whether a function is a React hook[1] that winds up matching
      // useAsyncEffect. The rule then throws a false positive because the function
      // passed to useAsyncEffect is async. Consider re-enabling it if a future
      // version is more configurable.
      //
      // 'react-hooks/exhaustive-deps': ['warn', {
      //   // Prevents false-positives when using `use-async-effect`.
      //   additionalHooks: 'useAsyncEffect'
      // }]
      // 'react-hooks/exhaustive-deps': 'off'
      'react-hooks/exhaustive-deps': 'off',

      // ----- [Plugin] jsx-a11y ---------------------------------------------------

      // config.plugins['jsx-a11y': jsxA11yPlugin

      // rules = {
      //   ...rules,
      //   ...jsxA11yPlugin.configs.recommended.rules
      // }

      // This rule was deprecated in version 6.1.0, but still appears to be in the
      // plugin's 'recommended' rule set.
      // 'jsx-a11y/label-has-for': 'off'
      'jsx-a11y/label-has-for': 'off',

      // Do not require media elements to have captions.
      // 'jsx-a11y/media-has-caption': 'off'
      'jsx-a11y/media-has-caption': 'off',

      // ----- [Plugin] unicorn ----------------------------------------------------

      // NOTE: This plugin was installed and its rules configured by the 'ts'
      // preset, so deleting them from our own rules will not suffice, we need to
      // explicitly set them to 'off'.

      // Disable this rule in React projects because React makes heavy use of the
      // `null` value.
      'unicorn/no-null': 'off',

      // [Dec 2021]
      //
      // The type of `foo` will be `Foo | undefined` because we initialized the
      // variable by passing an implicit `undefined` to `useState`.
      // const [foo, setFoo] = React.useState<Foo>()
      //
      // However, if we try to reset the variable to `undefined` later by calling
      // `setFoo` with zero arguments, TypeScript thinks we are actually trying to
      // set it to `void` rather than `undefined`, and throws a type error:
      // setFoo() //=> "Expected setFoo to be called with 1 argument..."
      //
      // - If we pass an explicit `undefined` to `setFoo` to satisfy the argument
      //   requirement, this rule will throw an error.
      // - If we type the state variable to allow `void` as a type, it can cause
      //   a lot of trouble downstream as anything that consumes that state variable
      //   must now discriminate between 2 bottom values.
      //
      // Thus, until the issue is resolved upstream, this rule has been disabled.
      'unicorn/no-useless-undefined': 'off'
    }
  },
  // ----- JavaScript Files ----------------------------------------------------
  {
    files: ['**/*.js'],
    extends: [
      tseslint.configs.disableTypeChecked
    ],
    rules: {}
  }
)