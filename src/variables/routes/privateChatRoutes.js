const { routeGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeGenerator(true, "/chat/privateChat", true, "1.0.0", "");

const getAllChats = routeGenerator(
  "get",
  "/getAllPrivateChats",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const chatsLastMessage = routeGenerator(
  "post",
  "/privateChatsLastMessages",
  200,
  "1.0.0",
  "Use for Get chats last message"
);

const getMessages = routeGenerator(
  "post",
  "/getPrivateMessages",
  200,
  "1.0.0",
  "Use for get all messages"
);

const startChat = routeGenerator(
  "post",
  "/startNewPrivateChat",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const sendMessage = routeGenerator(
  "post",
  "/sendPrivateMessage",
  200,
  "1.0.0",
  "Use for send private messages"
);

const privateChatRoutes = {
  info: { version: "1.0.0" },

  properties: {
    baseUrl,
    chatsLastMessage,
    getAllChats,
    getMessages,
    sendMessage,
    startChat,
  },
};

module.exports = {
  privateChatRoutes,
};
