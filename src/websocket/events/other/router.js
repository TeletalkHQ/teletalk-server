const { otherRoutes } = require("@/websocket/events/other/routes");

const otherRouter = (socket = ioSocket) => {
  Object.values(otherRoutes).forEach((item) => {
    const params = [
      item.name,
      (...args) => item.handler(socket, ...args),
    ].filter(Boolean);

    socket[item.method](...params);
  });
};

module.exports = { otherRouter };
