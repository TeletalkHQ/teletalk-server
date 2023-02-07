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

class HttpRouteBuilder extends RouteBuilder {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
    this.route = {
      fullUrl: undefined,
      inputFields: {},
      method: "get",
      outputFields: [{}],
      statusCode: 200,
      url: undefined,
    };
  }

  method(method) {
    this.updateProperty("method", method);
    return this;
  }
  url(url) {
    this.updateProperty("url", url);
    this.updateProperty("fullUrl", `${this.baseUrl}${url}`);
    return this;
  }

  build() {
    const { fullUrl, statusCode, url } = this.route;
    this.checkRequirements(fullUrl, url, statusCode);
    return this.route;
  }
}

class SocketRouteBuilder extends RouteBuilder {
  constructor() {
    super();
    this.route = {
      event: "",
      inputFields: {},
      outputFields: {},
      statusCode: 200,
    };
  }

  event(name) {
    this.updateProperty("event", name);
    return this;
  }

  build() {
    const { event, statusCode } = this.route;
    this.checkRequirements(event, statusCode);
    return this.route;
  }
}

const socketRouteBuilder = () => ({
  create: () => new SocketRouteBuilder(),
});

const httpRouteBuilder = (baseUrl) => ({
  create: (...args) => new HttpRouteBuilder(baseUrl, ...args),
});

module.exports = {
  httpRouteBuilder,
  HttpRouteBuilder,
  socketRouteBuilder,
  SocketRouteBuilder,
};
