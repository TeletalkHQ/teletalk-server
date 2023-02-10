const { authRoutes } = require("@/websocket/routes/auth");
const { otherRoutes } = require("@/websocket/routes/other");
const { privateChatRoutes } = require("@/websocket/routes/privateChat");
const { userRoutes } = require("@/websocket/routes/user");

const routes = {
  auth: authRoutes,
  other: otherRoutes,
  privateChat: privateChatRoutes,
  user: userRoutes,
};

module.exports = {
  routes,
};
