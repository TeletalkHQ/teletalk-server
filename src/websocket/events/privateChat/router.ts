const { socketRouterBuilder } = require("@/helpers/socketRouterBuilder");

const { privateChatRoutes } = require("@/websocket/events/privateChat/routes");

const privateChatRouter = socketRouterBuilder(privateChatRoutes);

module.exports = { privateChatRouter };
