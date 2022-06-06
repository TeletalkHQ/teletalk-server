const { modelPropertyGenerator } = require("../utilities/generators");

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

  method(method) {
    this.routeObject.method = method;

    return this;
  }

  url(url) {
    this.routeObject.url = url;

    return this;
  }

  statusCode(statusCode) {
    this.routeObject.statusCode = statusCode;

    return this;
  }

  version(version) {
    this.routeObject.version = version;

    return this;
  }

  description(description) {
    this.routeObject.description = description;

    return this;
  }

  inputFields(inputFields) {
    this.routeObject.inputFields = inputFields;

    return this;
  }

  outputFields(outputFields) {
    this.routeObject.outputFields = outputFields;

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

  errorCode(errorCode) {
    this.errorObject.description = errorCode;

    return this;
  }

  statusCode(statusCode) {
    this.errorObject.statusCode = statusCode;

    return this;
  }

  message(message) {
    this.errorObject.message = message;

    return this;
  }

  errorReason(errorReason) {
    this.errorObject.reason = errorReason;

    return this;
  }

  version(version) {
    this.errorObject.version = version;

    return this;
  }

  errorKey(errorKey) {
    this.errorObject.errorKey = errorKey;

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
    this.modelObject.maxlength.value = value;
    this.modelObject.maxlength.error = error;

    return this;
  }

  minlength(value, error) {
    this.modelObject.minlength.value = value;
    this.modelObject.minlength.error = error;

    return this;
  }

  numeric(value, error) {
    this.modelObject.numeric.value = value;
    this.modelObject.numeric.error = error;

    return this;
  }

  type(value, error) {
    this.modelObject.type.value = value;
    this.modelObject.type.error = error;
    return this;
  }

  empty(value, error) {
    this.modelObject.empty.value = value;
    this.modelObject.empty.error = error;
    return this;
  }

  version(value) {
    this.modelObject.version = value;
    return this;
  }

  required(value, error = {}) {
    this.modelObject.required.value = value;
    this.modelObject.required.error = error;
    return this;
  }

  trim(value, error) {
    this.modelObject.trim.value = value;
    this.modelObject.trim.error = error;
    return this;
  }

  unique(value, error) {
    this.modelObject.unique.value = value;
    this.modelObject.unique.error = error;
    return this;
  }

  defaultValue(value, error) {
    this.modelObject.defaultValue.value = value;
    this.modelObject.defaultValue.error = error;
    return this;
  }

  lowercase(value, error) {
    this.modelObject.lowercase.value = value;
    this.modelObject.lowercase.error = error;
    return this;
  }

  length(value, error) {
    this.modelObject.length.value = value;
    this.modelObject.length.error = error;
    return this;
  }
}

class Builder {}

const builder = new Builder();
const routeBuilder = new RouteBuilder();
const errorBuilder = new ErrorBuilder();
const modelBuilder = new ModelBuilder();

module.exports = {
  builder,
  Builder,
  errorBuilder,
  ErrorBuilder,
  modelBuilder,
  ModelBuilder,
  routeBuilder,
  RouteBuilder,
};
