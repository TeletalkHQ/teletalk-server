const { socketRouterBuilder } = require("@/helpers/socketRouterBuilder");

const { userRoutes } = require("@/websocket/events/user/routes");

const userRouter = socketRouterBuilder(userRoutes);

module.exports = { userRouter };
