/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomTypeof, customTypeof } from "custom-typeof";
import lodash from "lodash";

import { FieldType, NativeModel } from "~/types/models";

type TestItem = () => void;

interface Variables<Model> {
  model: Model;
  modelMaxLength: number;
  modelMinLength: number;
  modelLength: number;
  equalValue: any;
  testValue: any;
}

export class AssertionInitializer<Model extends Partial<NativeModel> = any> {
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
    this.tests.forEach((test) => test());

    return this;
  }

  addCommonTest() {
    this.stringEquality().typeCheck().gteCheck().lteCheck();

    return this;
  }

  stringEquality() {
    this.addIf(this.options.stringEquality, () => {
      this.tests.push(() =>
        expect(this.variables.equalValue.length).toEqual(
          this.variables.testValue.length
        )
      );
      this.tests.push(() =>
        expect(this.variables.equalValue).toEqual(this.variables.testValue)
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
      expect(this.variables.testValue.length).toEqual(
        +this.variables.modelLength
      )
    );

    return this;
  }

  typeCheck(customType?: FieldType) {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() => {
        expect(
          customTypeof[this.getCustomTypeofMethodName(customType)](
            this.variables.testValue
          )
        ).toBeTruthy();
      });
    });

    return this;
  }

  customTypeCheck(value: any, customType: FieldType) {
    this.tests.push(() =>
      expect(
        customTypeof[this.getCustomTypeofMethodName(customType)](value)
      ).toBeTruthy()
    );

    return this;
  }

  emptyCheck() {
    this.addIf(this.options.modelCheck, () => {
      if (this.variables.model.empty === false)
        this.tests.push(() =>
          expect(this.variables.testValue.length).toBeGreaterThan(0)
        );
    });

    return this;
  }

  gteCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(this.variables.testValue.length).toBeGreaterThanOrEqual(
          this.variables.modelMinLength
        )
      );
    });

    return this;
  }
  gtCheck(length: number) {
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
        expect(this.variables.testValue.length).toBeLessThanOrEqual(
          this.variables.modelMaxLength
        )
      );
    });

    return this;
  }

  numericCheck() {
    this.addIf(this.options.modelCheck, () => {
      this.tests.push(() =>
        expect(customTypeof.isNumber(+this.variables.testValue)).toBeTruthy()
      );
    });
    return this;
  }

  private getCustomTypeofMethodName(type?: FieldType) {
    return `is${lodash.upperFirst(
      type || this.variables.model.type
    )}` as keyof CustomTypeof;
  }
}

export const assertionInitializer = {
  create: <Model extends Partial<NativeModel>>() =>
    new AssertionInitializer<Model>(),
};
