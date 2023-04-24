import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { ERROR_KEY, ERROR_REASON, NativeError } from "@/types";

import { localErrors } from "@/variables/errors/local";

class ErrorBuilder {
  error: NativeError;
  constructor() {
    //@ts-ignore
    this.error = {
      side: "client",
      isAuthError: false,
    };
  }

  key(key: ERROR_KEY) {
    this.error.key = key;
    return this;
  }
  reason(reason: ERROR_REASON) {
    this.error.reason = reason;
    return this;
  }
  authError() {
    this.error.isAuthError = true;
    return this;
  }
  side(side: NativeError["side"]) {
    this.error.side = side;
    return this;
  }

  build() {
    const { description, message, ...rest } = this.error;
    const values = Object.values(rest);
    const isUndefined = values.some(
      customTypeof.isUndefined.bind(customTypeof)
    );
    errorThrower(isUndefined, localErrors.ERROR_IS_INVALID);

    return this.error;
  }
}

const errorBuilder = { create: () => new ErrorBuilder() };

export { errorBuilder };
