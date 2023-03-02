const path = require('path');

const { PACKAGE_ROOT } = process.env;

module.exports = {
  extends: path.resolve(PACKAGE_ROOT, 'dist', 'configs-legacy', 'ts')
};
