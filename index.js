var Immutable = require("immutable");
var invariant = require("react/lib/invariant");

const NOT_SET = "@@NOT_SET@@";

// TODO(dmnd): These don't work well because get is called by internal immutable
// code
//
// var get = function(k, notSetValue) {
//   invariant(notSetValue, `notSetValue is mandatory!`);
//   return this.get(k);
// };
//
// Immutable.List.prototype.get = get;
// Immutable.Map.prototype.get = get;
//
//
// var getIn = function(keyPath, notSetValue) {
//   invariant(notSetValue, `notSetValue is mandatory!`);
//   return this.getIn(keyPath);
// };
//
// Immutable.List.prototype.getIn = getIn;
// Immutable.Map.prototype.getIn = getIn;


var fetch = function(k) {
  invariant(arguments.length === 1, `Too many arguments! ${arguments[1]}`);
  var result = this.get(k, NOT_SET);
  invariant(result !== NOT_SET, `No value at ${k}`);
  return result;
};

Immutable.List.prototype.fetch = fetch;
Immutable.Map.prototype.fetch = fetch;
Immutable.Seq.prototype.fetch = fetch;
Immutable.Record.prototype.fetch = fetch;


var fetchIn = function(searchKeyPath) {
  invariant(arguments.length === 1, `Too many arguments! ${arguments[1]}`);
  var result = this.getIn(searchKeyPath, NOT_SET);
  invariant(result !== NOT_SET, `No value at ${searchKeyPath}`);
  return result;
};

Immutable.List.prototype.fetchIn = fetchIn;
Immutable.Map.prototype.fetchIn = fetchIn;
Immutable.Seq.prototype.fetchIn = fetchIn;
Immutable.Record.prototype.fetchIn = fetchIn;


module.exports = Immutable;
