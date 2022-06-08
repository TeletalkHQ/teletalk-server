const { modelPropertyGenerator } = require("@/functions/utilities/generators");
const { objectClarify } = require("@/functions/utilities/objectClarify");
const { customTypeof } = require("../utilities/utils");

class RouteBuilder {
  constructor() {
    this.defaultRouteObject = {
      method: "GET",
      url: "/404",
      statusCode: 404,
      version: "1.0.0",
      description: "Default route description",
      inputFields: [{}],
      outputFields: [{}],
    };

    this.routeObject = { ...this.defaultRouteObject };
  }

  create() {
    this.routeObject = {};

    return this;
  }

  build() {
    return this.routeObject;
  }

  addProperty(key, value) {
    this.routeObject[key] = value;
  }

  method(method) {
    this.addProperty("method", method);

    return this;
  }

  url(url) {
    this.addProperty("url", url);

    return this;
  }

  statusCode(statusCode) {
    this.addProperty("statusCode", statusCode);

    return this;
  }

  version(version) {
    this.addProperty("version", version);

    return this;
  }

  description(description) {
    this.addProperty("description", description);

    return this;
  }

  inputFields(inputFields) {
    this.addProperty("inputFields", inputFields);

    return this;
  }

  outputFields(outputFields) {
    this.addProperty("outputFields", outputFields);

    return this;
  }
}

class ErrorBuilder {
  constructor() {
    this.defaultErrorObject = {
      description: "Default route description",
      message: "",
      reason: "UNKNOWN_ERROR",
      statusCode: 400,
      version: "1.0.0",
      errorKey: "",
      errorCode: 4000,
    };
    this.errorObject = { ...this.defaultErrorObject };
  }

  create() {
    this.errorObject = {};

    return this;
  }

  build() {
    return this.errorObject;
  }

  addProperty(key, value) {
    this.errorObject[key] = value;
  }

  errorCode(errorCode) {
    this.addProperty("errorCode", errorCode);

    return this;
  }

  statusCode(statusCode) {
    this.addProperty("statusCode", statusCode);

    return this;
  }

  message(message) {
    this.addProperty("message", message);

    return this;
  }

  errorReason(errorReason) {
    this.addProperty("reason", errorReason);

    return this;
  }

  errorKey(errorKey) {
    this.addProperty("errorKey", errorKey);

    return this;
  }

  version(version) {
    this.errorObject.version = version;

    return this;
  }
}

class ModelBuilder {
  constructor() {
    this.modelObject = this.setDefaultModelObject();
  }

  create() {
    this.modelObject = this.setDefaultModelObject();

    return this;
  }

  addProperty(key, value, error) {
    this.modelObject[key].value = value;

    if (error) this.modelObject[key].error = error;
  }

  setDefaultModelObject() {
    return {
      defaultValue: modelPropertyGenerator("", {}),
      empty: modelPropertyGenerator(false, {}),
      lowercase: modelPropertyGenerator("", {}),
      length: modelPropertyGenerator("", {}),
      maxlength: modelPropertyGenerator(0, {}),
      minlength: modelPropertyGenerator(0, {}),
      numeric: modelPropertyGenerator(false, {}),
      required: modelPropertyGenerator(false, {}),
      trim: modelPropertyGenerator(false, {}),
      type: modelPropertyGenerator("", {}),
      unique: modelPropertyGenerator("", {}),
      version: modelPropertyGenerator("", {}),
    };
  }

  build() {
    return this.modelObject;
  }

  maxlength(value, error) {
    this.addProperty("maxlength", value, error);

    return this;
  }

  minlength(value, error) {
    this.addProperty("minlength", value, error);

    return this;
  }

  numeric(value, error) {
    this.addProperty("numeric", value, error);

    return this;
  }

  type(value, error) {
    this.addProperty("type", value, error);

    return this;
  }

  empty(value, error) {
    this.addProperty("empty", value, error);

    return this;
  }

  version(value) {
    this.modelObject.version = value;

    return this;
  }

  required(value, error = {}) {
    this.addProperty("required", value, error);

    return this;
  }

  trim(value, error) {
    this.addProperty("trim", value, error);

    return this;
  }

  unique(value, error) {
    this.addProperty("unique", value, error);

    return this;
  }

  defaultValue(value, error) {
    this.addProperty("defaultValue", value, error);

    return this;
  }

