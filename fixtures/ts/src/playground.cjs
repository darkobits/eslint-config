// require() should be defined.
const path = require('node:path')

// module and __dirname should be defined.
module.exports = path.resolve(__dirname)

function foo() {
  return
}

exports.foo = foo