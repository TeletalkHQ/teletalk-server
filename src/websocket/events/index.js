const { authRouter } = require("@/websocket/events/auth/router");
const { otherRouter } = require("@/websocket/events/other/router");
const { privateChatRouter } = require("@/websocket/events/privateChat/router");
const { userRouter } = require("@/websocket/events/user/router");
const { authRoutes } = require("@/websocket/events/auth/routes");
const { otherRoutes } = require("@/websocket/events/other/routes");
const { privateChatRoutes } = require("@/websocket/events/privateChat/routes");
const { userRoutes } = require("@/websocket/events/user/routes");

const routers = (socket, io) => {
  [otherRouter, authRouter, userRouter, privateChatRouter].forEach((router) =>
    router(socket, io)
  );
};

const routes = {
  ...authRoutes,
  ...otherRoutes,
  ...privateChatRoutes,
  ...userRoutes,
};

const arrayOfRoutes = Object.values(routes);

module.exports = {
  arrayOfRoutes,
  routers,
  routes,
};
