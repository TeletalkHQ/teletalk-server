const { socketRouteBuilder } = require("@/classes/RouteBuilder");

const builder = socketRouteBuilder();

const ping = builder.create().event("ping").build();

const otherRoutes = {
  ping,
};

module.exports = {
  otherRoutes,
};
