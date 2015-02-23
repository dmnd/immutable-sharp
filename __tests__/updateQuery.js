/* global jest, describe, it, expect */

"use strict";

jest.dontMock("../index.js");
jest.dontMock("immutable");

describe("updateQuery", () => {

  it("works like update when the keyPath has only a single element", () => {
    const I = require("../index.js");
    const x1 = I.Map({
      "key": "value"
    });
    const x2 = x1.updateQuery(["key"], () => "foo");
    expect(x2.toObject()).toEqual({"key": "foo"});
  });

  it("updates all values in a List", () => {
    const I = require("../index.js");
    const x1 = I.fromJS([0, 1, 2]);
    const x2 = x1.updateQuery(["*"], x => x + 1);
    expect(x2.toJS()).toEqual([1, 2, 3]);
  });

  it("updates a list in a map", () => {
    const I = require("../index.js");
    const x1 = I.fromJS({"players": ["alice", "bob"]});
    const x2 = x1.updateQuery(["players", "*"], s => s.toUpperCase());
    expect(x2.toJS()).toEqual({"players": ["ALICE", "BOB"]});
  });

  it("updates a map in list", () => {
    const I = require("../index.js");
    const x1 = I.fromJS([{"name": "alice"}, {"name": "bob"}]);
    const x2 = x1.updateQuery(["*", "name"], s => s.toUpperCase());
    expect(x2.toJS()).toEqual([{"name": "ALICE"}, {"name": "BOB"}]);
  });

  it("updates nested data", () => {
    const I = require("../index.js");
    const x1 = I.fromJS({
      "players": [{
        "name": "alice",
        "units": [{"hp": 50}, {"hp": 10}, {"hp": 100}]
      }, {
        "name": "bob",
        "units": [{"hp": 100}]
      }]
    });
    const x2 = x1.updateQuery(["players", "*", "name"], s => s.toUpperCase());
    expect(x2.toJS()).toEqual({
      "players": [{
        "name": "ALICE",
        "units": [{"hp": 50}, {"hp": 10}, {"hp": 100}]
      }, {
        "name": "BOB",
        "units": [{"hp": 100}]
      }]
    });
  });

  it("updates deeply nested data", () => {
    const I = require("../index.js");
    const x1 = I.fromJS({
      "players": [{
        "name": "alice",
        "units": [{"hp": 50}, {"hp": 10}, {"hp": 100}]
      }, {
        "name": "bob",
        "units": [{"hp": 100}]
      }]
    });
    const x2 = x1.updateQuery(["players", "*", "units", "*", "hp"],
                              hp => hp - 1);
    expect(x2.toJS()).toEqual({
      "players": [{
        "name": "alice",
        "units": [{"hp": 49}, {"hp": 9}, {"hp": 99}]
      }, {
        "name": "bob",
        "units": [{"hp": 99}]
      }]
    });
  });

});
