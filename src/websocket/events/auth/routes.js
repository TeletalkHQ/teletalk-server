const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const { authHandlers } = require("@/websocket/events/auth/handlers");

const builder = socketRouteBuilder();

const logout = builder
  .create()
  .name("logout")
  .handler(authHandlers.logout)
  .build();

const authRoutes = {
  logout,
};

module.exports = {
  authRoutes,
};
