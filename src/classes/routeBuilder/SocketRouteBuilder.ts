import { RouteBuilder } from "@/classes/routeBuilder/RouteBuilder";

import { EVENTS } from "@/variables/others/events";

class SocketRouteBuilder extends RouteBuilder {
  constructor() {
    super();
    this.route = {
      handler: undefined,
      inputFields: {},
      method: EVENTS.CUSTOM_ON,
      name: undefined,
      outputFields: {},
      statusCode: 200,
    };
  }

  method(method) {
    this.updateProperty("method", method);
    return this;
  }

  name(name) {
    this.updateProperty("name", name);
    return this;
  }

  handler(handler) {
    this.updateProperty("handler", handler);
    return this;
  }

  build() {
    const { handler, method, name, statusCode } = this.route;

    this.checkRequirements(handler, method, name, statusCode);
    return this.route;
  }
}

const socketRouteBuilder = () => ({
  create: () => new SocketRouteBuilder(),
});

export { socketRouteBuilder, SocketRouteBuilder };
