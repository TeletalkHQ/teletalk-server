import { ErrorReason, NativeError } from "~/types";
import { errors } from "~/variables/errors";

import { modelErrorBuilder } from "./ModelErrorBuilder";

class ErrorStore {
  private errors: NativeError[] = [];

  constructor() {
    this.build();
  }

  find(reason: ErrorReason) {
    return this.errors.find((i) => i.reason === reason)!;
  }

  getAll() {
    return this.errors;
  }

  private build() {
    this.errors.push(...modelErrorBuilder().build(), ...errors.custom);

    this.errors.forEach((item) => {
      if (item.reason.startsWith("SESSION_")) {
        item.isAuthError = true;
      }
    });
  }
}

export const errorStore = new ErrorStore();
