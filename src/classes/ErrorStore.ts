import { ErrorReason, NativeError } from "~/types";
import { errors } from "~/variables/errors";

import { modelErrorBuilder } from "./ModelErrorBuilder";

class ErrorStore {
  private errors: NativeError[] = [];

  constructor() {
    this.errors.push(...modelErrorBuilder().build(), ...errors.custom);
  }

  find(reason: ErrorReason) {
    return this.errors.find((i) => i.reason === reason)!;
  }

  getAll() {
    return this.errors;
  }
}

export const errorStore = new ErrorStore();
