const { handlers } = require("@/websocket/handlers");

const { routes } = require("@/websocket/routes");

const authRouter = (socket = ioSocket) => {
  [
    {
      event: routes.auth.logout.event,
      handler: handlers.logout,
    },
  ].forEach((item) => {
    socket.on(item.event, (...args) => item.handler(socket, ...args));
  });
};

module.exports = { authRouter };
