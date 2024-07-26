import type { FlatESLintConfig } from 'eslint-define-config'

/**
 * Provided an ESLint configuration object, adds rule settings for the 'ts'
 * preset.
 */
export function applyTSXRuleSet(config: FlatESLintConfig) {
  config.rules = config.rules ?? {}

  /**
   * List of Node globals that are not available in the browser, and are not
   * polyfilled by Vite.
   *
   * Note: These should still be available in files outside of the source root;
   * ESLint does not lint those files because they are not included in the
   * TypeScript program.
   */
  // const DISALLOWED_NODE_GLOBALS = [
  //   '__dirname',
  //   '__filename',
  //   'Buffer',
  //   'exports',
  //   'global',
  //   'module',
  //   'process',
  //   'require'
  // ]

  // ----- Core ----------------------------------------------------------------

  // config.rules['no-restricted-globals'] = [
  //   'error',
  //   ...DISALLOWED_NODE_GLOBALS
  // ]

  // ----- [Plugin] react ------------------------------------------------------

  // Require button elements to have an explicit "type" attribute.
  config.rules['react/button-has-type'] = ['error']

  // Do not require components to set the `displayName` property.
  config.rules['react/display-name'] = 'off'

  // Require that named components be defined as arrow functions or function
  // declarations, and that unnamed components be defined as arrow functions.
  config.rules['react/function-component-definition'] = ['error', {
    namedComponents: ['arrow-function', 'function-declaration'],
    unnamedComponents: 'arrow-function'
  }]

  // Prevent usage of array indexes in `key` attributes.
  config.rules['react/no-array-index-key'] = ['error']

  // Prevent usage of dangerous JSX properties.
  config.rules['react/no-danger'] = ['error']

  // Prevent usage of deprecated methods.
  config.rules['react/no-deprecated'] = ['error']

  // Prevent invalid characters from appearing in markup.
  //
  // DISABLED: While it may prevent certain mistakes, these can usually be
  // caught by proof-reading copy. Leaving this rule enabled makes drafting copy
  // in JSX unwieldy.
  config.rules['react/no-unescaped-entities'] = 'off'

  // Prevent usage of unknown DOM properties.
  config.rules['react/no-unknown-property'] = ['error']

  // Prefer TypeScript for validating props. Use of PropTypes for runtime
  // validation is still optional.
  config.rules['react/prop-types'] = 'off'

  // Do not require importing React when using JSX; newer JSX transformers
  // handle this for us.
  config.rules['react/react-in-jsx-scope'] = 'off'

  // Prevent extra closing tags for components without children.
  config.rules['react/self-closing-comp'] = ['error']

  // Require that the value of the `style` prop be an object or a variable that
  // is an object.
  config.rules['react/style-prop-object'] = ['error']

  // Prevent passing children to void DOM elements (ie: <img />, <br />).
  config.rules['react/void-dom-elements-no-children'] = ['error']

  // Enforce explicit boolean attribute notation in JSX.
  config.rules['react/jsx-boolean-value'] = ['error']

  // Validate closing bracket location in JSX elements.
  config.rules['react/jsx-closing-bracket-location'] = ['error', 'tag-aligned']

  // Disallow unnecessary curly braces in JSX props and children.
  config.rules['react/jsx-curly-brace-presence'] = ['error', 'never']

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
  config.rules['react/jsx-newline'] = 'off'

  // Disallow spaces inside of curly braces in JSX attributes and expressions.
  config.rules['react/jsx-curly-spacing'] = ['error', {
    when: 'never',
    objectLiterals: 'never'
  }]

  // Disallow spaces around equal signs in JSX attributes.
  config.rules['react/jsx-equals-spacing'] = ['error', 'never']

  // Restrict which file extensions may contain JSX.
  config.rules['react/jsx-filename-extension'] = ['error', {
    extensions: ['.tsx', '.jsx']
  }]

  // Require that the first JSX property be on a new line if the JSX tag takes
  // up multiple lines and there are multiple properties.
  config.rules['react/jsx-first-prop-new-line'] = ['error', 'multiline-multiprop']

  // Enforce shorthand for React fragments (ie: <>...</>).
  config.rules['react/jsx-fragments'] = ['error', 'syntax']

  // Require indentation of 2 spaces in JSX, including attributes and logical
  // expressions.
  config.rules['react/jsx-indent'] = ['error', 2, {
    checkAttributes: true,
    indentLogicalExpressions: true
  }]

  // Enforce an indentation level of 2 spaces for multi-line JSX props relative
  // to their tags.
  config.rules['react/jsx-indent-props'] = ['error', 2]

  // Report missing `key` props in iterators/collection literals.
  config.rules['react/jsx-key'] = ['error', {
    checkFragmentShorthand: true
  }]

  // Warn on excessive JSX indentation depth.
  config.rules['react/jsx-max-depth'] = ['warn', {
    max: 16
  }]

  // Limit the maximum number of props on a single line in JSX.
  config.rules['react/jsx-max-props-per-line'] = ['error', {
    maximum: 4
  }]

  // Control what kinds of functions can be used in JSX props.
  config.rules['react/jsx-no-bind'] = ['error', {
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
  }]

  // Prevent comments from accidentally being inserted as text nodes.
  config.rules['react/jsx-no-comment-textnodes'] = ['error']

  // Disallow duplicate properties in JSX.
  config.rules['react/jsx-no-duplicate-props'] = ['error']

  // Disallow the usage of `javascript:` URLs.
  config.rules['react/jsx-no-script-url'] = ['error', [{
  // Include the popular Link component from React Router.
    name: 'Link',
    props: ['to']
  }]]

  // Disallow a `target="_blank"` attribute without an accompanying
  // `rel="noopener noreferrer"` attribute.
  config.rules['react/jsx-no-target-blank'] = ['error']

  // Disallow undeclared variables in JSX.
  config.rules['react/jsx-no-undef'] = ['error', {
    allowGlobals: false
  }]

  // Disallow unnecessary JSX fragments.
  config.rules['react/jsx-no-useless-fragment'] = ['error']

  // Enforce PascalCase for user-defined JSX components.
  config.rules['react/jsx-pascal-case'] = ['error']

  // Disallow multiple spaces between inline JSX props.
  config.rules['react/jsx-props-no-multi-spaces'] = ['error']

  // Disallow JSX props spreading. This enhances readability of code by being
  // more explicit about what props are received by the component.
  config.rules['react/jsx-props-no-spreading'] = ['error', {
  // Allow props spreading when the properties being spread are explicitly
  // enumerated.
    explicitSpread: 'ignore'
  }]

  // Validate whitespace in and around the JSX opening and closing brackets.
  config.rules['react/jsx-tag-spacing'] = ['error', {
  // Disallow spaces after `<` opening tags.
    afterOpening: 'never',
    // Disallow spaces before `>` closing tags.
    beforeClosing: 'never',
    // Require a space before `/>` self-closing tags.
    beforeSelfClosing: 'always',
    // Disallow spaces between `</` or `/>` characters.
    closingSlash: 'never'
  }]

  // Prevent variables used in JSX from being incorrectly marked as unused.
  config.rules['react/jsx-uses-vars'] = ['error']

  // Require parens around multi-line JSX expressions in certain contexts.
  config.rules['react/jsx-wrap-multilines'] = ['error', {
    declaration: 'parens',
    assignment: 'parens',
    return: 'parens',
    arrow: 'parens',
    condition: 'ignore',
    logical: 'ignore',
    prop: 'ignore'
  }]

  // ----- [Plugin] react-hooks ------------------------------------------------

  // Warn when hooks do not declare dependencies they use.
  //
  // TEMPORARILY DISABLED: This rule has a very aggressive regular expression to
  // test whether a function is a React hook[1] that winds up matching
  // useAsyncEffect. The rule then throws a false positive because the function
  // passed to useAsyncEffect is async. Consider re-enabling it if a future
  // version is more configurable.
  //
  // config.rules['react-hooks/exhaustive-deps'] = ['warn', {
  //   // Prevents false-positives when using `use-async-effect`.
  //   additionalHooks: 'useAsyncEffect'
  // }]
  config.rules['react-hooks/exhaustive-deps'] = 'off'

  // ----- [Plugin] jsx-a11y ---------------------------------------------------

  // This rule was deprecated in version 6.1.0, but still appears to be in the
  // plugin's 'recommended' rule set.
  config.rules['jsx-a11y/label-has-for'] = 'off'

  // Do not require media elements to have captions.
  config.rules['jsx-a11y/media-has-caption'] = 'off'

  // ----- [Plugin] unicorn ----------------------------------------------------

  // Disable this rule in React projects because React makes heavy use of the
  // `null` value.
  config.rules['unicorn/no-null'] = 'off'

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
  config.rules['unicorn/no-useless-undefined'] = 'off'
}

// export function generateJavaScriptRuleSet(
//  config: FlatESLintConfig
// ): RuleSet {}

// export function generateTestRuleSet(): RuleSet {}