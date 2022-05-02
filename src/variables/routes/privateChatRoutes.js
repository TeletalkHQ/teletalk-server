const { routeGenerator } = require("@/functions/utilities/generators");

const privateChatRouteBaseUrl = routeGenerator(
  true,
  "/chat/privateChat",
  true,
  "1.0.0",
  ""
);

const getAllChatsRoute = routeGenerator(
  "get",
  "/getAllPrivateChats",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const chatsLastMessageRoute = routeGenerator(
  "post",
  "/privateChatsLastMessages",
  200,
  "1.0.0",
  "Use for Get chats last message"
);

const getMessagesRoute = routeGenerator(
  "post",
  "/getPrivateMessages",
  200,
  "1.0.0",
  "Use for get all messages"
);

const startChatRoute = routeGenerator(
  "post",
  "/startNewPrivateChat",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const sendMessageRoute = routeGenerator(
  "post",
  "/sendPrivateMessage",
  200,
  "1.0.0",
  "Use for send private messages"
);

const privateChatRoutes = {
  info: { version: "1.0.0" },

  properties: {
    privateChatRouteBaseUrl,
    chatsLastMessageRoute,
    getAllChatsRoute,
    getMessagesRoute,
    sendMessageRoute,
    startChatRoute,
  },
};

module.exports = {
  privateChatRoutes,
};
