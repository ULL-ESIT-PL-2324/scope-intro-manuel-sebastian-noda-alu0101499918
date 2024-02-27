const util = require('util')
deb = x => util.inspect(x, { depth: null })


module.exports = {
  deb,
}
