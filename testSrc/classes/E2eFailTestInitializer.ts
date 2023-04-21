import { randomMaker } from "utility-store";

import { Requester } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { RequesterOptions } from "$/types";
import { FieldType, NativeError, NativeModel } from "@/types";

import { errors } from "@/variables/errors";

class E2eFailTestInitializer {
  constructor(
    private configuredRequester: Requester,
    private data = {},
    private model: NativeModel,
    private testingPropertyName: string
  ) {}

  getMinlength() {
    return this.model.minlength?.value;
  }
  getMaxlength() {
    return this.model.maxlength?.value;
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
    this.initTest(mergedData, errors.INPUT_FIELDS_MISSING);
    return this;
  }
  overload() {
    const overloadedData = {
      ...this.data,
      [randomMaker.string(10)]: randomMaker.string(10),
    };
    this.initTest(overloadedData, errors.INPUT_FIELDS_OVERLOAD, {
      shouldFilterRequestData: false,
    });
    return this;
  }
  invalidType(value?: FieldType) {
    const valueWithIncorrectType =
      value || randomMaker.number(this.getMaxlength());
    const mergedData = this.dataMerger(valueWithIncorrectType);
    this.initTest(mergedData, errors.INPUT_FIELD_INVALID_TYPE);
    return this;
  }
  numeric() {
    const randomValue = randomMaker.string(this.getMaxlength() - 1) + "!";
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("numeric"));
    return this;
  }
  minlength() {
    if (this.getMinlength() > 1) {
      const randomValue = randomMaker.string(this.getMinlength() - 1);
      const mergedData = this.dataMerger(randomValue);
      this.initTest(mergedData, this.resolveError("minlength"));
    }
    return this;
  }
  maxlength(value?: any) {
    const randomValue = value || randomMaker.string(this.getMaxlength() + 1);
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("maxlength"));
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

export { E2eFailTestInitializer, e2eFailTestInitializer };
