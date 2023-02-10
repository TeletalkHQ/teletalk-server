const { otherRouter } = require("@/websocket/routers/other");
const { authRouter } = require("@/websocket/routers/auth");

const routers = (socket) => {
  [otherRouter, authRouter].forEach((router) => router(socket));
};

module.exports = { routers };
