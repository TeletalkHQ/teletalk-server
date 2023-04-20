import { RouteBuilder } from "@/classes/routeBuilder/RouteBuilder";

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

const httpRouteBuilder = (baseUrl) => ({
  create: (...args) => new HttpRouteBuilder(baseUrl, ...args),
});

export { httpRouteBuilder, HttpRouteBuilder };
