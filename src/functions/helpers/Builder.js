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

class Builder {}

const builder = new Builder();
const routeBuilder = new RouteBuilder();

module.exports = {
  builder,
  Builder,
  routeBuilder,
  RouteBuilder,
};
