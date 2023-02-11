const { authRouter } = require("@/websocket/events/auth/router");
const { otherRouter } = require("@/websocket/events/other/router");
const { privateChatRouter } = require("@/websocket/events/privateChat/router");
const { userRouter } = require("@/websocket/events/user/router");

const events = (socket) => {
  [otherRouter, authRouter, userRouter, privateChatRouter].forEach((router) =>
    router(socket)
  );
};

module.exports = { events };
