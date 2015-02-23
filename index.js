"use strict";

const I = require("immutable");
const NOT_SET = "@@NOT_SET@@";

function invariant(condition, messageFn) {
  if (!condition) {
    let error = new Error(`Invariant Violation: ${messageFn()}`);
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
  invariant(arguments.length === 1,
            () => `Too many arguments! ${arguments[1]}`);
  const result = this.get(k, NOT_SET);
  invariant(result !== NOT_SET, () => `No value ${k} in ${this}`);
  return result;
}

I.List.prototype.fetch = fetch;
I.Map.prototype.fetch = fetch;
I.Seq.prototype.fetch = fetch;
I.Record.prototype.fetch = fetch;


function fetchIn(searchKeyPath) {
  invariant(arguments.length === 1,
            () => `Too many arguments! ${arguments[1]}`);
  const result = this.getIn(searchKeyPath, NOT_SET);
  invariant(result !== NOT_SET,
            () => `No value at ${searchKeyPath} in ${this}`);
  return result;
}

I.List.prototype.fetchIn = fetchIn;
I.Map.prototype.fetchIn = fetchIn;
I.Seq.prototype.fetchIn = fetchIn;
I.Record.prototype.fetchIn = fetchIn;


module.exports = I;
