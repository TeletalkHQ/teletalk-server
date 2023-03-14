import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { NativeModelError } from "@/types";

import { localErrors } from "@/variables/errors/local";

class ErrorBuilder {
  error: NativeModelError;
  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.error = {};
  }

  key(key: string) {
    this.error.key = key;
    return this;
  }
  reason(reason: string) {
    this.error.reason = reason;
    return this;
  }
  statusCode(statusCode: number) {
    this.error.statusCode = statusCode;
    return this;
  }

  build() {
    const values = Object.values(this.error);
    const isUndefined = customTypeof.isUndefined(...values);
    errorThrower(isUndefined, localErrors.ERROR_IS_INVALID);

    return this.error;
  }
}

const errorBuilder = { create: () => new ErrorBuilder() };

export { errorBuilder, ErrorBuilder };
