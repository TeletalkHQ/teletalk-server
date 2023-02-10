const { authRoutes } = require("@/websocket/routes/auth");
const { otherRoutes } = require("@/websocket/routes/other");

const routes = {
  auth: authRoutes,
  other: otherRoutes,
};

module.exports = {
  routes,
};
