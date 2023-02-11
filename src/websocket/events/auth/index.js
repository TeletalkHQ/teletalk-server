const { authHandlers } = require("@/websocket/events/auth/handlers");
const { authRouter } = require("@/websocket/events/auth/router");
const { authRoutes } = require("@/websocket/events/auth/routes");

const authEvents = {
  authHandlers,
  authRouter,
  authRoutes,
};

module.exports = { authEvents };
