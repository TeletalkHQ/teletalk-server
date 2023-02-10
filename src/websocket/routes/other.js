const { socketRouteBuilder } = require("@/classes/RouteBuilder");

const builder = socketRouteBuilder();

const disconnect = builder.create().event("disconnect").build();

const ping = builder.create().event("ping").build();

const otherRoutes = {
  disconnect,
  ping,
};

module.exports = {
  otherRoutes,
};