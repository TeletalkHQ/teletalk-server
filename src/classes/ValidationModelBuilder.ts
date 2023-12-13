import Validator, { MessagesType } from "fastest-validator";

import { errorStore } from "~/classes/ErrorStore";
import { ValidationModel } from "~/types";
import { Field, NativeModelCollection, NativeModelKey } from "~/types/model";
import { utils } from "~/utils";

type ErrorMessageKey = keyof MessagesType;
type ValidationSchemaKey = keyof ValidationModel;

const compiler = new Validator({
  useNewCustomCheckerFunction: true,
});

export class ValidationModelBuilder<
  T extends Field,
  Model extends NativeModelCollection[T],
> {
  private model: Model;
  private validationRuleObject: ValidationModel;

  constructor(private fieldName: T) {
    //@ts-ignore
    this.validationRuleObject = {
      messages: {},
    };
  }

  private updateProperty(
    validationKey: ValidationSchemaKey,
    modelKey: NativeModelKey,
    errorMessageKey: ErrorMessageKey
  ) {
    this.setValue(modelKey, validationKey);
    this.setMessage(modelKey, errorMessageKey);
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
    this.validationRuleObject[validationKey] =
      this.model[modelKey as keyof Model];
  }
  private setMessage(
    modelKey: NativeModelKey,
    errorMessageKey: ErrorMessageKey
  ) {
    if (this.validationRuleObject.messages) {
      this.validationRuleObject.messages[errorMessageKey] = errorStore.find(
        utils.makeModelErrorReason(this.fieldName, modelKey)
      ).reason;
    }
  }

  static compiler(validationModel: ValidationModel) {
    return compiler.compile({
      $$root: true,
      ...validationModel,
    });
  }

  setModel(model: Model) {
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
    this.updateProperty("max", "maxLength", "stringMax");
    return this;
  }
  min() {
    this.updateProperty("min", "minLength", "stringMin");
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

export const validationModelBuilder = function <
  F extends Field,
  Model extends NativeModelCollection[F],
>(fieldName: F) {
  return new ValidationModelBuilder<F, Model>(fieldName);
};
