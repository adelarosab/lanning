if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/cjs/lanning.production.min.js');
} else {
  module.exports = require('./dist/cjs/lanning.development.js');
}
