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

  sendRequest(data, errorObject) {
    return request(this.baseUrl, this.routeObject, data, errorObject);
  }
}

module.exports = {
  CustomRequest: new CustomRequest(),
};
