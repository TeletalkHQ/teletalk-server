const { cellphoneRouter } = require("@/routers/cellphone");
const { otherRouter } = require("@/routers/other");
const { privateChatRouter } = require("@/routers/privateChat");
const { userRouter } = require("@/routers/user");
const { stuffRouter } = require("@/routers/stuff");

const routers = {
  cellphone: cellphoneRouter,
  other: otherRouter,
  privateChat: privateChatRouter,
  user: userRouter,
  stuff: stuffRouter,
};

module.exports = {
  routers,
};
