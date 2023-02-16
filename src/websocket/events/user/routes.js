const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const { userHandlers } = require("@/websocket/events/user/handlers");

const builder = socketRouteBuilder();

const disconnect = builder
  .create()
  .name("disconnect")
  .handler(userHandlers.disconnect)
  .build();

const updateOnlineStatus = builder
  .create()
  .name("updateOnlineStatus")
  .handler(userHandlers.updateOnlineStatus)
  .build();

const userRoutes = {
  disconnect,
  updateOnlineStatus,
};

module.exports = {
  userRoutes,
};
