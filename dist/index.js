"use strict";

var I = require("immutable");
var NOT_SET = "@@NOT_SET@@";

function invariant(condition, messageFn) {
  if (!condition) {
    var error = new Error("Invariant Violation: " + messageFn());
    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

// TODO(dmnd): These don't work well because get is called by internal immutable
// code
//
// var get = function(k, notSetValue) {
//   invariant(notSetValue, `notSetValue is mandatory!`);
//   return this.get(k);
// };
//
// I.List.prototype.get = get;
// I.Map.prototype.get = get;
//
//
// var getIn = function(keyPath, notSetValue) {
//   invariant(notSetValue, `notSetValue is mandatory!`);
//   return this.getIn(keyPath);
// };
//
// I.List.prototype.getIn = getIn;
// I.Map.prototype.getIn = getIn;


function fetch(k) {
  var _this = this;
  var _arguments = arguments;
  invariant(arguments.length === 1, function () {
    return "Too many arguments! " + _arguments[1];
  });
  var result = this.get(k, NOT_SET);
  invariant(result !== NOT_SET, function () {
    return "No value " + k + " in " + _this;
  });
  return result;
}

I.List.prototype.fetch = fetch;
I.Map.prototype.fetch = fetch;
I.Seq.prototype.fetch = fetch;
I.Record.prototype.fetch = fetch;


function fetchIn(searchKeyPath) {
  var _this2 = this;
  var _arguments2 = arguments;
  invariant(arguments.length === 1, function () {
    return "Too many arguments! " + _arguments2[1];
  });
  var result = this.getIn(searchKeyPath, NOT_SET);
  invariant(result !== NOT_SET, function () {
    return "No value at " + searchKeyPath + " in " + _this2;
  });
  return result;
}

I.List.prototype.fetchIn = fetchIn;
I.Map.prototype.fetchIn = fetchIn;
I.Seq.prototype.fetchIn = fetchIn;
I.Record.prototype.fetchIn = fetchIn;


module.exports = I;