const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const { METHODS } = require("@/variables/others/methods");

const {
  privateChatHandlers,
} = require("@/websocket/events/privateChat/handlers");

const builder = socketRouteBuilder();

const joinRoom = builder
  .create()
  .name("joinRoom")
  .handler(privateChatHandlers.joinRoom)
  .method(METHODS.ONCE)
  .build();

const sendPrivateMessage = builder
  .create()
  .handler(privateChatHandlers.sendPrivateMessage)
  .name("sendPrivateMessage")
  .build();

const privateChatRoutes = {
  joinRoom,
  sendPrivateMessage,
};

module.exports = {
  privateChatRoutes,
};
