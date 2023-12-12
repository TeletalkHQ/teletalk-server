import { errorStore } from "~/classes/ErrorStore";
import {
  ErrorTypes,
  NativeError,
  ValidationCheckerError,
  ValidationErrors,
  ValidationResult,
} from "~/types";
import { Field, NativeModelKey } from "~/types/model";
import { utils } from "~/utils";

export class ValidationChecker {
  private collectedErrors: NativeError[] = [];

  private errorTypes: ErrorTypes;

  constructor(
    private validationResult: ValidationResult,
    private fieldName: Field,
    private value: unknown
  ) {}

  check() {
    if (this.validationResult === true) return;

    this.errorTypes = convertErrorTypesToBoolean(this.validationResult);

    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .stringNumeric()
      .stringLength();

    if (this.collectedErrors.length) throw this.collectedErrors;
  }

  stringEmpty() {
    this.pushError(this.errorTypes.stringEmpty, this.resolveError("empty"));
    return this;
  }
  required() {
    this.pushError(this.errorTypes.required, this.resolveError("required"));
    return this;
  }
  string() {
    this.pushError(this.errorTypes.string, this.resolveError("type"));
    return this;
  }
  stringNumeric() {
    this.pushError(this.errorTypes.stringNumeric, this.resolveError("numeric"));
    return this;
  }
  stringLength() {
    this.pushError(this.errorTypes.stringLength, this.resolveError("length"));
    return this;
  }
  stringMin() {
    this.pushError(this.errorTypes.stringMin, this.resolveError("minLength"));
    return this;
  }
  stringMax() {
    this.pushError(this.errorTypes.stringMax, this.resolveError("maxLength"));
    return this;
  }
  throwAnyway(error: NativeError) {
    this.pushError(true, error);
    return this;
  }

  resolveError(prop: NativeModelKey) {
    return errorStore.find(utils.makeModelErrorReason(this.fieldName, prop));
  }

  pushError(condition: boolean, error: NativeError) {
    if (condition) this.collectedErrors.push(this.makeError(error));

    return this;
  }

  makeError(error: NativeError): ValidationCheckerError {
    return {
      ...error,
      result: this.validationResult as ValidationErrors,
      validatedFieldName: this.fieldName,
      validatedValue: this.value,
    };
  }
}

const convertErrorTypesToBoolean = (errors: ValidationErrors) => {
  const validatorErrorTypes = utils.getDefaultValidatorErrorTypes();

  errors.forEach((error) => {
    validatorErrorTypes[error.type as keyof ErrorTypes] = true;
  });

  return validatorErrorTypes;
};

export const validationChecker = (
  validationResult: ValidationResult,
  fieldName: Field,
  value: unknown
) => new ValidationChecker(validationResult, fieldName, value);
