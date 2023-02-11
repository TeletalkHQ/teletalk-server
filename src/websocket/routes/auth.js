const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const builder = socketRouteBuilder();

const logout = builder.create().event("logout").build();

const authRoutes = {
  logout,
};

module.exports = {
  authRoutes,
};
