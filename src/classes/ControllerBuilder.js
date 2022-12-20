const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { controllerHandler } = require("@/classes/ControllerHandler");

class ControllerBuilder {
  constructor(callerName) {
    this.controllerName = callerName;
  }
  #response = undefined;
  #body = undefined;

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
      catchCallback: commonFunctionalities.controllerErrorResponse,
      responseCallback:
        this.#response || commonFunctionalities.controllerSuccessResponse,
    });
  }
}

const controllerBuilder = {
  create: (callerName) => new ControllerBuilder(callerName),
};

module.exports = {
  controllerBuilder,
  ControllerBuilder,
};
