const { expect } = require("@/functions/testUtilities/testUtils");

class TestBuilder {
  constructor() {
    this.model = {};
    this.mainVariable = null;
    this.testVariable = null;
    this.options = {
      modelCheck: true,
      stringEquality: true,
    };
  }

  stringEquality() {
    expect(this.testVariable.length).equal(this.mainVariable.length);
    expect(this.mainVariable).equal(this.testVariable);
  }

  setVariables(model, mainVariable, testVariable) {
    this.model = model;
    this.mainVariable = mainVariable;
    this.testVariable = testVariable;
  }
}

const testBuilder = new TestBuilder();

module.exports = { testBuilder, TestBuilder };
