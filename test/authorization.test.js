const assert    = require("chai").assert;
const authorizaion = require("../routes/authorization");

describe("Test Scenario 1", function() {
    describe("Test Group A", function() {
      it("Test Case 1", function() {
        assert.equal(true,true, "Helpful Message");
      });
    });
  
    describe("Test Group B", function() {
      it("Test Case 2", function() {
        assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
      });
    });
  });