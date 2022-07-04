const { customTypeof } = require("@/classes/CustomTypeof");

const {
  errorThrower,
  getErrorObject,
  getValidatorErrorTypes,
  objectClarify,
} = require("@/functions/utilities/utils");

class RouteBuilder {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this.baseUrlObject = { url: "", version: "1.0.0" };
    this.routeObject = {
      method: "GET",
      url: "/404",
      statusCode: 404,
      version: "1.0.0",
      description: "Default route description",
      inputFields: [{}],
      outputFields: [{}],
    };
  }

  #addProperty(key, value) {
    this.routeObject[key] = value;
  }
  #reset() {
    this.routeObject = {};
  }

  build() {
    const routeObject = this.routeObject;

    this.#reset();

    return routeObject;
  }
  buildBaseUrl() {
    const baseUrlObject = this.baseUrlObject;

    this.baseUrlObject = {};

    return baseUrlObject;
  }

  method(method) {
    this.#addProperty("method", method);
    return this;
  }
  url(url) {
    this.#addProperty("url", url);
    this.#addProperty("fullUrl", `${this._baseUrl}${url}`);
    return this;
  }
  baseUrl() {
    this.baseUrlObject.url = this._baseUrl;

    return this;
  }
  baseUrlVersion(version) {
    this.baseUrlObject.version = version;

    return this;
  }

  statusCode(statusCode) {
    this.#addProperty("statusCode", statusCode);
    return this;
  }
  version(version) {
    this.#addProperty("version", version);
    return this;
  }
  description(description) {
    this.#addProperty("description", description);
    return this;
  }
  inputFields(inputFields = this.routeObject.inputFields) {
    this.#addProperty("inputFields", inputFields);
    return this;
  }
  outputFields(outputFields = this.routeObject.outputFields) {
    this.#addProperty("outputFields", outputFields);
    return this;
  }
}

class ErrorBuilder {
  constructor() {
    this.errorObject = {
      description: "Default route description",
      message: "",
      reason: "UNKNOWN_ERROR",
      statusCode: 400,
      version: "1.0.0",
      errorKey: "",
      errorCode: 4000,
    };
  }

  #addProperty(key, value) {
    this.errorObject[key] = value;
  }

  build() {
    return this.errorObject;
  }
  errorCode(errorCode) {
    this.#addProperty("errorCode", errorCode);
    return this;
  }
  statusCode(statusCode) {
    this.#addProperty("statusCode", statusCode);
    return this;
  }
  message(message) {
    this.#addProperty("message", message);
    return this;
  }
  errorReason(errorReason) {
    this.#addProperty("reason", errorReason);
    return this;
  }
  errorKey(errorKey) {
    this.#addProperty("errorKey", errorKey);
    return this;
  }
  version(version) {
    this.errorObject.version = version;
    return this;
  }
}

class ModelBuilder {
  constructor() {
    this.modelObject = {
      defaultValue: this.#initialValueAndError("", {}),
      empty: this.#initialValueAndError(false, {}),
      lowercase: this.#initialValueAndError("", {}),
      length: this.#initialValueAndError("", {}),
      maxlength: this.#initialValueAndError(0, {}),
      minlength: this.#initialValueAndError(0, {}),
      numeric: this.#initialValueAndError(false, {}),
      required: this.#initialValueAndError(false, {}),
      trim: this.#initialValueAndError(false, {}),
      type: this.#initialValueAndError("", {}),
      unique: this.#initialValueAndError("", {}),
      version: this.#initialValueAndError("", {}),
    };
  }

