import { RouteBuilder } from "@/classes/routeBuilder/RouteBuilder";

import { SocketRoute, SocketMethods } from "@/interfaces";

class SocketRouteBuilder extends RouteBuilder {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  protected route: SocketRoute;

  constructor() {
    super();
  }

  method(method: SocketMethods) {
    this.route.method = method;
    return this;
  }

  name(name: string) {
    this.route.name = name;
    return this;
  }

  handler(handler: () => void) {
    this.route.handler = handler;
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
