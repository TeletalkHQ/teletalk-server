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
  description(description) {
    this.errorObject.description = description;
    return this;
  }
}

const errorBuilder = { create: () => new ErrorBuilder() };

module.exports = { errorBuilder, ErrorBuilder };
