const { cellphoneRouter } = require("@/routers/cellphone");
const { otherRouter } = require("@/routers/other");
const { privateChatRouter } = require("@/routers/privateChat");
const { userRouter } = require("@/routers/user");
const { stuffRouter: versionControlRouter } = require("@/routers/stuff");

const routers = {
  cellphone: cellphoneRouter,
  other: otherRouter,
  privateChat: privateChatRouter,
  user: userRouter,
  stuff: versionControlRouter,
};

module.exports = {
  routers,
};
