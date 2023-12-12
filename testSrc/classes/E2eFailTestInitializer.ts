import { IO } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { ErrorReason } from "~/types";
import { Field, FieldType, NativeModel } from "~/types/model";
import { utils as mainUtils } from "~/utils";

import { RequesterOptions } from "@/types";
import { utils } from "@/utils";

import { randomMaker } from "./RandomMaker";
import { Requester } from "./Requester";

class E2eFailTestInitializer<
  PartialNativeModel extends NativeModel,
  IOType extends IO,
> {
  constructor(
    private configuredRequester: Requester<IOType>,
    private data: IOType["input"],
    private model: PartialNativeModel,
    private fieldName: Field
  ) {}

  private getMinLength() {
    return this.model.minLength as number;
  }
  private getMaxLength() {
    return this.model.maxLength as number;
  }
  private getLength() {
    return this.model.length as number;
  }
  private dataMerger(newValue?: any) {
    return { ...this.data, [this.fieldName]: newValue };
  }
  private resolveErrorReason(modelPropName: keyof NativeModel) {
    return errorStore.find(
      mainUtils.makeModelErrorReason(this.fieldName, modelPropName)
    ).reason;
  }

  automate() {
    this.invalidType();
    this.missing();
    this.overload();

    if (this.model.empty === false) this.empty();
    if (this.model.maxLength) this.maxLength();
    if (this.model.minLength) this.minLength();
    if (this.model.length) this.length();
    if (this.model.numeric === false) this.numeric();

    if (this.fieldName === "countryName") {
      this.custom(
        randomMaker.string(this.model.maxLength!),
        "COUNTRY_NAME_NOT_SUPPORTED"
      );
    }
    if (this.fieldName === "countryCode") {
      this.custom(utils.getWrongCountryCode(), "COUNTRY_CODE_NOT_SUPPORTED");
    }
  }

  custom(value: any, errorReason: ErrorReason) {
    this.initTest(this.dataMerger(value), errorReason);
    return this;
  }
  empty() {
    this.initTest(this.dataMerger(""), this.resolveErrorReason("empty"));
    return this;
  }
  missing() {
    this.initTest(this.dataMerger(), "INPUT_FIELDS_MISSING");
    return this;
  }
  overload() {
    const overloadedData = {
      ...this.data,
      [randomMaker.string(10)]: randomMaker.string(10),
    };
    this.initTest(overloadedData, "INPUT_FIELDS_OVERLOAD", {
      shouldFilterRequestData: false,
    });
    return this;
  }
  invalidType(value?: FieldType) {
    const valueWithIncorrectType =
      value || randomMaker.number(this.getMaxLength());
    const mergedData = this.dataMerger(valueWithIncorrectType);
    this.initTest(mergedData, "INPUT_FIELD_INVALID_TYPE");
    return this;
  }
  numeric() {
    const randomValue = randomMaker.string(this.getMaxLength() - 1) + "!";
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveErrorReason("numeric"));
    return this;
  }
  minLength() {
    if (this.getMinLength() > 1) {
      const randomValue = randomMaker.string(this.getMinLength() - 1);
      const mergedData = this.dataMerger(randomValue);
      this.initTest(mergedData, this.resolveErrorReason("minLength"));
    }
    return this;
  }
  maxLength(value?: any) {
    const randomValue = value || randomMaker.string(this.getMaxLength() + 1);
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveErrorReason("maxLength"));
    return this;
  }
  length(value?: any) {
    const randomValue = value || randomMaker.string(this.getLength() + 1);
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveErrorReason("length"));
    return this;
  }

  private initTest(
    data: any,
    errorReason: ErrorReason,
    options?: Partial<RequesterOptions>
  ) {
    const title = utils.createTestMessage.e2eFailTest(
      this.configuredRequester.getEventName(),
      "event",
      errorReason
    );

    it(title, async () => {
      await this.configuredRequester.emitFull(data, errorReason, options);
    });
  }
}

export const e2eFailTestInitializer = <
  PartialNativeModel extends NativeModel,
  IOType extends IO,
>(
  configuredRequester: Requester<IOType>,
  data: any,
  model: PartialNativeModel,
  fieldName: Field
) =>
  new E2eFailTestInitializer<PartialNativeModel, IOType>(
    configuredRequester,
    data,
    model,
    fieldName
  );
