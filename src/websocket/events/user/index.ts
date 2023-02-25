const { userHandlers } = require("@/websocket/events/user/handlers");
const { userRouter } = require("@/websocket/events/user/router");
const { userRoutes } = require("@/websocket/events/user/routes");

const userEvents = {
  userHandlers,
  userRouter,
  userRoutes,
};

module.exports = { userEvents };
