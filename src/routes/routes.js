const { cellphone } = require("@/routes/cellphone");
const { otherRoutes } = require("@/routes/other");
const { privateChatRoutes } = require("@/routes/privateChat");
const { testRoutes } = require("@/routes/test");
const { userRoutes } = require("@/routes/user");
const { versionControlRoutes } = require("@/routes/versionControl");

const routes = {
  cellphone,
  other: otherRoutes,
  privateChat: privateChatRoutes,
  test: testRoutes,
  user: userRoutes,
  versionControl: versionControlRoutes,
};

module.exports = { routes };
