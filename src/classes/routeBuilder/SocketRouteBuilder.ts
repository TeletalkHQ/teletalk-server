import { RouteBuilder } from "@/classes/routeBuilder/RouteBuilder";

import { SocketRoute } from "@/types";

class SocketRouteBuilder extends RouteBuilder {
  protected route: SocketRoute;

  constructor() {
    super();

    // @ts-ignore
    this.route = {
      method: "customOn",
      inputFields: {},
      outputFields: {},
      isAuthRequired: true,
    };
  }

  noAuth() {
    this.route.isAuthRequired = false;
    return this;
  }

  method(method: SocketRoute["method"]) {
    this.route.method = method;
    return this;
  }

  name(name: SocketRoute["name"]) {
    this.route.name = name;
    return this;
  }

  handler(handler: SocketRoute["handler"]) {
    this.route.handler = handler;
    return this;
  }

  build() {
    const { handler, name } = this.route;
    this.checkRequirements(handler, name);
    return this.route;
  }
}

const socketRouteBuilder = () => ({
  create: () => new SocketRouteBuilder(),
});

export { socketRouteBuilder };
