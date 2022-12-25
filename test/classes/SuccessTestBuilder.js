const { expect } = require("chai");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

class SuccessTestBuilder {
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
      requestValue: null,
      responseValue: null,
      modelMaxLength: 0,
      modelMinLength: 0,
      modelLength: 0,
    };
  }

  setVariables(model, requestValue, responseValue) {
    this.variables = {
      ...this.variables,
      model,
      requestValue,
      responseValue,
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

  run() {
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
    this.addIf(this.options.stringEquality, () => {
      this.tests.push(() =>
        expect(this.variables.requestValue.length).equal(
          this.variables.responseValue.length
        )
      );
      this.tests.push(() =>
        expect(this.variables.requestValue).equal(this.variables.responseValue)
      );
    });

    return this;
  }

  addIf(condition, cb) {
    if (condition) {
      cb();
    }

    return this;
  }

  lengthCheck() {
    this.tests.push(() =>
      expect(this.variables.responseValue.length).equal(
        +this.variables.modelLength
      )
    );

    return this;
  }

  typeCheck(customType) {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.responseValue).to.be.an(
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
    this.addIf(this.options.modelCheck, () => {
      if (this.variables.model.empty.value === false)
        this.tests.push(() =>
          expect(this.variables.responseValue.length).to.be.greaterThan(0)
        );
    });

    return this;
  }

  gteCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.responseValue.length).greaterThanOrEqual(
          this.variables.modelMinLength
        )
      );
    });

    return this;
  }
  gtCheck(length) {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.responseValue.length).greaterThan(length)
      );
    });

    return this;
  }
  lteCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.responseValue.length).lessThanOrEqual(
          this.variables.modelMaxLength
        )
      );
    });

    return this;
  }

  numericCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(+this.variables.responseValue).to.be.an(FIELD_TYPE.NUMBER)
      );
    });
    return this;
  }
}

const successTestBuilder = { create: () => new SuccessTestBuilder() };

module.exports = { successTestBuilder, SuccessTestBuilder };
