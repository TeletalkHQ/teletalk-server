import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { ErrorKey, ErrorReason, NativeError } from "@/types";

const ERROR_IS_INVALID = {
  reason: "ERROR_IS_INVALID",
};

class ErrorBuilder {
  error: NativeError;
  constructor() {
    //@ts-ignore
    this.error = {
      side: "client",
      isAuthError: false,
    };
  }

  key(key: ErrorKey) {
    this.error.key = key;
    return this;
  }
  reason(reason: ErrorReason) {
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
    errorThrower(isUndefined, ERROR_IS_INVALID);

    return this.error;
  }
}

const errorBuilder = { create: () => new ErrorBuilder() };

export { errorBuilder };
