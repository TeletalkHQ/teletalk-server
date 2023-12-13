import { IoFields } from "check-fields";
import { customTypeof } from "custom-typeof";

import { NativeError, Route } from "~/types";

export abstract class RouteBuilder {
  protected route: Route;

  constructor() {
    //@ts-ignore
    this.route = {};
  }

  inputFields(inputFields: IoFields) {
    this.route.inputFields = inputFields;
    return this;
  }
  outputFields(outputFields: IoFields) {
    this.route.outputFields = outputFields;
    return this;
  }

  build() {
    return this.route;
  }

  checkRequirements(
    error: NativeError | { reason: string },
    ...requirements: unknown[]
  ) {
    if (customTypeof.isUndefined(...requirements))
      throw {
        ...error,
        route: this.route,
      };
  }
}
