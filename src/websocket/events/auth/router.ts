const { socketRouterBuilder } = require("@/helpers/socketRouterBuilder");

const { authRoutes } = require("@/websocket/events/auth/routes");

const authRouter = socketRouterBuilder(authRoutes);

module.exports = { authRouter };
