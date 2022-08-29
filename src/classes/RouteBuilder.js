class RouteBuilder {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this.routeObject = {
      description: "Default route description",
      fullUrl: "/404",
      inputFields: [{}],
      method: "GET",
      optionalFields: [{}],
      outputFields: [{}],
      statusCode: 404,
      url: "/404",
      version: "1.0.0",
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

  baseUrlObject(version, baseUrl = this._baseUrl) {
    return {
      url: baseUrl,
      version,
    };
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
  optionalFields(optionalFields = this.routeObject.optionalFields) {
    this.#addProperty("optionalFields", optionalFields);
    return this;
  }
}

const routeBuilder = (baseUrl) => ({
  create: (...args) => new RouteBuilder(baseUrl, ...args),
});

module.exports = {
  routeBuilder,
  RouteBuilder,
};
