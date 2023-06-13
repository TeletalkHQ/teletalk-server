import { randomMaker } from "utility-store";

import { Requester } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { RequesterOptions } from "$/types";
import { Field, FieldType, NativeError, NativeModel } from "~/types";

import { utilities } from "~/utilities";

import { errors } from "~/variables";

type Model = Partial<Pick<NativeModel, "minLength" | "maxLength" | "length">>;

class E2eFailTestInitializer<PartialNativeModel extends Model> {
  constructor(
    private configuredRequester: Requester,
    private data = {},
    private model: PartialNativeModel,
    private fieldName: Field
  ) {}

  getMinLength() {
    return this.model.minLength as number;
  }
  getMaxLength() {
    return this.model.maxLength as number;
  }
  getLength() {
    return this.model.length as number;
  }
  dataMerger(newValue?: any) {
    return { ...this.data, [this.fieldName]: newValue };
  }
  resolveError(modelPropName: keyof NativeModel) {
    return utilities.findError(errors, this.fieldName, modelPropName);
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
    this.initTest(mergedData, errors.inputFieldsMissing);
    return this;
  }
  overload() {
    const overloadedData = {
      ...this.data,
      [randomMaker.string(10)]: randomMaker.string(10),
    };
    this.initTest(overloadedData, errors.inputFieldsOverload, {
      shouldFilterRequestData: false,
    });
    return this;
  }
  invalidType(value?: FieldType) {
    const valueWithIncorrectType =
      value || randomMaker.number(this.getMaxLength());
    const mergedData = this.dataMerger(valueWithIncorrectType);
    this.initTest(mergedData, errors.inputFieldInvalidType);
    return this;
  }
  numeric() {
    const randomValue = randomMaker.string(this.getMaxLength() - 1) + "!";
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("numeric"));
    return this;
  }
  minLength() {
    if (this.getMinLength() > 1) {
      const randomValue = randomMaker.string(this.getMinLength() - 1);
      const mergedData = this.dataMerger(randomValue);
      this.initTest(mergedData, this.resolveError("minLength"));
    }
    return this;
  }
  maxLength(value?: any) {
    const randomValue = value || randomMaker.string(this.getMaxLength() + 1);
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
  create: <PartialNativeModel extends Model>(
    configuredRequester: Requester,
    data: any,
    model: PartialNativeModel,
    fieldName: Field
  ) =>
    new E2eFailTestInitializer<PartialNativeModel>(
      configuredRequester,
      data,
      model,
      fieldName
    ),
};

export { e2eFailTestInitializer };
