import { customTypeof } from "custom-typeof";
import Validator, {
  ValidationRuleObject,
  MessagesType,
} from "fastest-validator";
import { objectUtilities, errorThrower } from "utility-store";

import { NativeModel } from "@/interfaces";

import { NativeModelKey } from "@/types";

import { errors } from "@/variables/errors";

type MessageKey = keyof MessagesType;
type ValidationSchemaKey = keyof ValidationRuleObject;

const compiler = new Validator({
  useNewCustomCheckerFunction: true,
});
class ValidationModelBuilder {
  private model: NativeModel;
  private validationModel: ValidationRuleObject;

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
    this.validationModel[validationKey] = this.model[modelKey].value;
  }
  private setMessage(modelKey: NativeModelKey, messageKey: MessageKey) {
    if (this.validationModel.messages)
      this.validationModel.messages[messageKey] =
        this.model[modelKey].error?.reason || "UNKNOWN_REASON";
  }

  static compiler(validationModel: ValidationRuleObject) {
    errorThrower(
      customTypeof.isNotObject(validationModel),
      errors.VALIDATION_MODEL_IS_NOT_OBJECT
    );

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
    return objectUtilities.clarify(
      this.validationModel
    ) as ValidationRuleObject;
  }
}

const validationModelBuilder = { create: () => new ValidationModelBuilder() };

export { validationModelBuilder, ValidationModelBuilder };
