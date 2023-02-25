const { socketRouterBuilder } = require("@/helpers/socketRouterBuilder");

const { otherRoutes } = require("@/websocket/events/other/routes");

const otherRouter = socketRouterBuilder(otherRoutes);

module.exports = { otherRouter };
