var path = require('path');

var _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  let val = path.join.apply(path, [_root].concat(args));
  console.log(val);
  return val;
}

exports.root = root;