  #addProperty(key, value, error) {
    this.modelObject[key].value = value;
    if (error) this.modelObject[key].error = error;
  }

  #initialValueAndError() {
    return {
      value: null,
      error: {
        value: null,
        error: {
          code: 0,
          errorKey: "",
          message: "",
          reason: "",
          version: "",
        },
      },
    };
  }

  build() {
    for (const key in this.modelObject) {
      if (key === "version") continue;

      const { value } = this.modelObject[key];
      const valueType = customTypeof.check(value).type;
      if (valueType.null || valueType.undefined) {
        delete this.modelObject[key];
      }
    }

    return this.modelObject;
  }
  maxlength(value, error) {
    this.#addProperty("maxlength", value, error);
    return this;
  }
  minlength(value, error) {
    this.#addProperty("minlength", value, error);
    return this;
  }
  numeric(value, error) {
    this.#addProperty("numeric", value, error);
    return this;
  }
  type(value, error) {
    this.#addProperty("type", value, error);
    return this;
  }
  empty(value, error) {
    this.#addProperty("empty", value, error);
    return this;
  }
  version(value) {
    this.modelObject.version = value;
    return this;
  }
  required(value, error = {}) {
    this.#addProperty("required", value, error);
    return this;
  }
  trim(value, error) {
    this.#addProperty("trim", value, error);
    return this;
  }
  unique(value, error) {
    this.#addProperty("unique", value, error);
    return this;
  }
  defaultValue(value, error) {
    this.#addProperty("defaultValue", value, error);
    return this;
  }
  lowercase(value, error) {
    this.#addProperty("lowercase", value, error);
    return this;
  }
  length(value, error) {
    this.#addProperty("length", value, error);
    return this;
  }
}

class ValidationModelBuilder {
  constructor() {
    this.validationModelObject = {
      empty: undefined,
      max: undefined,
      min: undefined,
      optional: undefined,
      trim: undefined,
      type: undefined,
      unique: undefined,
      numeric: undefined,
      required: undefined,
      messages: {
        required: undefined,
        string: undefined,
        stringEmpty: undefined,
        stringMax: undefined,
        stringMin: undefined,
        stringNumeric: undefined,
      },
    };
    this.modelObject = {};
  }

  #addProperty(validationKey, modelKey, messageKey) {
    this.#setValue(validationKey, modelKey);
    this.#setMessage(modelKey, messageKey);
  }
  #addPropertyWithoutMessage(validationKey, modelKey) {
    this.#setValue(validationKey, modelKey);
  }
  #setValue(validationKey, modelKey) {
    this.validationModelObject[validationKey] =
      this.modelObject[modelKey].value;
  }
  #setMessage(modelKey, messageKey) {
    this.validationModelObject.messages[messageKey] =
      this.modelObject[modelKey].error.message;
  }

  build() {
    return objectClarify(this.validationModelObject);
  }
  setModelObject(modelObject) {
    this.modelObject = modelObject;
    return this;
  }
  empty() {
    this.#addProperty("empty", "empty", "stringEmpty");
    return this;
  }
  length() {
    this.#addProperty("length", "length", "length");
    return this;
  }
  max() {
    this.#addProperty("max", "maxlength", "stringMax");
    return this;
  }
  min() {
    this.#addProperty("min", "minlength", "stringMin");
    return this;
  }
  numeric() {
    this.#addProperty("numeric", "numeric", "stringNumeric");
    return this;
  }
  trim() {
    this.#addPropertyWithoutMessage("trim", "trim");
    return this;
  }
  type() {
    this.#addProperty("type", "type", "string");
    return this;
  }
  unique() {
    this.#addProperty("unique", "unique", "unique");
    return this;
  }
  required() {
    this.#addProperty("required", "required", "required");
    return this;
  }
  //CLEANME ValidationModelBuilder optional method
  optional() {
    this.validationModelObject.optional = !this.modelObject.required.value;
    return this;
  }
  //CLEANME ValidationModelBuilder lowercase method
  lowercase() {
    this.validationModelObject.lowercase = !this.modelObject.lowercase.value;
    return this;
  }
}

class ValidationErrorBuilder {
  constructor() {
    this.validationResult = [];
    this.callbackErrors = [];
    this.options = {
      autoErrorDetection: true,
      extraErrorFields: {},
    };
    this.validationResultErrorKeys = getValidatorErrorTypes([]);
    this.makeErrorObject = (errorObject) => {
      return getErrorObject(errorObject, {
        validationResult: this.validationResult,
        ...this.options.extraErrorFields,
      });
    };
  }

