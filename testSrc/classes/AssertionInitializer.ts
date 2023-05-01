import chai from "chai";

import { FieldType, NativeModel } from "@/types";

import { FIELD_TYPE } from "$/variables";

type TestItem = () => void;

interface Variables<Model> {
  model: Model;
  modelMaxLength: number;
  modelMinLength: number;
  modelLength: number;
  equalValue: any;
  testValue: any;
}

class AssertionInitializer<Model extends Partial<NativeModel> = any> {
  tests: TestItem[] = [];

  options = this.defaultOptions();
  variables: Variables<Model>;

  private defaultOptions() {
    return {
      modelCheck: true,
      stringEquality: true,
    };
  }

  setVariables(model: Model, equalValue: any, testValue: any) {
    this.variables = {
      ...this.variables,
      model,
      equalValue,
      testValue,
      modelLength: model.length!,
      modelMaxLength: model.maxLength!,
      modelMinLength: model.minLength!,
    };

    return this;
  }
  setModel(model: Model) {
    this.variables.model = model;
    return this;
  }
  setEqualValue(equalValue: any) {
    this.variables.equalValue = equalValue;
    return this;
  }
  setTestValue(testValue: any) {
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
        chai
          .expect(this.variables.equalValue.length)
          .to.be.equal(this.variables.testValue.length)
      );
      this.tests.push(() =>
        chai
          .expect(this.variables.equalValue)
          .to.be.equal(this.variables.testValue)
      );
    });

    return this;
  }

  addIf(condition: any, cb: () => void) {
    if (condition) {
      cb();
    }

    return this;
  }

  lengthCheck() {
    this.tests.push(() =>
      chai
        .expect(this.variables.testValue.length)
        .to.be.equal(+this.variables.modelLength)
    );

    return this;
  }

  typeCheck(customType?: FieldType) {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        chai
          .expect(this.variables.testValue)
          .to.be.an(customType || this.variables.model.type!)
      );
    });

    return this;
  }

  customTypeCheck(value: any, customType: FieldType) {
    this.tests.push(() => chai.expect(value).to.be.an(customType));

    return this;
  }

  emptyCheck() {
    this.addIf(this.options.modelCheck, () => {
      if (this.variables.model.empty === false)
        this.tests.push(() =>
          chai.expect(this.variables.testValue.length).to.be.greaterThan(0)
        );
    });

    return this;
  }

  gteCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        chai
          .expect(this.variables.testValue.length)
          .greaterThanOrEqual(this.variables.modelMinLength)
      );
    });

    return this;
  }
  gtCheck(length: number) {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        chai.expect(this.variables.testValue.length).to.be.greaterThan(length)
      );
    });

    return this;
  }
  lteCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        chai
          .expect(this.variables.testValue.length)
          .lessThanOrEqual(this.variables.modelMaxLength)
      );
    });

    return this;
  }

  numericCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        chai.expect(+this.variables.testValue).to.be.an(FIELD_TYPE.NUMBER)
      );
    });
    return this;
  }
}

const assertionInitializer = {
  create: <Model extends Partial<NativeModel>>() =>
    new AssertionInitializer<Model>(),
};

export { assertionInitializer, AssertionInitializer };
