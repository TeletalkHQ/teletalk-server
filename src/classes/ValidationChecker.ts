import lodash from "lodash";

import { helpers } from "~/helpers";
import {
  ErrorTypes,
  Field,
  NativeError,
  ValidationCheckerError,
  ValidationErrors,
  ValidationResult,
} from "~/types";
import { NativeModel } from "~/types/models";
import { utils } from "~/utils";
import { errors } from "~/variables";

class ValidationChecker {
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
    this.addErrorChecker(
      this.errorTypes.stringEmpty,
      this.resolveError("empty")
    );
    return this;
  }
  required() {
    this.addErrorChecker(
      this.errorTypes.required,
      this.resolveError("required")
    );
    return this;
  }
  string() {
    this.addErrorChecker(this.errorTypes.string, this.resolveError("type"));
    return this;
  }
  stringNumeric() {
    this.addErrorChecker(
      this.errorTypes.stringNumeric,
      this.resolveError("numeric")
    );
    return this;
  }
  stringLength() {
    this.addErrorChecker(
      this.errorTypes.stringLength,
      this.resolveError("length")
    );
    return this;
  }
  stringMin() {
    this.addErrorChecker(
      this.errorTypes.stringMin,
      this.resolveError("minLength")
    );
    return this;
  }
  stringMax() {
    this.addErrorChecker(
      this.errorTypes.stringMax,
      this.resolveError("maxLength")
    );
    return this;
  }
  throwAnyway(error: NativeError) {
    this.addErrorChecker(true, error);
    return this;
  }

  resolveError(prop: keyof NativeModel) {
    return utils.findError(errors, this.fieldName, prop);
  }

  addErrorChecker(condition: boolean, error: NativeError) {
    if (condition) this.collectedErrors.push(this.makeError(error));

    return this;
  }

  makeError(error: NativeError): ValidationCheckerError {
    return {
      ...error,
      result: this.validationResult as ValidationErrors,
      //TODO: Add this to ValidationCheckerError
      [`validated${lodash.upperFirst(this.fieldName)}`]: this.value,
    };
  }
}

const convertErrorTypesToBoolean = (errors: ValidationErrors) => {
  const validatorErrorTypes = helpers.getDefaultValidatorErrorTypes();

  errors.forEach((error) => {
    validatorErrorTypes[error.type as keyof ErrorTypes] = true;
  });

  return validatorErrorTypes;
};

const validationChecker = (
  validationResult: ValidationResult,
  fieldName: Field,
  value: unknown
) => new ValidationChecker(validationResult, fieldName, value);

export {
  type ValidationErrors,
  type ErrorTypes,
  type ValidationResult,
  validationChecker,
  ValidationChecker,
};
