const { request } = require("@/functions/utilities/testUtils");
const { envManager } = require("@/functions/utilities/EnvironmentManager");

class CustomRequest {
  constructor() {
    this.routeObject = {};
    this.baseUrl = {};
    this.data = {};
    this.errorObject = {};
    this.options = { token: "", filterDataCondition: true };
  }

  setRouteObject(routeObject) {
    this.routeObject = routeObject;

    return this;
  }
  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;

    return this;
  }

  sendRequest(data, errorObject, options = this.options) {
    const allOptions = {
      ...this.options,
      ...options,
    };

    logger.log("options.token", options.token);

    return request(
      this.baseUrl,
      this.routeObject,
      data,
      errorObject,
      allOptions
    );
  }

  getToken() {
    return this.options.token;
  }
  setToken(token) {
    this.setOptions({ token });
  }
  setMainTokenFromEnv() {
    const token = envManager.getTestMainToken();
    this.setOptions({ token });
  }
  setVerifyTokenFromEnv() {
    const token = envManager.getTestVerifyToken();
    this.setOptions({ token });
  }

  getOptions() {
    return this.options;
  }
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };

    return this;
  }
}

module.exports = {
  customRequest: new CustomRequest(),
  CustomRequest,
};
