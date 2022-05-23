const { expect } = require("@/functions/testUtilities/testUtils");

class TestBuilder {
  constructor() {
    this.model = {};
    this.mainVariable = null;
    this.testVariable = null;
    this.defaultOptions = {
      modelCheck: true,
      stringEquality: true,
    };
    this.options = { ...this.defaultOptions };
    this.tests = [];

    this.modelMaxLength = 0;
    this.modelMinLength = 0;
  }

  stringEquality() {
    this.tests.push(() =>
      expect(this.testVariable.length).equal(this.mainVariable.length)
    );
    this.tests.push(() => expect(this.mainVariable).equal(this.testVariable));

    return this;
  }

  setVariables(model, mainVariable, testVariable) {
    this.model = model;
    this.mainVariable = mainVariable;
    this.testVariable = testVariable;
    this.modelMaxLength = this.model.maxlength?.value;
    this.modelMinLength = this.model.minlength?.value;

    return this;
  }

  typeCheck() {
    this.tests.push(() =>
      expect(this.testVariable).to.be.an(this.model.type.value)
    );

    return this;
  }

  emptyCheck() {
    if (this.model.empty.value === false)
      this.tests.push(() =>
        expect(this.testVariable.length).to.be.greaterThan(0)
      );

    return this;
  }

  gteCheck() {
    this.tests.push(() =>
      expect(this.testVariable.length).greaterThanOrEqual(this.modelMinLength)
    );

    return this;
  }
  lteCheck() {
    this.tests.push(() =>
      expect(this.testVariable.length).lessThanOrEqual(this.modelMaxLength)
    );

    return this;
  }

  numericCheck() {
    this.tests.push(() => expect(+this.testVariable).to.be.an("number"));

    return this;
  }

  execute(resetCondition = true) {
    this.tests.forEach((test) => {
      test();
    });

    if (resetCondition) this.reset();

    return this;
  }

  reset() {
    this.model = {};
    this.mainVariable = null;
    this.testVariable = null;
    this.options = { ...this.defaultOptions };
    this.tests = [];

    return this;
  }
}

const testBuilder = new TestBuilder();

module.exports = { testBuilder, TestBuilder };
