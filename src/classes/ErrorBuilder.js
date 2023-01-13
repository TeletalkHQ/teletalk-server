class ErrorBuilder {
  constructor() {
    this.error = {
      description: "Default error description",
      errorKey: "",
      message: "",
      reason: "UNKNOWN_ERROR",
      statusCode: 400,
    };
  }

  #updateProperty(key, value) {
    this.error[key] = value;
  }

  build() {
    return this.error;
  }
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
  description(description) {
    this.#updateProperty("description", description);
    return this;
  }
}

const errorBuilder = { create: () => new ErrorBuilder() };

module.exports = { errorBuilder, ErrorBuilder };
