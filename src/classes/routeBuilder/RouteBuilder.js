const { customTypeof } = require("custom-typeof");
const { errorThrower } = require("utility-store/src/utilities/utilities");

const { errors } = require("@/variables/errors");

class RouteBuilder {
  constructor() {
    this.route = {
      inputFields: {},
      outputFields: [{}],
      statusCode: 200,
    };
  }

  updateProperty(key, value) {
    this.route[key] = value;
  }

  statusCode(statusCode) {
    this.updateProperty("statusCode", statusCode);
    return this;
  }
  inputFields(inputFields = this.route.inputFields) {
    this.updateProperty("inputFields", inputFields);
    return this;
  }
  outputFields(outputFields = this.route.outputFields) {
    this.updateProperty("outputFields", outputFields);
    return this;
  }

  build() {
    return this.route;
  }

  checkRequirements(...requirements) {
    errorThrower(customTypeof.isUndefined(...requirements), {
      ...errors.ROUTE_IS_BROKEN,
      route: this.route,
    });
  }
}

module.exports = {
  RouteBuilder,
};
