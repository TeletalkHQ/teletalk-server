const {
  joinRoom,
} = require("@/websocket/events/privateChat/handlers/joinRoom");
const {
  sendPrivateMessage,
} = require("@/websocket/events/privateChat/handlers/sendPrivateMessage");

const privateChatHandlers = {
  joinRoom,
  sendPrivateMessage,
};

module.exports = { privateChatHandlers };
