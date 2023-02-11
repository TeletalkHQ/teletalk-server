const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const builder = socketRouteBuilder();

const sendPrivateMessage = builder.create().event("sendPrivateMessage").build();

const privateChatRoutes = {
  sendPrivateMessage,
};

module.exports = {
  privateChatRoutes,
};
