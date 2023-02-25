const {
  getChatInfo,
} = require("@/websocket/events/privateChat/handlers/getChatInfo");
const {
  getPrivateChat,
} = require("@/websocket/events/privateChat/handlers/getPrivateChat");
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
  getChatInfo,
  getPrivateChat,
  getPrivateChats,
  joinRoom,
  sendPrivateMessage,
};

module.exports = { privateChatHandlers };
