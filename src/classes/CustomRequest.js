const {
  request,
  getTokenByTestUserNumber,
} = require("@/functions/utilities/testUtilities");

class CustomRequest {
  constructor() {
    this.routeObject = {};
    this.baseUrl = {};
    this.data = {};
    this.errorObject = {};
    this.options = { token: "", filterDataCondition: true, testUserNumber: 0 };
  }

  getDefaultToken() {
    return getTokenByTestUserNumber(this.options.testUserNumber);
  }
  setDefaultToken() {
    const token = this.getDefaultToken();

    this.setToken(token);
  }

  setRouteObject(routeObject) {
    this.routeObject = routeObject;

    return this;
  }
  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;

    return this;
  }

  setRequestRequirements(baseUrl, routeObject, options = this.options) {
    this.setBaseUrl(baseUrl);
    this.setRouteObject(routeObject);
    this.setOptions({ ...this.options, ...options });
    if (!options.token) {
      this.setDefaultToken();
    }

    return this;
  }

  sendRequest(
    data,
    errorObject,
    options = this.options,
    baseUrl = this.baseUrl,
    routeObject = this.routeObject
  ) {
    const allOptions = {
      ...this.options,
      ...options,
    };

    return request(baseUrl, routeObject, data, errorObject, allOptions);
  }

  getToken() {
    return this.options.token;
  }
  setToken(token) {
    this.setOptions({ token });

    return this;
  }
  setMainTokenByUserObject(user) {
    this.setToken(user.tokens[0].mainToken);

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

const customRequest = { create: () => new CustomRequest() };

module.exports = {
  customRequest,
  CustomRequest,
};
