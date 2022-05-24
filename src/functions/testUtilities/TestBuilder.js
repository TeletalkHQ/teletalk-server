const { expect } = require("@/functions/testUtilities/testUtils");

class TestBuilder {
  constructor() {
    this.defaultOptions = {
      modelCheck: true,
      stringEquality: true,
    };
    this.options = { ...this.defaultOptions };
    this.tests = [];

    this.variables = this.getDefaultVariables();
  }

  stringEquality() {
    this.tests.push(() =>
      expect(this.variables.mainVariable.length).equal(
        this.variables.testVariable.length
      )
    );
    this.tests.push(() =>
      expect(this.variables.mainVariable).equal(this.variables.testVariable)
    );

    return this;
  }

  lengthCheck() {
    this.tests.push(() =>
      expect(this.variables.testVariable.length).equal(
        +this.variables.modelLength
      )
    );

    return this;
  }

  setVariables(model, mainVariable, testVariable) {
    this.variables = {
      ...this.variables,
      model,
      mainVariable,
      testVariable,
      modelLength: model?.length?.value,
      modelMaxLength: model?.maxlength?.value,
      modelMinLength: model?.minlength?.value,
    };

    return this;
  }

  typeCheck(customType) {
    this.tests.push(() =>
      expect(this.variables.testVariable).to.be.an(
        customType || this.variables.model.type.value
      )
    );

    return this;
  }

  customTypeCheck(value, customType) {
    this.tests.push(() => expect(value).to.be.an(customType));

    return this;
  }

  emptyCheck() {
    if (this.variables.model.empty.value === false)
      this.tests.push(() =>
        expect(this.variables.testVariable.length).to.be.greaterThan(0)
      );

    return this;
  }

  gteCheck() {
    this.tests.push(() =>
      expect(this.variables.testVariable.length).greaterThanOrEqual(
        this.variables.modelMinLength
      )
    );

    return this;
  }
  gtCheck(length) {
    this.tests.push(() =>
      expect(this.variables.testVariable.length).greaterThan(length)
    );

    return this;
  }
  lteCheck() {
    this.tests.push(() =>
      expect(this.variables.testVariable.length).lessThanOrEqual(
        this.variables.modelMaxLength
      )
    );

    return this;
  }

  numericCheck() {
    this.tests.push(() =>
      expect(+this.variables.testVariable).to.be.an("number")
    );

    return this;
  }

  execute(resetCondition = true) {
    this.tests.forEach((test) => {
      test();
    });

    if (resetCondition) this.reset();

    return this;
  }

  getDefaultVariables() {
    return {
      model: {},
      mainVariable: null,
      testVariable: null,
      modelMaxLength: 0,
      modelMinLength: 0,
      modelLength: 0,
    };
  }

  reset() {
    this.variables = this.getDefaultVariables();

    this.options = { ...this.defaultOptions };
    this.tests = [];

    return this;
  }
}

const testBuilder = new TestBuilder();

module.exports = { testBuilder, TestBuilder };
