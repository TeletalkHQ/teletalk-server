const { authRoutes } = require("@/websocket/routes/auth");
const { otherRoutes } = require("@/websocket/routes/other");
const { userRoutes } = require("@/websocket/routes/user");

const routes = {
  auth: authRoutes,
  other: otherRoutes,
  user: userRoutes,
};

module.exports = {
  routes,
};
