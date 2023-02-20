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
      equalValue: undefined,
      testValue: undefined,
      modelMaxLength: 0,
      modelMinLength: 0,
      modelLength: 0,
    };
  }

  setVariables(model, equalValue, testValue) {
    this.variables = {
      ...this.variables,
      model,
      equalValue,
      testValue,
      modelLength: model?.length?.value,
      modelMaxLength: model?.maxlength?.value,
      modelMinLength: model?.minlength?.value,
    };

    return this;
  }
  setModel(model) {
    this.variables.model = model;
    return this;
  }
  setEqualValue(equalValue) {
    this.variables.equalValue = equalValue;
    return this;
  }
  setTestValue(testValue) {
    this.variables.testValue = testValue;
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
        expect(this.variables.equalValue.length).toBe(
          this.variables.testValue.length
        )
      );
      this.tests.push(() =>
        expect(this.variables.equalValue).toBe(this.variables.testValue)
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
      expect(this.variables.testValue.length).toBe(+this.variables.modelLength)
    );

    return this;
  }

  typeCheck(customType) {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testValue).toBeInstanceOf(
          customType || this.variables.model.type.value
        )
      );
    });

    return this;
  }

  customTypeCheck(value, customType) {
    this.tests.push(() => expect(value).toBeInstanceOf(customType));

    return this;
  }

  emptyCheck() {
    this.addIf(this.options.modelCheck, () => {
      if (this.variables.model.empty.value === false)
        this.tests.push(() =>
          expect(this.variables.testValue.length).toBeGreaterThan(0)
        );
    });

    return this;
  }

  gteCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testValue.length).greaterThanOrEqual(
          this.variables.modelMinLength
        )
      );
    });

    return this;
  }
  gtCheck(length) {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testValue.length).toBeGreaterThan(length)
      );
    });

    return this;
  }
  lteCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testValue.length).lessThanOrEqual(
          this.variables.modelMaxLength
        )
      );
    });

    return this;
  }

  numericCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(+this.variables.testValue).toBeInstanceOf(FIELD_TYPE.NUMBER)
      );
    });
    return this;
  }
}

const successTestBuilder = { create: () => new SuccessTestBuilder() };

module.exports = { successTestBuilder, SuccessTestBuilder };
