import stylisticPlugin from '@stylistic/eslint-plugin'
// @ts-expect-error - This package lacks type definitions.
import importPlugin from 'eslint-plugin-import'
// @ts-expect-error - This package lacks type definitions.
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'
import unicornPlugin from 'eslint-plugin-unicorn'

import type { Rules } from 'eslint-define-config'
import type { MarkRequired } from 'ts-essentials'
import type { NamedFlatEslintConfig } from 'types'

/**
 * Provided an ESLint configuration object, adds common presets and rules.
 */
export function applyCommonRules(config: MarkRequired<NamedFlatEslintConfig, 'rules' | 'plugins'>) {
  // ----- Common: Best Practices ----------------------------------------------

  // Enforce return statements in callbacks of array methods.
  config.rules['array-callback-return'] = ['error', {
    // Allow implicitly returning `undefined` with a return statement containing
    // no expression.
    allowImplicit: true
  }]

  // Require the use of === and !==.
  config.rules['eqeqeq'] = ['error', 'always', {
    null: 'ignore'
  }]

  // Disallow the use of `alert`, `confirm`, and `prompt` in browser contexts.
  config.rules['no-alert'] = 'error'

  // This rule is superseded by @typescript-eslint/no-misused-promises.
  // config.rules['no-async-promise-executor'] = 'off'
  Reflect.deleteProperty(config.rules, 'no-async-promise-executor')

  // Disallow the use of `arguments.caller` and `arguments.callee`.
  config.rules['no-caller'] = 'error'

  // Warn on usage of `console` methods.
  config.rules['no-console'] = ['warn']

  // Disallow returning a value in constructors.
  config.rules['no-constructor-return'] = 'error'

  // Disallow `else` and `else if` blocks if the above `if` block contains a
  // return statement.
  config.rules['no-else-return'] = ['error', {
    allowElseIf: false
  }]

  // Disallow destructuring statements that do not create variables.
  config.rules['no-empty-pattern'] = 'error'

  // Ensure that comparisons to `null` only match `null`, and not also
  // `undefined`.
  config.rules['no-eq-null'] = 'error'

  // Disallow the use of eval().
  config.rules['no-eval'] = 'error'

  // Disallow unnecessary function binding.
  config.rules['no-extra-bind'] = 'error'

  // Disallow shorthand type conversions.
  config.rules['no-implicit-coercion'] = 'error'

  // Disallow declarations in the global scope.
  config.rules['no-implicit-globals'] = 'error'

  // Disallow the use of the __iterator__ property.
  config.rules['no-iterator'] = 'error'

  // Disallow unnecessary nested blocks.
  config.rules['no-lone-blocks'] = 'error'

  // Disallow function declarations that contain unsafe references inside loop
  // statements.
  config.rules['no-loop-func'] = 'error'

  // Disallow the use of the ++ and -- unary operators.
  config.rules['no-plusplus'] = ['error', {
    allowForLoopAfterthoughts: false
  }]

  // Disallow passing `10` as the second parameter to `parseInt`; since ES5 the
  // second argument is only required when the developer needs the string to be
  // parsed with a base other than 10.
  config.rules['radix'] = ['error', 'as-needed']

  // Disallow assignments that can lead to race conditions due to usage of
  // `await` or `yield`.
  config.rules['require-atomic-updates'] = 'error'

  // ----- Common: ECMAScript 6 ------------------------------------------------

  // Do not enforce a particular arrow body style.
  // config.rules['arrow-body-style'] = 'off'
  Reflect.deleteProperty(config.rules, 'arrow-body-style')

  // Disallow duplicate imports.
  config.rules['no-duplicate-imports'] = 'error'

  // Disallow unnecessary computed property keys in objects and classes.
  config.rules['no-useless-computed-key'] = ['error', {
    enforceForClassMembers: true
  }]

  // Disallow renaming import, export, and destructured assignments to the
  // same name
  config.rules['no-useless-rename'] = 'error'

  // Require `let` or `const` instead of `var`.
  config.rules['no-var'] = 'error'

  // Require the use of `const` for variables that are never reassigned.
  config.rules['prefer-const'] = 'error'

  // Require using template literals instead of string concatenation.
  config.rules['prefer-template'] = 'error'

  // Require using arrow functions for callbacks.
  // For more rules related to arrow functions, see:
  // - 'prefer-arrow/prefer-arrow-functions' (below)
  config.rules['prefer-arrow-callback'] = 'error'

  // ----- Common: Stylistic ---------------------------------------------------

  config.plugins['@stylistic'] = stylisticPlugin

  config.rules = {
    ...config.rules,
    ...stylisticPlugin.configs['recommended'].rules
  }

  // Require line breaks after opening and before closing array brackets if
  // there are line breaks inside elements or between elements.
  config.rules['@stylistic/array-bracket-newline'] = ['error', 'consistent']

  // Disallow spaces inside array brackets.
  config.rules['@stylistic/array-bracket-spacing'] = ['error', 'never']

  // Require parens around arrow function arguments only when required.
  config.rules['@stylistic/arrow-parens'] = ['error', 'as-needed', {
    // Require parens if the function body is surrounded by braces.
    // requireForBlockBody: true
  }]

  // Require a space before and after an arrow function's arrow.
  config.rules['@stylistic/arrow-spacing'] = ['error', {
    before: true,
    after: true
  }]

  // Disallows spaces inside an open block token and the next token on the
  // same line.
  config.rules['@stylistic/block-spacing'] = ['error', 'always']

  // Enforce the usage of 'one-true-brace-style' for braces.
  config.rules['@stylistic/brace-style'] = ['error', '1tbs']

  // Disallow trailing commas in object and array literals.
  config.rules['@stylistic/comma-dangle'] = ['error', 'never']

  // Disallow spaces before commas, require spaces after commas.
  config.rules['@stylistic/comma-spacing'] = ['error', {
    before: false,
    after: true
  }]

  // Enforce standard comma style, in which commas are placed at the end of
  // the current line, in array literals, object literals, and variable
  // declarations.
  config.rules['@stylistic/comma-style'] = ['error', 'last']

  // Disallow spaces inside of computed properties in object literals.
  config.rules['@stylistic/computed-property-spacing'] = ['error', 'never', {
    enforceForClassMembers: true
  }]

  // Require a newline at the end of files.
  config.rules['@stylistic/eol-last'] = ['error', 'never']

  // Disallow spaces between the function name and the opening parenthesis that
  // calls it.
  config.rules['@stylistic/func-call-spacing'] = ['error', 'never']

  // Require 2-space indentation.
  config.rules['@stylistic/indent'] = ['error', 2, {
    // Require an extra 2 spaces of indentation between switch statements and
    // case statements.
    SwitchCase: 1,
    flatTernaryExpressions: true,
    ignoredNodes: [
      'ConditionalExpression',
      // See: https://github.com/typescript-eslint/typescript-eslint/issues/455
      'TSTypeParameterInstantiation'
    ]
  }]

  // Require double quotes in JSX.
  config.rules['@stylistic/jsx-quotes'] = ['error', 'prefer-double']

  // Require a space before and after keywords like `for`, `if`, etc.
  config.rules['@stylistic/keyword-spacing'] = ['error', {
    before: true,
    after: true
  }]

  // Warn about long lines.
  config.rules['@stylistic/max-len'] = ['warn', {
    tabWidth: 2,
    // Prefer lines of code remain under 192 characters.
    code: 192,
    // Prefer comments be wrapped at 80 characters.
    comments: 80,
    // Ignore trailing comments, as these can often be ESLint directives.
    ignoreTrailingComments: true,
    // Ignore lines that contain URLs
    ignoreUrls: true,
    // Ignore lines that contain string literals.
    ignoreStrings: true
  }]

  // Require no semi-colons after members in interface declarations.
  config.rules['@stylistic/member-delimiter-style'] = ['error', {
    multiline: {
      delimiter: 'none',
      requireLast: false
    },
    singleline: {
      delimiter: 'semi',
      requireLast: false
    }
  }]

  // Disallow arrow functions where they could be confused with comparisons.
  config.rules['@stylistic/no-confusing-arrow'] = ['error', {
    // Relaxes the rule and allows parens as a valid confusion-preventing
    // syntax.
    allowParens: true
  }]

  // Disallow unnecessary parentheses, except around JSX expressions.
  config.rules['@stylistic/no-extra-parens'] = ['error', 'all', {
    ignoreJSX: 'all',
    enforceForArrowConditionals: false
  }]

  // Disallow unnecessary semicolons.
  config.rules['@stylistic/no-extra-semi'] = 'error'

  // Allow up to 1 consecutive empty line.
  config.rules['@stylistic/no-multiple-empty-lines'] = ['error', { max: 1 }]

  // Require quotes around all object literal property names if any name
  // strictly requires quotes, otherwise disallow quotes around property names.
  config.rules['@stylistic/quote-props'] = ['error', 'consistent-as-needed']

  // Enforce the consistent use of either backticks, double, or single quotes.
  config.rules['@stylistic/quotes'] = ['error', 'single']

  // Disallow spaces between rest/spread operators and their expressions.
  config.rules['@stylistic/rest-spread-spacing'] = 'error'

  // Do not use semi-colons.
  config.rules['@stylistic/semi'] = ['error', 'never']

  // Enforce consistent spacing before function parenthesis.
  config.rules['@stylistic/space-before-function-paren'] = ['error', {
    named: 'never',
    anonymous: 'never',
    asyncArrow: 'always'
  }]

  // Require a space after '//' in comments.
  config.rules['@stylistic/spaced-comment'] = ['error', 'always']

  // Enforce consistent spacing around around colons in `case` and `default`
  // clauses in `switch` statements.
  config.rules['@stylistic/switch-colon-spacing'] = ['error', {
    after: true,
    before: false
  }]

  // Disallow extraneous spaces inside of template string curly brace pairs.
  config.rules['@stylistic/template-curly-spacing'] = ['error', 'never']

  // Disallow spaces between a tag function and its template literal.
  config.rules['@stylistic/template-tag-spacing'] = ['error', 'never']

  // Enforce consistent spacing around type annotations.
  config.rules['@stylistic/type-annotation-spacing'] = ['error', {
    before: false,
    after: true,
    overrides: {
      arrow: {
        before: true,
        after: true
      }
    }
  }]

  // Do not require ternary expressions be multi-line.
  Reflect.deleteProperty(config.rules, '@stylistic/multiline-ternary')

  // Require at least 1 space inside blocks.
  config.rules['@stylistic/block-spacing'] = ['error', 'always']

  // ----- [Plugin] import -----------------------------------------------------

  config.plugins['import'] = importPlugin

  config.rules = {
    ...config.rules,
    ...(importPlugin.configs['recommended'].rules as Rules)
  }

  config.rules['import/no-unresolved'] = ['error', {
    // Resolve require() calls in addition to import statements.
    commonjs: true,
    // Check casing.
    caseSensitive: true,
    // Do not attempt to resolve imports of ESM URL schemes.
    ignore: [
      '^node:',
      '^data:',
      '^file:',
      // Virtual modules.
      '^virtual:',
      // Some packages use ~ to indicate a virtual module.
      '^~'
    ]
  }]

  // If a default import is used, ensures the module being imported has a
  // default export.
  config.rules['import/default'] = 'error'

  // Allow dynamic require() calls. These should not be used often anyway.
  // config.rules['import/no-dynamic-require'] = 'off'
  Reflect.deleteProperty(config.rules, 'import/no-dynamic-require')

  // Disallow cyclic dependencies. While these work in CJS / Webpack, they can
  // cause subtle bugs in strict ES.
  config.rules['import/no-cycle'] = 'error'

  // Disallow useless path segments in import statements.
  config.rules['import/no-useless-path-segments'] = 'error'

  // Disallow invalid exports, i.e. re-export of the same name.
  config.rules['import/export'] = 'error'

  // Allows the following:
  //
  // export const foo = 1
  // export const bar = 2
  //
  // export default {
  //   foo,
  //   bar
  // }
  //
  // Rationale: This lets consumers choose to use a single default import to
  // access all named exports without having to write 'import * as fooModule'.
  Reflect.deleteProperty(config.rules, 'import/no-named-as-default-member')
  Reflect.deleteProperty(config.rules, 'import/no-named-as-default')

  // Allow the import of external modules that are not declared in package.json.
  // This package and tsx make dependencies like React and Linaria available to
  // consumers via their peerDependencies so the consumer does not have to
  // manage their versions.
  Reflect.deleteProperty(config.rules, 'import/no-extraneous-dependencies')

  // Allow modules to have no exports (tests, CLI entry points) and allow
  // modules to export values that are not imported in the local project
  // (libraries).
  Reflect.deleteProperty(config.rules, 'import/no-unused-modules')

  // These rules are far too ambitious to exist right now.
  Reflect.deleteProperty(config.rules, 'import/no-commonjs')
  Reflect.deleteProperty(config.rules, 'import/no-amd')
  Reflect.deleteProperty(config.rules, 'import/no-nodejs-modules')
  Reflect.deleteProperty(config.rules, 'import/no-import-module-exports')

  // Disable; conflicts with 'import/order' rule.
  Reflect.deleteProperty(config.rules, 'import/first')

  // This rule enforces that all exports are declared at the bottom of the file.
  // This rule will report any export declarations that comes before any
  // non-export statements.
  Reflect.deleteProperty(config.rules, 'import/exports-last')

  // Report repeated import of the same module in multiple places.
  config.rules['import/no-duplicates'] = 'error'

  // Allow namespace imports. This is the most convenient way to use packages
  // like Ramda without renaming named imports to avoid conflicts.
  Reflect.deleteProperty(config.rules, 'import/no-whitespace')

  // Do not require the use of file extensions within the import path.
  Reflect.deleteProperty(config.rules, 'import/extensions')

  // Enforce a convention in the order of require() / import statements.
  config.rules['import/order'] = ['error', {
    'groups': [
      // Node built-in modules.
      'builtin',
      // External packages.
      'external',
      // Local files (absolute imports).
      'internal',
      [
        // Relative files in a parent folder.
        'parent',
        // Relative files in a sibling folder.
        'sibling',
        // Index of the current directory (ie: '.').
        'index'
      ],
      // Object imports. Only available in TypeScript.
      'object',
      // Type imports. Only available in TypeScript.
      'type'
    ],
    // Require 1 empty line between import groups.
    'newlines-between': 'always',
    // Require imports within groups to be sorted alphabetically in ascending
    // order by import path.
    'alphabetize': { order: 'asc' },
    'pathGroups': [{
      pattern: '^node:',
      group: 'builtin'
    }, {
      // Bump React and React DOM to the top of the 'builtin' list.
      pattern: 'react',
      group: 'builtin',
      position: 'before'
    }, {
      pattern: 'react-dom',
      group: 'builtin',
      position: 'before'
    }]
  }]

  // Require 1 empty line after the last top-level import statement.
  config.rules['import/newline-after-import'] = 'error'

  // Allow unassigned imports (ie: imports with side-effects).
  Reflect.deleteProperty(config.rules, 'import/no-unassigned-import')

  // Allow named values to be the default export of a module. This can often
  // help improve the readability of stack traces for debugging.
  Reflect.deleteProperty(config.rules, 'import/no-named-default')

  // Allow default exports.
  Reflect.deleteProperty(config.rules, 'import/no-default-export')

  // Allow named exports.
  Reflect.deleteProperty(config.rules, 'import/no-named-export')

  // Allow anonymous default exports (again).
  Reflect.deleteProperty(config.rules, 'import/no-anonymous-default-export')

  // Do not require exports to be grouped.
  Reflect.deleteProperty(config.rules, 'import/group-exports')

  // ----- [Plugin] prefer-arrow -----------------------------------------------

  config.plugins['prefer-arrow'] = preferArrowPlugin

  // Prefer the use of arrow functions in certain contexts.
  config.rules['prefer-arrow/prefer-arrow-functions'] = ['error', {
    // Exempt top-level function declarations.
    allowStandaloneDeclarations: true,
    // Class methods will NOT be converted to arrow functions.
    classPropertiesAllowed: false,
    // Functions assigned to a prototype will be converted to arrow
    // functions when doing so would not alter or break their behavior.
    disallowPrototype: true
  }]

  // ----- [Plugin] unicorn ----------------------------------------------------

  config.plugins['unicorn'] = unicornPlugin

  config.rules = {
    ...config.rules,
    ...unicornPlugin.configs['recommended'].rules
  }

  // Require consistent naming of errors in catch blocks.
  config.rules['unicorn/catch-error-name'] = ['error', {
    name: 'error',
    ignore: [
      // Additionally, allow errors to be named "cause".
      /^cause$/
    ]
  }]

  // DISABLED: This rule is disabled because it is often necessary to define
  // functions inside React.useEffect factories to ensure that variables bound
  // by their closures have the expected values.
  Reflect.deleteProperty(config.rules, 'unicorn/consistent-function-scoping')

  // Allow file names in kebab-case and PascalCase.
  config.rules['unicorn/filename-case'] = ['error', {
    cases: {
      kebabCase: true,
      pascalCase: true
    }
  }]

  // Allow functions to be passed by reference directly to an array iteratee.
  Reflect.deleteProperty(config.rules, 'unicorn/no-array-callback-reference')

  // Allow the use of Array#forEach().
  Reflect.deleteProperty(config.rules, 'unicorn/no-array-for-each')

  // [Dec 2021] This rule is throwing false positives with utility libraries
  // like Ramda, so it has been temporarily disabled.
  Reflect.deleteProperty(config.rules, 'unicorn/no-array-method-this-argument')

  // Allow consecutive calls to .push() on the same array.
  Reflect.deleteProperty(config.rules, 'unicorn/no-array-push-push')

  // Allow use of Array.prototype.reduce.
  Reflect.deleteProperty(config.rules, 'unicorn/no-array-reduce')

  // Allow member access of parenthesized await expressions.
  Reflect.deleteProperty(config.rules, 'unicorn/no-await-expression-member')

  // Allow nested ternary expressions.
  Reflect.deleteProperty(config.rules, 'unicorn/no-nested-ternary')

  // Don't prohibit usage of require(), require.resolve, and friends. These are
  // not widely used, and when they are it is usually for a good reason. Also,
  // 'import.meta.resolve' is still considered experimental.
  Reflect.deleteProperty(config.rules, 'unicorn/prefer-module')

  // Top-level await is only available in ESM/ESNext contexts.
  Reflect.deleteProperty(config.rules, 'unicorn/prefer-top-level-await')

  // Don't enforce 'more descriptive' variable names.
  Reflect.deleteProperty(config.rules, 'unicorn/prevent-abbreviations')

  // Allow
  Reflect.deleteProperty(config.rules, 'unicorn/prefer-object-from-entries')

  // Do not require that "TODO" comments have an expiration date.
  Reflect.deleteProperty(config.rules, 'unicorn/expiring-todo-comments')

  // Only require braces in a switch's "case" statements when they are required.
  config.rules['unicorn/switch-case-braces'] = ['error', 'avoid']

  // Do not enforce rules around await-ing non-Promise values.
  Reflect.deleteProperty(config.rules, 'unicorn/no-unnecessary-await')

  // Allow negated conditions.
  Reflect.deleteProperty(config.rules, 'unicorn/no-negated-condition')

  // Do not enforce import style.
  Reflect.deleteProperty(config.rules, 'unicorn/import-style')

  // Allow anonymous default exports.
  Reflect.deleteProperty(config.rules, 'unicorn/no-anonymous-default-export')

  return config
}