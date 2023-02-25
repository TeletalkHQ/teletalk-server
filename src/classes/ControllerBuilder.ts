import { commonUtilities } from "@/classes/CommonUtilities";
import { controllerHandler } from "@/classes/ControllerHandler";

class ControllerBuilder {
  constructor(callerName) {
    this.controllerName = callerName;
  }
  #response;
  #body;

  body(callback) {
    this.#body = callback;
    return this;
  }

  response(callback) {
    this.#response = callback;
    return this;
  }

  build() {
    return controllerHandler.create({
      controllerName: this.controllerName,
      tryCallback: this.#body,
      catchCallback: commonUtilities.controllerErrorResponse,
      responseCallback:
        this.#response || commonUtilities.controllerSuccessResponse,
    });
  }
}

const controllerBuilder = {
  create: (callerName) => new ControllerBuilder(callerName),
};

export { controllerBuilder, ControllerBuilder };
