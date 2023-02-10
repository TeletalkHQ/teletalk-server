const { authHandlers } = require("@/websocket/handlers/auth");
const { otherHandlers } = require("@/websocket/handlers/other");
const { privateChatHandlers } = require("@/websocket/handlers/privateChat");
const { userHandlers } = require("@/websocket/handlers/user");

const handlers = {
  ...authHandlers,
  ...otherHandlers,
  ...privateChatHandlers,
  ...userHandlers,
};

module.exports = {
  handlers,
};
