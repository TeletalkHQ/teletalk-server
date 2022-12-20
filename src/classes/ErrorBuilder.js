class ErrorBuilder {
  constructor() {
    this.errorObject = {
      description: "Default route description",
      message: "",
      reason: "UNKNOWN_ERROR",
      statusCode: 400,
      version: "1.0.0",
      errorKey: "",
    };
  }

  #updateProperty(key, value) {
    this.errorObject[key] = value;
  }

  build() {
    return this.errorObject;
  }
  // errorCode(errorCode) {
  //   this.#updateProperty("errorCode", errorCode);
  //   return this;
  // }
  statusCode(statusCode) {
    this.#updateProperty("statusCode", statusCode);
    return this;
  }
  message(message) {
    this.#updateProperty("message", message);
    return this;
  }
  reason(reason) {
    this.#updateProperty("reason", reason);
    return this;
  }
  errorKey(errorKey) {
    this.#updateProperty("errorKey", errorKey);
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
}

const errorBuilder = { create: () => new ErrorBuilder() };

module.exports = { errorBuilder, ErrorBuilder };
