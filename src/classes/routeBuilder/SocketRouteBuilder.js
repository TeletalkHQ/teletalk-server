const { RouteBuilder } = require("@/classes/routeBuilder/RouteBuilder");

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

module.exports = {
  socketRouteBuilder,
  SocketRouteBuilder,
};
