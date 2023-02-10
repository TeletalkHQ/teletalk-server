const { userHandlers } = require("@/websocket/handlers/user");
const { otherHandlers } = require("@/websocket/handlers/other");
const { authHandlers } = require("@/websocket/handlers/auth");

const handlers = {
  ...userHandlers,
  ...otherHandlers,
  ...authHandlers,
};

module.exports = {
  handlers,
};
