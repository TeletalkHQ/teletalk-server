const { authRouter } = require("@/websocket/routers/auth");
const { otherRouter } = require("@/websocket/routers/other");
const { privateChatRouter } = require("@/websocket/routers/privateChat");
const { userRouter } = require("@/websocket/routers/user");

const routers = (socket) => {
  [otherRouter, authRouter, userRouter, privateChatRouter].forEach((router) =>
    router(socket)
  );
};

module.exports = { routers };
