const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const { fields } = require("@/variables/others/fields");

const { authHandlers } = require("@/websocket/events/auth/handlers");

const builder = socketRouteBuilder();

const createNewUser = builder
  .create()
  .name("create")
  .inputFields(fields.collection.fullName)
  .handler(authHandlers.createNewUser)
  .build();

const logout = builder
  .create()
  .name("logout")
  .handler(authHandlers.logout)
  .build();

const authRoutes = {
  createNewUser,
  logout,
};

module.exports = {
  authRoutes,
};
