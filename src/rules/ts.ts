import tsEslintPlugin from '@typescript-eslint/eslint-plugin'

import type { ESLint, Linter } from 'eslint'
import type { MarkRequired } from 'ts-essentials'
import type { NamedFlatEslintConfig } from 'types'

/**
 * Provided an ESLint configuration object, adds presets and rules for all
 * TypeScript files.
 */
export function applyTsRules(config: MarkRequired<NamedFlatEslintConfig, 'rules' | 'plugins'>) {
  // ----- [Plugin] @typescript/eslint -----------------------------------------

  // TODO: See if this typing issue is resolved in a future release.
  config.plugins['@typescript-eslint'] = tsEslintPlugin as unknown as ESLint.Plugin

  config.rules = {
    ...config.rules,
    ...tsEslintPlugin.configs['recommended'].rules
  }

  // N.B. For several of these rules, the base ESLint rule _must_ be disabled
  // for the TypeScript version to work correctly.

  // Require that member overloads be consecutive.
  config.rules['@typescript-eslint/adjacent-overload-signatures'] = 'error'

  // Require the "generic style" for typing arrays.
  config.rules['@typescript-eslint/array-type'] = ['error', {
    default: 'generic',
    readonly: 'generic'
  }]

  // Do not allow await-ing of non-Promise values.
  config.rules['@typescript-eslint/await-thenable'] = 'error'

  // Allow the use of @ts- directives. Their use can mask errors, but is still
  // necessary in many cases.

  // Require using @ts-expect-error with a description. Ban all other TypeScript
  // directives in comments.
  config.rules['@typescript-eslint/ban-ts-comment'] = ['error', {
    'ts-check': false,
    'ts-ignore': true,
    'ts-nocheck': true,
    'ts-expect-error': 'allow-with-description'
  }]

  // Allow the use of the @ts-ignore directive. This rule may have been
  // superseded by ts-comment.
  // config.rules['@typescript-eslint/ban-ts-ignore'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/ban-ts-ignore')

  // Disallow typing values using their runtime constructors, and prefer their
  // primitive counterparts instead.
  config.rules['@typescript-eslint/no-restricted-types'] = ['error', {
    types: {
      String: 'Use `string` instead.',
      Number: 'Use `number` instead.',
      Boolean: 'Use `boolean` instead.',
      Symbol: 'Use `symbol` instead.',
      Object: 'Use `object` instead.'
    }
  }]

  // Naming conventions are enforced using the naming-convention rule (see
  // below).
  // config.rules['camelcase'] = 'off'
  // config.rules['@typescript-eslint/camelcase'] = 'off'
  Reflect.deleteProperty(config.rules, 'camelcase')
  Reflect.deleteProperty(config.rules, '@typescript-eslint/camelcase')

  // No strong preference on this rule.
  // config.rules['@typescript-eslint/class-literal-property-style'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/class-literal-property-style')

  // Require the 'as' syntax for type assertions and allow casting object
  // literals using this syntax.
  config.rules['@typescript-eslint/consistent-type-assertions'] = ['error', {
    assertionStyle: 'as',
    objectLiteralTypeAssertions: 'allow'
  }]

  // Require that optional parameters and parameters with default values are
  // last in a function signature.
  // config.rules['default-param-last'] = 'off'
  // config.rules['@typescript-eslint/default-param-last'] = 'error'
  Reflect.deleteProperty(config.rules, 'default-param-last')
  Reflect.deleteProperty(config.rules, '@typescript-eslint/default-param-last')

  // No strong preference on this rule.
  // config.rules['@typescript-eslint/dot-notation'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/dot-notation')

  // Do not require explicit function return types; TypeScript has excellent
  // type inference and this is often not needed.
  // config.rules['@typescript-eslint/explicit-function-return-type'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/explicit-function-return-type')

  // No strong preference on this rule.
  // config.rules['@typescript-eslint/explicit-member-accessibility'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/explicit-member-accessibility')

  // This rule requires explicit typing of anything exported from an ES module.
  // TypeScript's type inference is good enough that this shouldn't be
  // necessary.
  // config.rules['@typescript-eslint/explicit-module-boundary-types'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/explicit-module-boundary-types')

  // No strong preference on this rule.
  // config.rules['@typescript-eslint/init-declarations'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/init-declarations')

  // Enforce member ordering on interfaces and classes.
  config.rules['@typescript-eslint/member-ordering'] = ['error', {
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
  }]

  // Do not enforce a particular method signature style ("property" style or
  // "method" style). While "property" style may allow the compiler to make
  // stronger guarantees about correctness, "method" style is required to
  // express overloads in interfaces; "property" style here would result in a
  // duplicate key error.
  // config.rules['@typescript-eslint/method-signature-style'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/method-signature-style')

  // Enforce naming conventions for various kinds of symbols.
  config.rules['@typescript-eslint/naming-convention'] = ['warn', {
    // By default, require a value be named using camelCase.
    selector: 'default',
    format: ['camelCase']
  }, {
    // Require variables to be named using camelCase, UPPER_CASE, or PascalCase.
    selector: 'variable',
    format: ['camelCase', 'UPPER_CASE', 'PascalCase']
  }, {
    // Require function expressions to be named using camelCase or PascalCase.
    selector: 'variable',
    types: ['function'],
    format: ['camelCase', 'PascalCase']
  }, {
    // Require function declarations to be named using camelCase or PascalCase.
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
    // Do not enforce any naming conventions for object properties because we
    // often need to use objects whose shape is defined by a third-party API or
    // schema that we have no control over.
    selector: 'property',
    // eslint-disable-next-line unicorn/no-null
    format: null
  }]

  // Disallow the use of `new Array()`.
  config.rules['no-array-constructor'] = 'off'
  config.rules['@typescript-eslint/no-array-constructor'] = 'error'

  // Disallow calling .toString() on values that don't produce useful
  // serialization.
  config.rules['@typescript-eslint/no-base-to-string'] = 'error'

  // Disallow duplicate names for class members.
  config.rules['no-dupe-class-members'] = 'off'
  config.rules['@typescript-eslint/no-dupe-class-members'] = 'error'

  // No strong preference on this rule.
  // config.rules['@typescript-eslint/no-dynamic-delete'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-dynamic-delete')

  // Disallow empty functions.
  config.rules['no-empty-function'] = 'off'
  config.rules['@typescript-eslint/no-empty-function'] = 'error'

  // Allow explicit `any` types. While not recommended, this is sometimes
  // necessary.
  // config.rules['@typescript-eslint/no-explicit-any'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-explicit-any')

  // Disallow extra non-null assertions.
  config.rules['@typescript-eslint/no-extra-non-null-assertion'] = 'error'

  // Disallow the use of classes as namespaces.
  config.rules['@typescript-eslint/no-extraneous-class'] = 'error'

  // Require Promise-like values to be handled appropriately.
  config.rules['@typescript-eslint/no-floating-promises'] = ['error', {
    // Exempt statements that use the `void` operator. This can be a good way
    // to explicitly mark a promise as intentionally not awaited.
    ignoreVoid: true
  }]

  // Disallow iterating over an array with a for-in loop, prefer for-of loops.
  config.rules['@typescript-eslint/no-for-in-array'] = 'error'

  // Disallow the use of eval()-like methods.
  config.rules['@typescript-eslint/no-implied-eval'] = 'error'

  // Ban the use of explicit type definitions when TypeScript can infer them.
  config.rules['@typescript-eslint/no-inferrable-types'] = 'error'

  // Disallow the usage of the `void` type outside of generic or return types.
  //
  // DISABLED: This rule is disabled because it incorrectly detects an error
  // when `void` is used in union return types (ex: Promise<void> | void).
  // config.rules['@typescript-eslint/no-invalid-void-type'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-invalid-void-type')

  // No strong preference on this rule.
  // config.rules['no-magic-numbers'] = 'off'
  Reflect.deleteProperty(config.rules, 'no-magic-numbers')
  // config.rules['@typescript-eslint/no-magic-numbers'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-magic-numbers')

  // Enforce valid definition of `new` and `constructor`.
  config.rules['@typescript-eslint/no-misused-new'] = 'error'

  // Avoid using promises in places not designed to handle them.
  config.rules['@typescript-eslint/no-misused-promises'] = 'error'

  // Disallow the use of custom TypeScript modules and namespaces.
  config.rules['@typescript-eslint/no-namespace'] = ['error', {
  // Exempt .d.ts files; it is often necessary in React projects to declare
  // custom "modules" for non-code file types (ie: images) to avoid TypeScript
  // errors when they are imported.
    allowDefinitionFiles: true
  }]

  // Disallow using a non-null assertion after an optional chain expression.
  config.rules['@typescript-eslint/no-non-null-asserted-optional-chain'] = 'error'

  // Disallows non-null assertions using the `!` postfix operator.
  config.rules['@typescript-eslint/no-non-null-assertion'] = 'error'

  // Disallow aliasing `this`.
  config.rules['@typescript-eslint/no-this-alias'] = 'error'

  // Disallow throwing literals as exceptions.
  config.rules['@/no-throw-literal'] = 'error'

  // Disallow unnecessary equality comparisons against boolean literals.
  config.rules['@typescript-eslint/no-unnecessary-boolean-literal-compare'] = 'error'

  // Prevents conditionals where the type is always truthy or always falsy.
  //
  // DISABLED: This rule seems to prevent &&-gating.
  // config.rules['@typescript-eslint/no-unnecessary-condition'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-unnecessary-condition')

  // Disallow unnecessary namespace qualifiers.
  config.rules['@typescript-eslint/no-unnecessary-qualifier'] = 'error'

  // Prevent callees from providing the default value for a type parameter.
  config.rules['@typescript-eslint/no-unnecessary-type-arguments'] = 'warn'

  // Disallow type assertions that do not change the type of an expression.
  config.rules['@typescript-eslint/no-unnecessary-type-assertion'] = 'error'

  // Warn when assigning `any` to variables and properties.
  //
  // TEMPORARILY DISABLED: Regrettably, there are too many un-typed modules/APIs
  // in the JavaScript ecosystem, and the need for `any` is still quite common.
  // config.rules['@typescript-eslint/no-unsafe-assignment'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-unsafe-assignment')

  // Warn on member access of values that are of type `any`.
  //
  // TEMPORARILY DISABLED: Regrettably, there are too many un-typed modules/APIs
  // in the JavaScript ecosystem, and the need for `any` is still quite common.
  // config.rules['@typescript-eslint/no-unsafe-member-access'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-unsafe-member-access')

  // Allow calling functions of type `any`. This is necessary for any packages
  // that do not have type definitions.
  // config.rules['@typescript-eslint/no-unsafe-call'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-unsafe-call')

  // Allow returning a value of type `any` from a function. Most projects will
  // have the 'noImplicitAny' TypeScript option enabled and will therefore have
  // to explicitly declare the return type as `any`.
  // config.rules['@typescript-eslint/no-unsafe-return'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/no-unsafe-return')

  // Disallow unused expressions.
  config.rules['no-unused-expressions'] = 'off'
  config.rules['@typescript-eslint/no-unused-expressions'] = 'error'

  // Warn on unused variables. Note: TypeScript will usually report these errors
  // as well.
  config.rules['no-unused-vars'] = 'off'
  config.rules['@typescript-eslint/no-unused-vars'] = 'warn'

  // Disallow the use of variables before they are defined.
  config.rules['no-use-before-define'] = 'off'
  config.rules['@typescript-eslint/no-use-before-define'] = 'error'

  // Disallow unnecessary constructors.
  config.rules['no-useless-constructor'] = 'off'
  config.rules['@typescript-eslint/no-useless-constructor'] = 'error'

  // Prefer usage of as const over literal type.
  config.rules['@typescript-eslint/prefer-as-const'] = 'error'

  // Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used
  // to access the array being iterated.
  config.rules['@typescript-eslint/prefer-for-of'] = 'error'

  // Use function types instead of interfaces with call signatures.
  config.rules['@typescript-eslint/prefer-function-type'] = 'error'

  // Enforce includes() method over indexOf() method.
  config.rules['@typescript-eslint/prefer-includes'] = 'error'

  // No strong preference on this rule.
  // config.rules['@typescript-eslint/prefer-namespace-keyword'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/prefer-namespace-keyword')

  // Enforce the usage of the nullish coalescing operator instead of logical
  // chaining.
  config.rules['@typescript-eslint/prefer-nullish-coalescing'] = 'error'

  // Prefer using concise optional chain expressions instead of chained logical
  // ands.
  config.rules['@typescript-eslint/prefer-optional-chain'] = 'error'

  // Do not require marking function parameters as `readonly`.
  // config.rules['@typescript-eslint/prefer-readonly-parameter-types'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/prefer-readonly-parameter-types')

  // Require that private members are marked as readonly if they're never
  // modified outside of the constructor
  config.rules['@typescript-eslint/prefer-readonly'] = 'error'

  // Prefer using type parameter when calling Array#reduce instead of casting.
  config.rules['@typescript-eslint/prefer-reduce-type-parameter'] = 'error'

  // Enforce that RegExp#exec is used instead of String#match if no global flag
  // is provided.
  config.rules['@typescript-eslint/prefer-regexp-exec'] = 'error'

  // Enforce the use of String#startsWith and String#endsWith instead of other
  // equivalent methods of checking substrings.
  config.rules['@typescript-eslint/prefer-string-starts-ends-with'] = 'error'

  // Requires any function or method that returns a Promise to be marked
  // `async`.
  config.rules['@typescript-eslint/promise-function-async'] = ['error', {
  // Additional types that should be considered as Promises.
    allowedPromiseNames: ['PromiseLike', 'Thenable'],
    // Exclude arrow functions. Otherwise, this will produce an error for code
    // like `.then(res => res.json())`. In such cases, marking the function as
    // async does little to improve readability.
    checkArrowFunctions: false
  }]

  // Require Array#sort calls to always provide a comparator function.
  config.rules['@typescript-eslint/require-array-sort-compare'] = 'error'

  // Disallow async functions which have no `await` expression.
  config.rules['require-await'] = 'off'
  config.rules['@typescript-eslint/require-await'] = ['warn']

  // When adding two variables, operands must both be of type `number` or of
  // type `string`.
  config.rules['@typescript-eslint/restrict-plus-operands'] = 'error'

  // Allow non-string objects to be used in string interpolations. This may have
  // unintended results at times, but also allows developers to implement their
  // own toString methods on objects that will serialize them in a sane way.
  // config.rules['@typescript-eslint/restrict-template-expressions'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/restrict-template-literal-expressions')

  // Enforces await-ing of Promise-like values before returning them. This
  // allows for better stack traces if the promise rejects.
  config.rules['@typescript-eslint/return-await'] = 'error'

  // Allow type coercion in boolean expressions.
  // config.rules['@typescript-eslint/strict-boolean-expressions'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/strict-boolean-expressions')

  // No strong preference on this rule.
  // config.rules['@typescript-eslint/switch-exhaustiveness-check'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/switch-exhaustiveness-check')

  // Prefer ES6-style import declarations over triple-slash references.
  config.rules['@typescript-eslint/triple-slash-reference'] = ['error', {
    path: 'never',
    types: 'never',
    lib: 'never'
  }]

  // Do not require explicit type definitions. Prefer using TypeScript in strict
  // mode and leveraging type inference instead.
  // config.rules['@typescript-eslint/typedef'] = 'off'
  Reflect.deleteProperty(config.rules, '@typescript-eslint/typedef')

  // Disallow unbound methods from being called outside of their intended `this`
  // context.
  config.rules['@typescript-eslint/unbound-method'] = 'error'

  // Disallow overloads that could be unified into one by using a union or an
  // optional/rest parameter.
  config.rules['@typescript-eslint/unified-signatures'] = 'error'

  return config
}

/**
 * Produces a set of overrides for test files that can be applied to legacy
 * configurations via 'overrides' and to flat configurations as a member of a
 * configuration set.
 */
export function generateTypeScriptTestFileRules(): Linter.RulesRecord {
  return {
    '@typescript-eslint/unbound-method': 'off',
    // Do not require that async functions utilize the await keyword. This
    // allows us to easily mock async functions with a mock implementation
    // that may be synchronous.
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',
    // Do not enforce naming convention rules for values.
    '@typescript-eslint/naming-convention': 'off',
    // Allow console statements.
    'no-console': 'off'
  }
}