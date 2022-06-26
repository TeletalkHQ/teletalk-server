const { expect } = require("@/functions/utilities/testUtils");

class TestBuilder {
  constructor() {
    this.tests = [];
    this.options = this.#defaultOptions();
    this.variables = this.#defaultVariables();
  }

  #defaultOptions() {
    return {
      modelCheck: true,
      stringEquality: true,
    };
  }
  #defaultVariables() {
    return {
      model: {},
      mainVariable: null,
      testVariable: null,
      modelMaxLength: 0,
      modelMinLength: 0,
      modelLength: 0,
    };
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

  setOptions(options = this.options) {
    this.options = { ...this.options, ...options };

    return this;
  }

  execute() {
    this.tests.forEach((test) => {
      test();
    });

    return this;
  }

  addCommonTest() {
    this.stringEquality().typeCheck().gteCheck().lteCheck();

    return this;
  }

  stringEquality() {
    this.checkAndExecute(this.options.stringEquality, () => {
      this.tests.push(() =>
        expect(this.variables.mainVariable.length).equal(
          this.variables.testVariable.length
        )
      );
      this.tests.push(() =>
        expect(this.variables.mainVariable).equal(this.variables.testVariable)
      );
    });

    return this;
  }

  checkAndExecute(condition, cb) {
    if (condition) {
      cb();
    }

    return this;
  }
  async checkAndExecuteAsync(condition, asyncCb) {
    if (condition) {
      await asyncCb();
    }

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

  typeCheck(customType) {
    this.checkAndExecute(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testVariable).to.be.an(
          customType || this.variables.model.type.value
        )
      );
    });

    return this;
  }

  customTypeCheck(value, customType) {
    this.tests.push(() => expect(value).to.be.an(customType));

    return this;
  }

  emptyCheck() {
    this.checkAndExecute(this.options.modelCheck, () => {
      if (this.variables.model.empty.value === false)
        this.tests.push(() =>
          expect(this.variables.testVariable.length).to.be.greaterThan(0)
        );
    });

    return this;
  }

  gteCheck() {
    this.checkAndExecute(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testVariable.length).greaterThanOrEqual(
          this.variables.modelMinLength
        )
      );
    });

    return this;
  }
  gtCheck(length) {
    this.checkAndExecute(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testVariable.length).greaterThan(length)
      );
    });

    return this;
  }
  lteCheck() {
    this.checkAndExecute(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testVariable.length).lessThanOrEqual(
          this.variables.modelMaxLength
        )
      );
    });

    return this;
  }

  numericCheck() {
    this.checkAndExecute(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(+this.variables.testVariable).to.be.an("number")
      );
    });
    return this;
  }
}

const testBuilder = { create: () => new TestBuilder() };

module.exports = { testBuilder, TestBuilder };
