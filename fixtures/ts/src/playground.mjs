// Import should work.
import path from 'path'

// require should be defined; assume we are transpiling to CJS.
export const foo = require(path.resolve('foo'))

// __dirname should be defined.
export const dir = __dirname