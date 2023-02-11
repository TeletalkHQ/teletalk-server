const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const { METHODS } = require("@/variables/others/methods");

const { otherHandlers } = require("@/websocket/events/other/handlers");

const builder = socketRouteBuilder();

// const disconnect = builder
//   .create()
//   .name("disconnect")
//   .handler(otherHandlers.disconnect)
//   .build();

const logEvent = builder
  .create()
  .name("")
  .method(METHODS.ON_ANY)
  .handler(otherHandlers.logEvent)
  .build();

const ping = builder.create().name("ping").handler(otherHandlers.ping).build();

const otherRoutes = {
  logEvent,
  // disconnect,
  ping,
};

module.exports = {
  otherRoutes,
};
