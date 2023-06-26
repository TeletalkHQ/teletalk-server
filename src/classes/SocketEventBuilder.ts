import { RouteBuilder } from "~/classes/RouteBuilder";
import { IO, SocketEvent } from "~/types";
import { errors } from "~/variables";

class SocketEventBuilder<IOType extends IO> extends RouteBuilder {
  protected route: SocketEvent<IOType>;

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

  method(method: (typeof this.route)["method"]) {
    this.route.method = method;
    return this;
  }

  name(name: (typeof this.route)["name"]) {
    this.route.name = name;
    return this;
  }

  handler(handler: (typeof this.route)["handler"]) {
    this.route.handler = handler;
    return this;
  }

  build() {
    const { handler, name } = this.route;
    super.checkRequirements(errors.eventNotFound, handler, name);
    return this.route;
  }
}

const socketEventBuilder = () => ({
  create: <IOType extends IO>() => new SocketEventBuilder<IOType>(),
});

export { socketEventBuilder };
