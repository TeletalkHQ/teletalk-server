import { ValidationError } from "fastest-validator";
import { errorThrower } from "utility-store";

import { NativeModel, NativeError, Field } from "~/types";

import { utilities } from "~/utilities";

import { errors } from "~/variables";

interface Options {
  extraErrorFields: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;
  };
}

const getDefaultValidatorErrorTypes = () => ({
  array: false,
  arrayContains: false,
  arrayEmpty: false,
  arrayEnum: false,
  arrayLength: false,
  arrayMax: false,
  arrayMin: false,
  arrayUnique: false,
  boolean: false,
  date: false,
  dateMax: false,
  dateMin: false,
  email: false,
  emailEmpty: false,
  emailMax: false,
  emailMin: false,
  enumValue: false,
  equalField: false,
  equalValue: false,
  forbidden: false,
  function: false,
  luhn: false,
  mac: false,
  number: false,
  numberEqual: false,
  numberInteger: false,
  numberMax: false,
  numberMin: false,
  numberNegative: false,
  numberNotEqual: false,
  numberPositive: false,
  object: false,
  objectMaxProps: false,
  objectMinProps: false,
  objectStrict: false,
  required: false,
  string: false,
  stringAlpha: false,
  stringAlphadash: false,
  stringAlphanum: false,
  stringBase64: false,
  stringContains: false,
  stringEmpty: false,
  stringEnum: false,
  stringHex: false,
  stringLength: false,
  stringMax: false,
  stringMin: false,
  stringNumeric: false,
  stringPattern: false,
  stringSingleLine: false,
  tuple: false,
  tupleEmpty: false,
  tupleLength: false,
  url: false,
  uuid: false,
  uuidVersion: false,
});

const ERROR_TYPES = getDefaultValidatorErrorTypes();
type ErrorTypes = typeof ERROR_TYPES;
type ValidationErrors = ValidationError[];
type ValidationResult = true | ValidationErrors;

class ValidationChecker {
  private errorCheckers: {
    condition: boolean;
    error: NativeError;
  }[] = [];

  private errorTypes: ErrorTypes;

  constructor(
    private validationResult: ValidationResult,
    private fieldName: Field,
    public options: Partial<Options>
  ) {}

  getOptions() {
    return this.options;
  }
  setOptions(newOptions: Partial<Options> = this.getOptions()) {
    const oldOptions = this.getOptions();
    this.options = {
      ...oldOptions,
      ...newOptions,
    };
    return this;
  }

  addExtraErrorFields(fields = {}) {
    this.setOptions({
      extraErrorFields: {
        ...this.getOptions().extraErrorFields,
        ...fields,
      },
    });

    return this;
  }

  check(cb: (this: ValidationChecker) => void) {
    if (this.validationResult === true) return;

    this.errorTypes = convertErrorTypesToBoolean(this.validationResult);
    cb.call(this);
    this.execute();
  }

  stringEmpty(error = this.resolveError("empty")) {
    this.addErrorChecker(this.errorTypes.stringEmpty, error);
    return this;
  }
  required(error = this.resolveError("required")) {
    this.addErrorChecker(this.errorTypes.required, error);
    return this;
  }
  string(error = this.resolveError("type")) {
    this.addErrorChecker(this.errorTypes.string, error);
    return this;
  }
  stringNumeric(error = this.resolveError("numeric")) {
    this.addErrorChecker(this.errorTypes.stringNumeric, error);
    return this;
  }
  stringLength(error = this.resolveError("length")) {
    this.addErrorChecker(this.errorTypes.stringLength, error);
    return this;
  }
  stringMin(error = this.resolveError("minLength")) {
    this.addErrorChecker(this.errorTypes.stringMin, error);
    return this;
  }
  stringMax(error = this.resolveError("maxLength")) {
    this.addErrorChecker(this.errorTypes.stringMax, error);
    return this;
  }
  throwAnyway(error: NativeError) {
    this.addErrorChecker(true, error);
    return this;
  }

  resolveError(prop: keyof NativeModel) {
    return utilities.findError(errors, this.fieldName, prop);
  }

  addErrorChecker(condition: boolean, error: NativeError) {
    this.errorCheckers.push({
      condition,
      error,
    });

    return this;
  }

  execute() {
    for (const item of this.errorCheckers) {
      const { condition, error } = item;
      errorThrower(condition, () => this.makeError(error));
    }
  }

  makeError(error: object) {
    return {
      ...error,
      result: this.validationResult,
      ...this.getOptions().extraErrorFields,
    };
  }
}

const convertErrorTypesToBoolean = (errors: ValidationErrors) => {
  const validatorErrorTypes = getDefaultValidatorErrorTypes();

  errors.forEach((error) => {
    validatorErrorTypes[error.type as keyof ErrorTypes] = true;
  });

  return validatorErrorTypes;
};

const validationChecker = (
  validationResult: ValidationResult,
  fieldName: Field,
  options: Partial<Options>
) => new ValidationChecker(validationResult, fieldName, options);

export {
  type ValidationErrors,
  type ErrorTypes,
  type Options,
  type ValidationResult,
  validationChecker,
  ValidationChecker,
};
