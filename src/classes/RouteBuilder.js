const { errors } = require("@/variables/errors");
const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

class RouteBuilder {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.routeObject = {
      description: "Default route description",
      fullUrl: undefined,
      inputFields: {},
      method: "GET",
      outputFields: [{}],
      statusCode: undefined,
      url: undefined,
      version: "1.0.0",
    };
  }

  #updateProperty(key, value) {
    this.routeObject[key] = value;
  }

  method(method) {
    this.#updateProperty("method", method);
    return this;
  }
  url(url) {
    this.#updateProperty("url", url);
    this.#updateProperty("fullUrl", `${this.baseUrl}${url}`);
    return this;
  }

  statusCode(statusCode) {
    this.#updateProperty("statusCode", statusCode);
    return this;
  }
  version(version) {
    this.#updateProperty("version", version);
    return this;
  }
  description(description) {
    this.#updateProperty("description", description);
    return this;
  }
  inputFields(inputFields = this.routeObject.inputFields) {
    this.#updateProperty("inputFields", inputFields);
    return this;
  }
  outputFields(outputFields = this.routeObject.outputFields) {
    this.#updateProperty("outputFields", outputFields);
    return this;
  }
  optionalFields(optionalFields = this.routeObject.optionalFields) {
    this.#updateProperty("optionalFields", optionalFields);
    return this;
  }

  build() {
    this.checkRequirements();
    return this.routeObject;
  }

  checkRequirements() {
    const { fullUrl, url, statusCode } = this.routeObject;

    if (customTypeof.isUndefined(fullUrl, url, statusCode)) {
      throw {
        ...errors.ROUTE_OBJECT_IS_BROKEN,
        routeObject: this.routeObject,
      };
    }
  }
}

const routeBuilder = (baseUrl) => ({
  create: (...args) => new RouteBuilder(baseUrl, ...args),
});

module.exports = {
  routeBuilder,
  RouteBuilder,
};
