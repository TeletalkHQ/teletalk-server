const {
  privateChatHandlers,
} = require("@/websocket/events/privateChat/handlers");
const { privateChatRouter } = require("@/websocket/events/privateChat/router");
const { privateChatRoutes } = require("@/websocket/events/privateChat/routes");

const privateChatEvents = {
  privateChatRouter,
  privateChatRoutes,
  privateChatHandlers,
};

module.exports = { privateChatEvents };
