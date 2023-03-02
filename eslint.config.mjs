import { ts } from './dist/index.js';

export default [
  ...ts
];


// const globals = ts.reduce((foo, config) => {
//   if (typeof config === 'string') return foo;

//   if (config.languageOptions?.globals) {
//     return [...foo, ...Object.keys(config.languageOptions.globals)];
//   }

//   return foo;
// }, []);

// console.log('DO WE HAVE CONSOLE?', globals.includes('console'));
