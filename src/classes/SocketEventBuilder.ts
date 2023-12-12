import { IO } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { RouteBuilder } from "~/classes/RouteBuilder";
import { SocketEvent } from "~/types";

export class SocketEventBuilder<IOType extends IO> extends RouteBuilder {
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
    super.checkRequirements(errorStore.find("EVENT_NOT_FOUND"), handler, name);
    return this.route;
  }
}

export const socketEventBuilder = () => ({
  create: <IOType extends IO>() => new SocketEventBuilder<IOType>(),
});
