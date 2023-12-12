import chai from "chai";

import { VoidNoArgsFn } from "~/types";
import { NativeModel } from "~/types/model";

import { AssertionInitializerOptions } from "@/types";
import { FIELD_TYPE } from "@/variables";

interface Variables<Model> {
  model: Model;
  modelMaxLength: number;
  modelMinLength: number;
  modelLength: number;
  equalValue: any;
  testValue: any;
}

export class AssertionInitializer<Model extends NativeModel = any> {
  tests: VoidNoArgsFn[] = [];

  options = this.defaultOptions();
  variables: Variables<Model>;

  private defaultOptions(): AssertionInitializerOptions {
    return {
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

  setOptions(options: Partial<AssertionInitializerOptions> = this.options) {
    this.options = { ...this.options, ...options };

    return this;
  }

  automate() {
    const m = this.variables.model;

    this.typeCheck();

    if (this.options.stringEquality) this.stringEqualityCheck();

    if (m.empty === false) this.emptyCheck();
    if (m.maxLength) this.lteCheck();
    if (m.minLength) this.gteCheck();
    if (m.length) this.lengthCheck();
    if (m.numeric) this.numericCheck();

    return this;
  }

  run() {
    this.tests.forEach((test) => test());

    return this;
  }

  addCommonTest() {
    this.stringEqualityCheck().typeCheck().gteCheck().lteCheck();

    return this;
  }

  stringEqualityCheck() {
    this.addIf(this.options.stringEquality, () => {
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

  typeCheck(customType = this.variables.model.type) {
    this.tests.push(() => {
      chai.expect(this.variables.testValue).to.be.an(customType);
    });

    return this;
  }

  customTypeCheck(value: any, customType = this.variables.model.type) {
    this.tests.push(() => chai.expect(value).to.be.an(customType));

    return this;
  }

  emptyCheck() {
    this.tests.push(() =>
      chai.expect(this.variables.testValue.length).to.be.greaterThan(0)
    );

    return this;
  }

  gteCheck() {
    this.tests.push(() =>
      chai
        .expect(this.variables.testValue.length)
        .to.be.greaterThanOrEqual(this.variables.modelMinLength)
    );

    return this;
  }
  gtCheck(length: number) {
    this.tests.push(() =>
      chai.expect(this.variables.testValue.length).to.be.greaterThan(length)
    );

    return this;
  }
  lteCheck() {
    this.tests.push(() =>
      chai
        .expect(this.variables.testValue.length)
        .to.be.lessThanOrEqual(this.variables.modelMaxLength)
    );

    return this;
  }

  numericCheck() {
    this.tests.push(
      () =>
        chai.expect(+this.variables.testValue).to.be.an(FIELD_TYPE.NUMBER).and
          .not.be.an.NaN
    );

    return this;
  }
}

export const assertionInitializer = <Model extends NativeModel>() =>
  new AssertionInitializer<Model>();
