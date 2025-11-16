import path from 'node:path'

import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import packageJsonPlugin from 'eslint-plugin-package-json'
// @ts-expect-error - This package lacks type definitions.
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'
import unicornPlugin from 'eslint-plugin-unicorn'
import { findUpSync } from 'find-up'
import { getTsconfig } from 'get-tsconfig'
import * as tseslint from 'typescript-eslint'

const tsconfig = getTsconfig()
const tsconfigPath = tsconfig?.path
const tsconfigDir = tsconfigPath ? path.dirname(tsconfigPath) : undefined
const gitignorePath = findUpSync('.gitignore', { cwd: tsconfigDir ?? process.cwd() })

export const ts = defineConfig(
  gitignorePath ? includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns.') : {},
  packageJsonPlugin.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx,cjs,mjs,cts,mts}'],
    ignores: ['**/*.d.ts'],
    extends: [
      eslint.configs.recommended,
      stylisticPlugin.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: tsconfigDir
      }
    },
    plugins: {
      'import': importPlugin,
      'prefer-arrow': preferArrowPlugin,
      'unicorn': unicornPlugin
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: tsconfigPath
        }
      },
      'import/ignore': [
        'node_modules'
      ],
      'packageJson': {
        enforceForPrivate: false
      }
    },
    rules: {
      // ----- Best Practices --------------------------------------------------

      // Enforce return statements in callbacks of array methods.
      'array-callback-return': ['error', {
        // Allow implicitly returning `undefined` with a return statement
        // containing no expression.
        allowImplicit: true
      }],

      // Do not enforce a particular arrow body style.
      'arrow-body-style': 'off',

      // Require the use of === and !==.
      'eqeqeq': ['error', 'always', {
        null: 'ignore'
      }],

      // Disallow the use of `alert`, `confirm`, and `prompt` in browser
      // contexts.
      'no-alert': 'error',

      // This rule is superseded by @typescript-eslint/no-misused-promises.
      // 'no-async-promise-executor': 'off'
      'no-async-promise-executor': 'off',

      // Disallow the use of `arguments.caller` and `arguments.callee`.
      'no-caller': 'error',

      // Warn on usage of `console` methods.
      'no-console': ['warn'],

      // Disallow returning a value in constructors.
      'no-constructor-return': 'error',

      // Disallow duplicate imports.
      'no-duplicate-imports': 'error',

      // Disallow `else` and `else if` blocks if the above `if` block contains a
      // return statement.
      'no-else-return': ['error', {
        allowElseIf: false
      }],

      // Disallow destructuring statements that do not create variables.
      'no-empty-pattern': 'error',

      // Ensure that comparisons to `null` only match `null`, and not also
      // `undefined`.
      'no-eq-null': 'error',

      // Disallow the use of eval().
      'no-eval': 'error',

      // Disallow unnecessary function binding.
      'no-extra-bind': 'error',

      // Disallow shorthand type conversions.
      'no-implicit-coercion': 'error',

      // Disallow declarations in the global scope.
      'no-implicit-globals': 'error',

      // Disallow the use of the __iterator__ property.
      'no-iterator': 'error',

      // Disallow unnecessary nested blocks.
      'no-lone-blocks': 'error',

      // Disallow function declarations that contain unsafe references inside
      // loop statements.
      'no-loop-func': 'error',

      // Disallow the use of the ++ and -- unary operators.
      'no-plusplus': ['error', {
        allowForLoopAfterthoughts: false
      }],

      // Disallow unnecessary computed property keys in objects and classes.
      'no-useless-computed-key': ['error', {
        enforceForClassMembers: true
      }],

      // Disallow renaming import, export, and destructured assignments to the
      // same name
      'no-useless-rename': 'error',

      // Require `let` or `const` instead of `var`.
      'no-var': 'error',

      // Require using arrow functions for callbacks.
      // For more rules related to arrow functions, see:
      // - 'prefer-arrow/prefer-arrow-functions' (below)
      'prefer-arrow-callback': 'error',

      // Require `const` over `let` for variables that are never redefined.
      'prefer-const': 'error',

      // Require using template literals instead of string concatenation.
      'prefer-template': 'error',

      // Disallow passing `10` as the second parameter to `parseInt`; since ES5
      // the second argument is only required when the developer needs the
      // string to be parsed with a base other than 10.
      'radix': ['error', 'as-needed'],

      // Disallow assignments that can lead to race conditions due to usage of
      // `await` or `yield`.
      'require-atomic-updates': 'error',

      // ----- [Plugin] @typescript/eslint -------------------------------------

      // Require that member overloads be consecutive.
      '@typescript-eslint/adjacent-overload-signatures': 'error',

      // Require the "generic style" for typing arrays.
      '@typescript-eslint/array-type': ['error', {
        default: 'generic',
        readonly: 'generic'
      }],

      // Do not allow await-ing of non-Promise values.
      '@typescript-eslint/await-thenable': 'error',

      // Require using @ts-expect-error with a description. Ban all other
      // TypeScript directives in comments.
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-check': false,
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-expect-error': 'allow-with-description'
      }],

      // Allow the use of the @ts-ignore directive. This rule may have been
      // superseded by ts-comment.
      '@typescript-eslint/ban-ts-ignore': 'off',

      // Disallow typing values using their runtime constructors, and prefer
      // their primitive counterparts instead.
      '@typescript-eslint/no-restricted-types': ['error', {
        types: {
          String: 'Use `string` instead.',
          Number: 'Use `number` instead.',
          Boolean: 'Use `boolean` instead.',
          Symbol: 'Use `symbol` instead.',
          Object: 'Use `object` instead.'
        }
      }],

      // Naming conventions are enforced using the naming-convention rule (see
      // below).
      'camelcase': 'off',
      '@typescript-eslint/camelcase': 'off',

      // No strong preference on this rule.
      '@typescript-eslint/class-literal-property-style': 'off',

      // Require the 'as' syntax for type assertions and allow casting object
      // literals using this syntax.
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow'
      }],

      // Require that optional parameters and parameters with default values are
      // last in a function signature.
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'off',

      // No strong preference on this rule.
      '@typescript-eslint/dot-notation': 'off',

      // Do not require explicit function return types; TypeScript has excellent
      // type inference and this is often not needed.
      '@typescript-eslint/explicit-function-return-type': 'off',

      // No strong preference on this rule.
      '@typescript-eslint/explicit-member-accessibility': 'off',

      // This rule requires explicit typing of anything exported from an ES
      // module. TypeScript's type inference is good enough that this shouldn't
      // be necessary.
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // No strong preference on this rule.
      '@typescript-eslint/init-declarations': 'off',

      // Enforce member ordering on interfaces and classes.
      '@typescript-eslint/member-ordering': ['error', {
        default: [
          // Field order.
          'private-static-field',
          'public-static-field',
          'private-instance-field',
          'public-instance-field',

          // Method order.
          'constructor',
          'private-instance-method',
          'public-instance-method',
          'static-method'
        ]
      }],

      // Do not enforce a particular method signature style ("property" style or
      // "method" style). While "property" style may allow the compiler to make
      // stronger guarantees about correctness, "method" style is required to
      // express overloads in interfaces; "property" style here would result in
      // a duplicate key error.
      '@typescript-eslint/method-signature-style': 'off',

      // Enforce naming conventions for various kinds of symbols.
      '@typescript-eslint/naming-convention': ['warn', {
        // By default, require a value be named using camelCase.
        selector: 'default',
        format: ['camelCase']
      }, {
        // Require variables to be named using camelCase, UPPER_CASE, or
        // PascalCase.
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase']
      }, {
        // Require function expressions to be named using camelCase or
        // PascalCase.
        selector: 'variable',
        types: ['function'],
        format: ['camelCase', 'PascalCase']
      }, {
        // Require function declarations to be named using camelCase or
        // PascalCase.
        selector: 'function',
        format: ['camelCase', 'PascalCase']
      }, {
        // Require classes, interfaces, type aliases, and type parameters to be
        // named using PascalCase.
        selector: ['class', 'interface', 'typeAlias', 'typeParameter'],
        format: ['PascalCase']
      }, {
        // Allow any standard casing for default imports.
        selector: 'import',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase']
      }, {
        // Do not enforce any naming conventions for object properties because
        // we often need to use objects whose shape is defined by a third-party
        // API or schema that we have no control over.
        selector: 'property',
        format: null
      }],

      // Disallow the use of `new Array()`.
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',

      // Disallow calling .toString() on values that don't produce useful
      // serialization.
      '@typescript-eslint/no-base-to-string': 'error',

      // Disallow duplicate names for class members.
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',

      // No strong preference on this rule.
      '@typescript-eslint/no-dynamic-delete': 'off',

      // Disallow empty functions.
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',

      // Allow explicit `any` types. While not recommended, this is sometimes
      // necessary.
      '@typescript-eslint/no-explicit-any': 'off',

      // Disallow extra non-null assertions.
      '@typescript-eslint/no-extra-non-null-assertion': 'error',

      // Disallow the use of classes as namespaces.
      '@typescript-eslint/no-extraneous-class': 'error',

      // Require Promise-like values to be handled appropriately.
      '@typescript-eslint/no-floating-promises': ['error', {
        // Exempt statements that use the `void` operator. This can be a good
        // way to explicitly mark a promise as intentionally not awaited.
        ignoreVoid: true
      }],

      // Disallow iterating over an array with a for-in loop, prefer for-of
      // loops.
      '@typescript-eslint/no-for-in-array': 'error',

      // Disallow the use of eval()-like methods.
      '@typescript-eslint/no-implied-eval': 'error',

      // Ban the use of explicit type definitions when TypeScript can infer
      // them.
      '@typescript-eslint/no-inferrable-types': 'error',

      // Disallow the usage of the `void` type outside of generic or return
      // types.
      //
      // DISABLED: This rule is disabled because it incorrectly detects an error
      // when `void` is used in union return types (ex: Promise<void> | void).
      '@typescript-eslint/no-invalid-void-type': 'off',

      // Allow magic numbers.
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',

      // Enforce valid definition of `new` and `constructor`.
      '@typescript-eslint/no-misused-new': 'error',

      // Avoid using promises in places not designed to handle them.
      '@typescript-eslint/no-misused-promises': 'error',

      // Disallow the use of custom TypeScript modules and namespaces.
      '@typescript-eslint/no-namespace': ['error', {
        // Exempt .d.ts files; it is often necessary in React projects to
        // declare custom "modules" for non-code file types (ie: images) to
        // avoid TypeScript errors when they are imported.
        allowDefinitionFiles: true
      }],

      // Disallow using a non-null assertion after an optional chain expression.
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

      // Disallows non-null assertions using the `!` postfix operator.
      '@typescript-eslint/no-non-null-assertion': 'error',

      // Disallow aliasing `this`.
      '@typescript-eslint/no-this-alias': 'error',

      // Disallow throwing literals as exceptions.
      '@/no-throw-literal': 'error',

      // Disallow unnecessary equality comparisons against boolean literals.
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',

      // Prevents conditionals where the type is always truthy or always falsy.
      //
      // DISABLED: This rule seems to prevent &&-gating.
      '@typescript-eslint/no-unnecessary-condition': 'off',

      // Disallow unnecessary namespace qualifiers.
      '@typescript-eslint/no-unnecessary-qualifier': 'error',

      // Prevent callees from providing the default value for a type parameter.
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',

      // Disallow type assertions that do not change the type of an expression.
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // Warn when assigning `any` to variables and properties.
      //
      // TEMPORARILY DISABLED: Regrettably, there are too many un-typed
      // modules/APIs in the JavaScript ecosystem, and the need for `any` is
      // still quite common.
      '@typescript-eslint/no-unsafe-assignment': 'off',

      // Warn on member access of values that are of type `any`.
      //
      // TEMPORARILY DISABLED: Regrettably, there are too many un-typed
      // modules/APIs in the JavaScript ecosystem, and the need for `any` is
      // still quite common.
      '@typescript-eslint/no-unsafe-member-access': 'off',

      // Allow calling functions of type `any`. This is necessary for any
      // packages that do not have type definitions.
      '@typescript-eslint/no-unsafe-call': 'off',

      // Allow returning a value of type `any` from a function. Most projects
      // will have the 'noImplicitAny' TypeScript option enabled and will
      // therefore have to explicitly declare the return type as `any`.
      '@typescript-eslint/no-unsafe-return': 'off',

      // Disallow unused expressions.
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',

      // Warn on unused variables. Note: TypeScript will usually report these
      // errors as well.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      // Disallow the use of variables before they are defined.
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',

      // Disallow unnecessary constructors.
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',

      // Prefer usage of as const over literal type.
      '@typescript-eslint/prefer-as-const': 'error',

      // Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only
      // used to access the array being iterated.
      '@typescript-eslint/prefer-for-of': 'error',

      // Use function types instead of interfaces with call signatures.
      '@typescript-eslint/prefer-function-type': 'error',

      // Enforce includes() method over indexOf() method.
      '@typescript-eslint/prefer-includes': 'error',

      // No strong preference on this rule.
      '@typescript-eslint/prefer-namespace-keyword': 'off',

      // Enforce the usage of the nullish coalescing operator instead of logical
      // chaining.
      '@typescript-eslint/prefer-nullish-coalescing': 'error',

      // Prefer using concise optional chain expressions instead of chained
      // logical ands.
      '@typescript-eslint/prefer-optional-chain': 'error',

      // Do not require marking function parameters as `readonly`.
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',

      // Require that private members are marked as readonly if they're never
      // modified outside of the constructor
      '@typescript-eslint/prefer-readonly': 'error',

      // Prefer using type parameter when calling Array#reduce instead of
      // casting.
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',

      // Enforce that RegExp#exec is used instead of String#match if no global
      // flag is provided.
      '@typescript-eslint/prefer-regexp-exec': 'error',

      // Enforce the use of String#startsWith and String#endsWith instead of
      // other equivalent methods of checking substrings.
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',

      // Requires any function or method that returns a Promise to be marked
      // `async`.
      '@typescript-eslint/promise-function-async': ['error', {
        // Additional types that should be considered as Promises.
        allowedPromiseNames: ['PromiseLike', 'Thenable'],
        // Exclude arrow functions. Otherwise, this will produce an error for
        // code like `.then(res => res.json())`. In such cases, marking the
        // function as async does little to improve readability.
        checkArrowFunctions: false
      }],

      // Require Array#sort calls to always provide a comparator function.
      '@typescript-eslint/require-array-sort-compare': 'error',

      // Disallow async functions which have no `await` expression.
      'require-await': 'off',
      '@typescript-eslint/require-await': ['warn'],

      // When adding two variables, operands must both be of type `number` or of
      // type `string`.
      '@typescript-eslint/restrict-plus-operands': 'error',

      // Allow non-string objects to be used in string interpolations. This may
      // have unintended results at times, but also allows developers to
      // implement their own toString methods on objects that will serialize
      // them in a sane way.
      '@typescript-eslint/restrict-template-literal-expressions': 'off',

      // Enforces await-ing of Promise-like values before returning them. This
      // allows for better stack traces if the promise rejects.
      '@typescript-eslint/return-await': 'error',

      // Allow type coercion in boolean expressions.
      '@typescript-eslint/strict-boolean-expressions': 'off',

      // No strong preference on this rule.
      '@typescript-eslint/switch-exhaustiveness-check': 'off',

      // Prefer ES6-style import declarations over triple-slash references.
      '@typescript-eslint/triple-slash-reference': ['error', {
        path: 'never',
        types: 'never',
        lib: 'never'
      }],

      // Do not require explicit type definitions. Prefer using TypeScript in
      // strict mode and leveraging type inference instead.
      '@typescript-eslint/typedef': 'off',

      // Disallow unbound methods from being called outside of their intended
      // `this` context.
      '@typescript-eslint/unbound-method': 'error',

      // Disallow overloads that could be unified into one by using a union or
      // an optional/rest parameter.
      '@typescript-eslint/unified-signatures': 'error',

      // ----- Stylistic -------------------------------------------------------

      // Require line breaks after opening and before closing array brackets if
      // there are line breaks inside elements or between elements.
      '@stylistic/array-bracket-newline': ['error', 'consistent'],

      // Require parens around arrow function arguments only when required.
      '@stylistic/arrow-parens': ['error', 'as-needed', {
        // Require parens if the function body is surrounded by braces.
        // requireForBlockBody: true
      }],

      // Require a space before and after an arrow function's arrow.
      '@stylistic/arrow-spacing': ['error', {
        after: true,
        before: true
      }],

      // Enforce the usage of 'one-true-brace-style' for braces.
      '@stylistic/brace-style': ['error', '1tbs'],

      // Disallow trailing commas in object and array literals.
      '@stylistic/comma-dangle': ['error', 'never'],

      // Disallow spaces before commas, require spaces after commas.
      '@stylistic/comma-spacing': ['error', {
        after: true,
        before: false
      }],

      // Require a newline at the end of files.
      '@stylistic/eol-last': ['error', 'never'],

      // Disallow spaces between the function name and the opening parenthesis
      // that calls it.
      '@/func-call-spacing': ['error', 'never'],

      // Require 2-space indentation.
      '@stylistic/indent': ['error', 2, {
        // Require an extra 2 spaces of indentation between switch statements
        // and case statements.
        SwitchCase: 1,
        flatTernaryExpressions: true,
        ignoredNodes: [
          'ConditionalExpression',
          // See: https://github.com/typescript-eslint/typescript-eslint/issues/455
          'TSTypeParameterInstantiation'
        ]
      }],

      // Require double quotes in JSX.
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],

      // Require a space before and after keywords like `for`, `if`, etc.
      '@stylistic/keyword-spacing': ['error', {
        after: true,
        before: true
      }],

      // Warn about long lines.
      '@stylistic/max-len': ['warn', {
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
      }],

      // Do not enforce a limit on statements per line.
      '@stylistic/max-statements-per-line': 'off',

      // Require no semi-colons after members in interface declarations.
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }],

      // Disallow arrow functions where they could be confused with comparisons.
      '@stylistic/no-confusing-arrow': ['error', {
        // Relaxes the rule and allows parens as a valid confusion-preventing
        // syntax.
        allowParens: true
      }],

      // Disallow unnecessary parentheses, except around JSX expressions and
      // arrow function bodies that only contain a ternary expression.
      '@stylistic/no-extra-parens': ['error', 'all', {
        ignoreJSX: 'all',
        ignoredNodes: [
          'ArrowFunctionExpression[body.type=ConditionalExpression]'
        ]
      }],

      // Disallow unnecessary semicolons.
      '@stylistic/no-extra-semi': 'error',

      // Use single quotes.
      '@stylistic/quotes': ['error', 'single'],

      // Disallow spaces between rest/spread operators and their expressions.
      '@stylistic/rest-spread-spacing': 'error',

      // Enforce consistent spacing before function parenthesis.
      '@stylistic/space-before-function-paren': ['error', {
        named: 'never',
        anonymous: 'never',
        asyncArrow: 'always'
      }],

      // Require a space after '//' in comments.
      '@stylistic/spaced-comment': ['error', 'always'],

      // Enforce consistent spacing around around colons in `case` and `default`
      // clauses in `switch` statements.
      '@stylistic/switch-colon-spacing': ['error', {
        after: true,
        before: false
      }],

      // Disallow extraneous spaces inside of template string curly brace pairs.
      '@stylistic/template-curly-spacing': ['error', 'never'],

      // Enforce consistent spacing around type annotations.
      '@stylistic/type-annotation-spacing': ['error', {
        after: true,
        before: false,
        overrides: {
          arrow: {
            before: true,
            after: true
          }
        }
      }],

      // Do not require ternary expressions be multi-line.
      '@stylistic/multiline-ternary': 'off',

      // ----- [Plugin] import -------------------------------------------------

      ...importPlugin.configs.recommended.rules,

      'import/no-unresolved': ['error', {
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
      }],

      // If a default import is used, ensures the module being imported has a
      // default export.
      'import/default': 'error',

      // Allow dynamic require() calls. These should not be used often anyway.
      // 'import/no-dynamic-require': 'off'
      'import/no-dynamic-require': 'off',

      // Disallow cyclic dependencies. While these work in CJS / Webpack, they
      // can cause subtle bugs in strict ES.
      'import/no-cycle': 'error',

      // Disallow useless path segments in import statements.
      'import/no-useless-path-segments': 'error',

      // Disallow invalid exports, i.e. re-export of the same name.
      'import/export': 'error',

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
      // access all named exports without having to write 'import * as
      // fooModule'.
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',

      // Allow the import of external modules that are not declared in
      // package.json.
      'import/no-extraneous-dependencies': 'off',

      // Allow modules to have no exports (tests, CLI entry points) and allow
      // modules to export values that are not imported in the local project
      // (libraries).
      'import/no-unused-modules': 'off',

      // These rules are far too ambitious to exist right now.
      'import/no-commonjs': 'off',
      'import/no-amd': 'off',
      'import/no-nodejs-modules': 'off',
      'import/no-import-module-exports': 'off',

      // Disable; conflicts with 'import/order' rule.
      'import/first': 'off',

      // This rule enforces that all exports are declared at the bottom of the
      // file. This rule will report any export declarations that comes before
      // any non-export statements.
      'import/exports-last': 'off',

      // Report repeated import of the same module in multiple places.
      'import/no-duplicates': 'error',

      // Allow namespace imports. This is the most convenient way to use
      // packages like Ramda without renaming named imports to avoid conflicts.
      'import/no-whitespace': 'off',

      // Do not require the use of file extensions within the import path.
      'import/extensions': 'off',

      // Enforce a convention in the order of require() / import statements.
      'import/order': ['error', {
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
        // Require imports within groups to be sorted alphabetically in
        // ascending order by import path.
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
      }],

      // Require 1 empty line after the last top-level import statement.
      'import/newline-after-import': 'error',

      // Allow unassigned imports (ie: imports with side-effects).
      'import/no-unassigned-import': 'off',

      // Allow named values to be the default export of a module. This can often
      // help improve the readability of stack traces for debugging.
      'import/no-named-default': 'off',

      // Allow default exports.
      'import/no-default-export': 'off',

      // Allow named exports.
      'import/no-named-export': 'off',

      // Allow anonymous default exports (again).
      'import/no-anonymous-default-export': 'off',

      // Do not require exports to be grouped.
      'import/group-exports': 'off',

      // ----- [Plugin] prefer-arrow -------------------------------------------

      // Prefer the use of arrow functions in certain contexts.
      'prefer-arrow/prefer-arrow-functions': ['error', {
        // Exempt top-level function declarations.
        allowStandaloneDeclarations: true,
        // Class methods will NOT be converted to arrow functions.
        classPropertiesAllowed: false,
        // Functions assigned to a prototype will be converted to arrow
        // functions when doing so would not alter or break their behavior.
        disallowPrototype: true
      }],

      // ----- [Plugin] unicorn ------------------------------------------------

      // Require consistent naming of errors in catch blocks.
      'unicorn/catch-error-name': ['error', {
        name: 'error',
        ignore: [
          // Additionally, allow errors to be named "cause".
          /^cause$/
        ]
      }],

      // DISABLED: This rule is disabled because it is often necessary to define
      // functions inside React.useEffect factories to ensure that variables
      // bound by their closures have the expected values.
      'unicorn/consistent-function-scoping': 'off',

      // Allow file names in kebab-case and PascalCase.
      'unicorn/filename-case': ['error', {
        cases: {
          kebabCase: true,
          pascalCase: true
        }
      }],

      // Allow functions to be passed by reference directly to an array
      // iteratee.
      'unicorn/no-array-callback-reference': 'off',

      // Allow the use of Array#forEach().
      'unicorn/no-array-for-each': 'off',

      // [Dec 2021] This rule is throwing false positives with utility libraries
      // like Ramda, so it has been temporarily disabled.
      'unicorn/no-array-method-this-argument': 'off',

      // Allow consecutive calls to .push() on the same array.
      'unicorn/no-array-push-push': 'off',

      // Allow use of Array.prototype.reduce.
      'unicorn/no-array-reduce': 'off',

      // Allow member access of parenthesized await expressions.
      'unicorn/no-await-expression-member': 'off',

      // Allow nested ternary expressions.
      'unicorn/no-nested-ternary': 'off',

      // Allow the use of `null`.
      'unicorn/no-null': 'off',

      // Don't prohibit usage of require(), require.resolve, and friends. These
      // are not widely used, and when they are it is usually for a good reason.
      // Also, 'import.meta.resolve' is still considered experimental.
      'unicorn/prefer-module': 'off',

      // Top-level await is only available in ESM/ESNext contexts.
      'unicorn/prefer-top-level-await': 'off',

      // Don't enforce 'more descriptive' variable names.
      'unicorn/prevent-abbreviations': 'off',

      // Do not require Object.fromEntries in all applicable use cases.
      'unicorn/prefer-object-from-entries': 'off',

      // Do not require that "TODO" comments have an expiration date.
      'unicorn/expiring-todo-comments': 'off',

      // Only require braces in a switch's "case" statements when they are
      // required.
      'unicorn/switch-case-braces': ['error', 'avoid'],

      // Do not enforce rules around await-ing non-Promise values.
      'unicorn/no-unnecessary-await': 'off',

      // Allow negated conditions.
      'unicorn/no-negated-condition': 'off',

      // Do not enforce import style.
      'unicorn/import-style': 'off',

      // Allow anonymous default exports.
      'unicorn/no-anonymous-default-export': 'off'
    }
  }, {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    extends: [tseslint.configs.disableTypeChecked]
  }
)