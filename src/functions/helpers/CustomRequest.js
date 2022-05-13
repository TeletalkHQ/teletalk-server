const { request } = require("@/functions/utilities/testUtils");

class CustomRequest {
  constructor() {
    this.routeObject = {};
    this.baseUrl = {};
    this.data = {};
    this.errorObject = {};
  }

  setRouteObject(routeObject) {
    this.routeObject = routeObject;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  sendRequest(data, errorObject, withoutTokenCondition, filterDataCondition) {
    return request(
      this.baseUrl,
      this.routeObject,
      data,
      errorObject,
      withoutTokenCondition,
      filterDataCondition
    );
  }
}

module.exports = {
  customRequest: new CustomRequest(),
  CustomRequest,
};
