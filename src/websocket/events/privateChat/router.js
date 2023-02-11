const { privateChatRoutes } = require("@/websocket/events/privateChat/routes");

const privateChatRouter = (socket = ioSocket) => {
  Object.values(privateChatRoutes).forEach((item) => {
    socket[item.method](item.name, (...args) => item.handler(socket, ...args));
  });
};

module.exports = { privateChatRouter };
