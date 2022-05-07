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
    logger.log(data);
    return request(this.baseUrl, this.routeObject, data, errorObject);
  }
}

const customRequest = new CustomRequest();

module.exports = {
  customRequest,
};
