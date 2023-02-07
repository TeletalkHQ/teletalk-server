const { authRouter } = require("@/http/routers/auth");
const { otherRouter } = require("@/http/routers/other");
const { privateChatRouter } = require("@/http/routers/privateChat");
const { stuffRouter } = require("@/http/routers/stuff");
const { userRouter } = require("@/http/routers/user");

const routers = {
  auth: authRouter,
  other: otherRouter,
  privateChat: privateChatRouter,
  stuff: stuffRouter,
  user: userRouter,
};

module.exports = {
  routers,
};
