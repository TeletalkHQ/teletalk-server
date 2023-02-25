import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store/src/utilities/utilities";

import { localErrors } from "@/variables/errors/local";
class ErrorBuilder {
  constructor() {
    this.error = {
      errorKey: "",
      reason: "UNKNOWN_ERROR",
      statusCode: 400,
    };
  }

  #updateProperty(key, value) {
    this.error[key] = value;
  }

  errorKey(errorKey) {
    this.#updateProperty("errorKey", errorKey);
    return this;
  }
  reason(reason) {
    this.#updateProperty("reason", reason);
    return this;
  }
  statusCode(statusCode) {
    this.#updateProperty("statusCode", statusCode);
    return this;
  }

  build() {
    const values = Object.values(this.error);
    const isUndefined = customTypeof.isUndefined(...values);
    errorThrower(isUndefined, localErrors.ERROR_IS_BROKEN);

    return this.error;
  }
}

const errorBuilder = { create: () => new ErrorBuilder() };

export { errorBuilder, ErrorBuilder };
