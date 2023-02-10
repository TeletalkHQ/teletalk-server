const { authRouter } = require("@/websocket/routers/auth");
const { otherRouter } = require("@/websocket/routers/other");
const { userRouter } = require("@/websocket/routers/user");

const routers = (socket) => {
  [otherRouter, authRouter, userRouter].forEach((router) => router(socket));
};

module.exports = { routers };
