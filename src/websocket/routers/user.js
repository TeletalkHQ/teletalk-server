const { handlers } = require("@/websocket/handlers");

const { routes } = require("@/websocket/routes");

const userRouter = (socket = ioSocket) => {
  [
    {
      event: routes.user.updateOnlineStatus.event,
      handler: handlers.updateOnlineStatus,
    },
  ].forEach((item) => {
    socket.on(item.event, (...args) => item.handler(socket, ...args));
  });
};

module.exports = { userRouter };
