import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { ErrorReason, NativeError } from "~/types";

class ErrorBuilder<ReasonType extends ErrorReason> {
  error: NativeError;

  constructor() {
    this.error = this.makeDefaultError();
  }

  makeDefaultError() {
    return {
      isAuthError: false,
      side: "client",
    } as NativeError;
  }

  reason(reason: ReasonType) {
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
    errorThrower(isUndefined, "ERROR_IS_INVALID");

    return this.error;
  }
}

const errorBuilder = <ReasonType extends ErrorReason = ErrorReason>() =>
  new ErrorBuilder<ReasonType>();

export { ErrorBuilder, errorBuilder };
