const {
  getPrivateChats,
} = require("@/websocket/events/privateChat/handlers/getPrivateChats");
const {
  joinRoom,
} = require("@/websocket/events/privateChat/handlers/joinRoom");
const {
  sendPrivateMessage,
} = require("@/websocket/events/privateChat/handlers/sendPrivateMessage");

const privateChatHandlers = {
  getPrivateChats,
  joinRoom,
  sendPrivateMessage,
};

module.exports = { privateChatHandlers };
