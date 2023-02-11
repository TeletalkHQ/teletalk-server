const { userRoutes } = require("@/websocket/events/user/routes");

const userRouter = (socket = ioSocket) => {
  Object.values(userRoutes).forEach((item) => {
    socket[item.method](item.name, (...args) => item.handler(socket, ...args));
  });
};

module.exports = { userRouter };