  #setOptions(options = this.options) {
    this.options = {
      ...this.options,
      ...options,
    };
    return this;
  }
  #setValidationResult(result) {
    this.validationResult = result;
    return this;
  }
  #setValidationErrorKeys(result) {
    this.validationResultErrorKeys = getValidatorErrorTypes(result);
    return this;
  }

  addError(condition, errorObject) {
    this.callbackErrors.push({ condition, errorObject });
    return this;
  }
  setRequirements(result, options = this.options) {
    this.#setValidationResult(result);
    if (customTypeof.check(result).type.array)
      this.#setValidationErrorKeys(result);
    this.#setOptions(options);

    return this;
  }
  execute() {
    for (const error of this.callbackErrors) {
      const { condition, errorObject } = error;

      errorThrower(condition, () => this.makeErrorObject(errorObject));
    }
  }
  addExtraErrorFields(fields = {}) {
    this.#setOptions({
      extraErrorFields: {
        ...this.options.extraErrorFields,
        ...fields,
      },
    });

    return this;
  }
  customCheck(condition, cb) {
    if (condition) cb();
    return this;
  }
  stringEmpty(errorObject) {
    this.addError(this.validationResultErrorKeys.stringEmpty, errorObject);
    return this;
  }
  required(errorObject) {
    this.addError(this.validationResultErrorKeys.required, errorObject);
    return this;
  }
  string(errorObject) {
    this.addError(this.validationResultErrorKeys.string, errorObject);
    return this;
  }
  stringNumeric(errorObject) {
    this.addError(this.validationResultErrorKeys.stringNumeric, errorObject);
    return this;
  }
  stringLength(errorObject) {
    this.addError(this.validationResultErrorKeys.stringLength, errorObject);
    return this;
  }
  stringMin(errorObject) {
    this.addError(this.validationResultErrorKeys.stringMin, errorObject);
    return this;
  }
  stringMax(errorObject) {
    this.addError(this.validationResultErrorKeys.stringMax, errorObject);
    return this;
  }
  throwAnyway(errorObject) {
    this.addError(this.validationResult !== true, errorObject);
    return this;
  }
}

class MongoModelBuilder {
  constructor() {
    this.modelObject = {};

    this.mongoModel = {
      defaultValue: [],
      lowercase: [],
      maxlength: [],
      minlength: [],
      required: [],
      trim: [],
      type: [],
      unique: [],
    };
  }

  #addProperty(name) {
    this.#setProperty(name);
    this.#setMessage(name);
  }
  #addPropertyWithoutMessage(name) {
    this.#setProperty(name);
  }
  #setProperty(key) {
    this.mongoModel[key].push(this.modelObject[key].value);
  }
  #setMessage(key) {
    this.mongoModel[key].push(this.modelObject[key].error?.message);
  }

  build() {
    const finalMongoModel = {};
    Object.keys(this.mongoModel).forEach((key) => {
      if (this.mongoModel[key].length > 0) {
        const value = this.mongoModel[key];
        finalMongoModel[key] = value.length > 1 ? value : value[0];
      }
    });

    return finalMongoModel;
  }
  setModelObject(modelObject) {
    this.modelObject = modelObject;
    return this;
  }
  defaultValue() {
    this.#addProperty("defaultValue");
    return this;
  }
  lowercase() {
    this.#addProperty("lowercase");
    return this;
  }
  maxlength() {
    this.#addProperty("maxlength");
    return this;
  }
  minlength() {
    this.#addProperty("minlength");
    return this;
  }
  required() {
    this.#addProperty("required");
    return this;
  }
  trim() {
    this.#addPropertyWithoutMessage("trim");
    return this;
  }
  type() {
    this.#addPropertyWithoutMessage("type");
    return this;
  }
  unique() {
    this.#addProperty("unique");
    return this;
  }
}

const errorBuilder = { create: () => new ErrorBuilder() };
const modelBuilder = { create: () => new ModelBuilder() };
const mongoModelBuilder = { create: () => new MongoModelBuilder() };
const routeBuilder = (baseUrl) => ({
  create: (...args) => new RouteBuilder(baseUrl, ...args),
});
const validationErrorBuilder = { create: () => new ValidationErrorBuilder() };
const validationModelBuilder = { create: () => new ValidationModelBuilder() };

module.exports = {
  errorBuilder,
  ErrorBuilder,
  modelBuilder,
  ModelBuilder,
  mongoModelBuilder,
  routeBuilder,
  RouteBuilder,
  validationErrorBuilder,
  ValidationErrorBuilder,
  validationModelBuilder,
  ValidationModelBuilder,
};
