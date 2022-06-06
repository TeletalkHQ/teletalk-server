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

  build() {
    return this.errorObject;
  }
}

class Builder {}

const builder = new Builder();
const routeBuilder = new RouteBuilder();

const errorBuilder = new ErrorBuilder();

module.exports = {
  builder,
  Builder,
  errorBuilder,
  ErrorBuilder,
  routeBuilder,
  RouteBuilder,
};
