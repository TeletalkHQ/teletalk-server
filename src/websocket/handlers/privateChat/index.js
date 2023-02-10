const {
  sendPrivateMessage,
} = require("@/websocket/handlers/privateChat/sendPrivateMessage");

const privateChatHandlers = { sendPrivateMessage };

module.exports = { privateChatHandlers };
