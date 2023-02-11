const { authRoutes } = require("@/websocket/events/auth/routes");

const authRouter = (socket = ioSocket) => {
  Object.values(authRoutes).forEach((item) => {
    socket[item.method](item.name, (...args) => item.handler(socket, ...args));
  });
};

module.exports = { authRouter };
