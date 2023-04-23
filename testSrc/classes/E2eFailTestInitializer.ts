import { randomMaker } from "utility-store";

import { Requester } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { RequesterOptions } from "$/types";
import { FieldType, NativeError, NativeModel } from "@/types";

import { ERRORS } from "@/variables";

class E2eFailTestInitializer {
  constructor(
    private configuredRequester: Requester,
    private data = {},
    private model: NativeModel,
    private testingPropertyName: string
  ) {}

  getminLength() {
    return this.model.minLength?.value;
  }
  getmaxLength() {
    return this.model.maxLength?.value;
  }
  getLength() {
    return this.model.length?.value;
  }
  dataMerger(newValue?: any) {
    return { ...this.data, [this.testingPropertyName]: newValue };
  }
  resolveError(key: keyof NativeModel) {
    return this.model[key].error as NativeError;
  }

  custom(value: any, error: NativeError) {
    const mergedData = this.dataMerger(value);
    this.initTest(mergedData, error);
    return this;
  }
  empty() {
    this.custom("", this.resolveError("empty"));
    return this;
  }
  missing() {
    const mergedData = this.dataMerger();
    this.initTest(mergedData, ERRORS.INPUT_FIELDS_MISSING);
    return this;
  }
  overload() {
    const overloadedData = {
      ...this.data,
      [randomMaker.string(10)]: randomMaker.string(10),
    };
    this.initTest(overloadedData, ERRORS.INPUT_FIELDS_OVERLOAD, {
      shouldFilterRequestData: false,
    });
    return this;
  }
  invalidType(value?: FieldType) {
    const valueWithIncorrectType =
      value || randomMaker.number(this.getmaxLength());
    const mergedData = this.dataMerger(valueWithIncorrectType);
    this.initTest(mergedData, ERRORS.INPUT_FIELD_INVALID_TYPE);
    return this;
  }
  numeric() {
    const randomValue = randomMaker.string(this.getmaxLength() - 1) + "!";
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("numeric"));
    return this;
  }
  minLength() {
    if (this.getminLength() > 1) {
      const randomValue = randomMaker.string(this.getminLength() - 1);
      const mergedData = this.dataMerger(randomValue);
      this.initTest(mergedData, this.resolveError("minLength"));
    }
    return this;
  }
  maxLength(value?: any) {
    const randomValue = value || randomMaker.string(this.getmaxLength() + 1);
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("maxLength"));
    return this;
  }
  length(value?: any) {
    const randomValue = value || randomMaker.string(this.getLength() + 1);
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("length"));
    return this;
  }

  initTest(data: any, error: NativeError, options?: Partial<RequesterOptions>) {
    const title = helpers.createFailTestMessage(
      error,
      this.configuredRequester.getEventName()
    );

    it(title, async () => {
      await this.configuredRequester.sendFullFeaturedRequest(
        data,
        error,
        options
      );
    });
  }
}

const e2eFailTestInitializer = {
  create: (
    configuredRequester: Requester,
    data: any,
    model: NativeModel,
    testingPropertyName: string
  ) =>
    new E2eFailTestInitializer(
      configuredRequester,
      data,
      model,
      testingPropertyName
    ),
};

export { e2eFailTestInitializer };
