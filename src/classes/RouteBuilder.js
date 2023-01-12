const { errors } = require("@/variables/errors");
const { customTypeof } = require("custom-typeof");
const { errorThrower } = require("utility-store/src/utilities/utilities");

class RouteBuilder {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.route = {
      description: "Default route description",
      fullUrl: undefined,
      inputFields: {},
      method: "get",
      outputFields: [{}],
      statusCode: undefined,
      url: undefined,
    };
  }

  #updateProperty(key, value) {
    this.route[key] = value;
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
  description(description) {
    this.#updateProperty("description", description);
    return this;
  }
  inputFields(inputFields = this.route.inputFields) {
    this.#updateProperty("inputFields", inputFields);
    return this;
  }
  outputFields(outputFields = this.route.outputFields) {
    this.#updateProperty("outputFields", outputFields);
    return this;
  }

  build() {
    this.checkRequirements();
    return this.route;
  }

  checkRequirements() {
    const { fullUrl, url, statusCode } = this.route;

    errorThrower(customTypeof.isUndefined(fullUrl, url, statusCode), {
      ...errors.ROUTE_OBJECT_IS_BROKEN,
      route: this.route,
    });
  }
}

const routeBuilder = (baseUrl) => ({
  create: (...args) => new RouteBuilder(baseUrl, ...args),
});

module.exports = {
  routeBuilder,
  RouteBuilder,
};
