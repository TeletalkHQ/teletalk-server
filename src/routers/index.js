const { authRouter } = require("@/routers/auth");
const { otherRouter } = require("@/routers/other");
const { privateChatRouter } = require("@/routers/privateChat");
const { stuffRouter } = require("@/routers/stuff");
const { userRouter } = require("@/routers/user");

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