  lowercase(value, error) {
    this.addProperty("lowercase", value, error);

    return this;
  }

  length(value, error) {
    this.addProperty("length", value, error);

    return this;
  }
}

class ValidationModelBuilder {
  constructor() {
    this.validationModelObject = this.setDefaultValidationModelObject();
    this.modelObject = {};
  }
  create() {
    this.validationModelObject = this.setDefaultValidationModelObject();
    this.modelObject = {};

    return this;
  }

  build() {
    return objectClarify(this.validationModelObject);
  }

  setModelObject(modelObject) {
    this.modelObject = modelObject;

    return this;
  }

  _addProperty(validationKey, modelKey, messageKey) {
    this._setValue(validationKey, modelKey);
    this._setMessage(modelKey, messageKey);
  }
  _addPropertyWithoutMessage(validationKey, modelKey) {
    this._setValue(validationKey, modelKey);
  }
  _setValue(validationKey, modelKey) {
    this.validationModelObject[validationKey] =
      this.modelObject[modelKey].value;
  }
  _setMessage(modelKey, messageKey) {
    this.validationModelObject.messages[messageKey] =
      this.modelObject[modelKey].error.message;
  }

  empty() {
    this._addProperty("empty", "empty", "stringEmpty");

    return this;
  }

  length() {
    this._addProperty("length", "length", "length");

    return this;
  }

  max() {
    this._addProperty("max", "maxlength", "stringMax");

    return this;
  }

  min() {
    this._addProperty("min", "minlength", "stringMin");

    return this;
  }

  numeric() {
    this._addProperty("numeric", "numeric", "stringNumeric");

    return this;
  }

  trim() {
    this._addPropertyWithoutMessage("trim", "trim");

    return this;
  }

  type() {
    this._addProperty("type", "type", "string");

    return this;
  }

  unique() {
    this._addProperty("unique", "unique", "unique");

    return this;
  }

  required() {
    this._addProperty("required", "required", "required");

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

  setDefaultValidationModelObject() {
    return {
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
  }
}

class MongoModelBuilder {
  constructor() {
    this.modelObject = {};
    this.mongoModel = this.setDefaultMongoModel();
  }

  create() {
    this.mongoModel = this.setDefaultMongoModel();
    this.modelObject = {};

    return this;
  }

  build() {
    const finalMongoModel = {};

    Object.keys(this.mongoModel)
      .map((key) => {
        if (this.mongoModel[key].length > 0)
          return { key, value: this.mongoModel[key] };
        return undefined;
      })
      .forEach((item) => {
        if (!item) return;

        const { key, value } = item;
        finalMongoModel[key] = value.length > 1 ? value : value[0];
      });

    return finalMongoModel;
  }

  setDefaultMongoModel() {
    return {
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

  setModelObject(modelObject) {
    this.modelObject = modelObject;

    return this;
  }

  addProperty(name, addMessageCondition) {
    this.mongoModel[name].push(this.modelObject[name].value);

    const errorMessage = this.modelObject[name].error?.message;

    if (
      !customTypeof(errorMessage).type.undefined &&
      addMessageCondition === true
    )
      this.mongoModel[name].push(errorMessage);
  }

  defaultValue() {
    this.addProperty("defaultValue");

    return this;
  }
  lowercase() {
    this.addProperty("lowercase");

    return this;
  }
  maxlength() {
    this.addProperty("maxlength");

    return this;
  }
  minlength() {
    this.addProperty("minlength");

    return this;
  }
  required() {
    this.addProperty("required");

    return this;
  }
  trim(addMessageCondition = false) {
    this.addProperty("trim", addMessageCondition);

    return this;
  }
  type(addMessageCondition = false) {
    this.addProperty("type", addMessageCondition);

    return this;
  }
  unique() {
    this.addProperty("unique");

    return this;
  }
}

class Builder {}

const builder = new Builder();
const routeBuilder = new RouteBuilder();
const errorBuilder = new ErrorBuilder();
const modelBuilder = new ModelBuilder();
const validationModelBuilder = new ValidationModelBuilder();
const mongoModelBuilder = new MongoModelBuilder();

module.exports = {
  builder,
  Builder,
  errorBuilder,
  ErrorBuilder,
  modelBuilder,
  ModelBuilder,
  routeBuilder,
  RouteBuilder,
  validationModelBuilder,
  ValidationModelBuilder,
  mongoModelBuilder,
};
