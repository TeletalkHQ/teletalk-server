const { handlers } = require("@/websocket/handlers");

const { routes } = require("@/websocket/routes");

const privateChatRouter = (socket = ioSocket) => {
  [
    {
      event: routes.privateChat.sendPrivateMessage.event,
      handler: handlers.sendPrivateMessage,
    },
  ].forEach((item) => {
    socket.on(item.event, (...args) => item.handler(socket, ...args));
  });
};

module.exports = { privateChatRouter };
