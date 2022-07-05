const { request } = require("@/functions/utilities/testUtilities");

class CustomRequest {
  constructor(token) {
    this.routeObject = {};
    this.token = token;
    this.baseUrl = {};
    this.data = {};
    this.errorObject = {};
    this.options = { token, filterDataCondition: true };
  }

  setRouteObject(routeObject) {
    this.routeObject = routeObject;

    return this;
  }
  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
    return this;
  }

  setRequestRequirements(routeObject, options = this.options) {
    this.setRouteObject(routeObject);
    this.setOptions({ ...this.options, ...options });

    return this;
  }

  sendRequest(
    data,
    errorObject,
    options = this.options,
    routeObject = this.routeObject
  ) {
    const allOptions = {
      ...this.options,
      ...options,
    };

    return request(routeObject, data, errorObject, allOptions);
  }

  getToken() {
    return this.getOptions().token;
  }
  setToken(token) {
    this.setOptions({ token });
    return this;
  }

  getOptions() {
    return this.options;
  }
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };

    return this;
  }
}

const customRequest = (token) => {
  return { create: () => new CustomRequest(token) };
};

module.exports = {
  customRequest,
  CustomRequest,
};
