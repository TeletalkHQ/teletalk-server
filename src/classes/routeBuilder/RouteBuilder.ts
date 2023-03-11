import { IoFields } from "check-fields";
import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { Route } from "@/types";

import { errors } from "@/variables/errors";

abstract class RouteBuilder {
  protected route: Route;

  constructor() {
    this.route = {
      statusCode: 200,
    };
  }

  statusCode(statusCode: number) {
    this.route.statusCode = statusCode;
    return this;
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

  checkRequirements(...requirements: unknown[]) {
    errorThrower(customTypeof.isUndefined(...requirements), {
      ...errors.ROUTE_IS_INVALID,
      route: this.route,
    });
  }
}

export { RouteBuilder };
