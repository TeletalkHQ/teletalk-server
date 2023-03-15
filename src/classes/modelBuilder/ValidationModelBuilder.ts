import Validator, {
  MessagesType,
  ValidationRuleObject,
} from "fastest-validator";

import { NativeModel } from "@/types";

import { NativeModelKey } from "@/types";

type MessageKey = keyof MessagesType;
type ValidationSchemaKey = keyof ValidationRuleObject;

interface ValidationModel {
  [prop: string]: ValidationRuleObject;
}

const compiler = new Validator({
  useNewCustomCheckerFunction: true,
});

class ValidationModelBuilder {
  private model: NativeModel;
  private validationRuleObject: ValidationRuleObject;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.validationRuleObject = {};
  }

  private updateProperty(
    validationKey: ValidationSchemaKey,
    modelKey: NativeModelKey,
    messageKey: MessageKey
  ) {
    this.setValue(modelKey, validationKey);
    this.setMessage(modelKey, messageKey);
  }
  private updatePropertyWithoutMessage(
    modelKey: NativeModelKey,
    validationKey: ValidationSchemaKey
  ) {
    this.setValue(modelKey, validationKey);
  }
  private setValue(
    modelKey: NativeModelKey,
    validationKey: ValidationSchemaKey
  ) {
    this.validationRuleObject[validationKey] = this.model[modelKey].value;
  }
  private setMessage(modelKey: NativeModelKey, messageKey: MessageKey) {
    if (this.validationRuleObject.messages)
      this.validationRuleObject.messages[messageKey] =
        this.model[modelKey].error?.reason || "UNKNOWN_REASON";
  }

  static compiler(validationModel: ValidationModel) {
    return compiler.compile(validationModel);
  }

  setModel(model: NativeModel) {
    this.model = model;
    return this;
  }

  empty() {
    this.updateProperty("empty", "empty", "stringEmpty");
    return this;
  }
  length() {
    this.updateProperty("length", "length", "length");
    return this;
  }
  max() {
    this.updateProperty("max", "maxlength", "stringMax");
    return this;
  }
  min() {
    this.updateProperty("min", "minlength", "stringMin");
    return this;
  }
  numeric() {
    this.updateProperty("numeric", "numeric", "stringNumeric");
    return this;
  }
  trim() {
    this.updatePropertyWithoutMessage("trim", "trim");
    return this;
  }
  type() {
    this.updateProperty("type", "type", "string");
    return this;
  }
  unique() {
    this.updateProperty("unique", "unique", "unique");
    return this;
  }
  required() {
    this.updateProperty("required", "required", "required");
    return this;
  }

  build() {
    return this.validationRuleObject;
  }
}

const validationModelBuilder = { create: () => new ValidationModelBuilder() };

export { validationModelBuilder, ValidationModelBuilder };
