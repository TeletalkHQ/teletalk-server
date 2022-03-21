const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(
  true,
  "/chat/privateChat",
  true,
  "1.0.0",
  ""
);

const getAllChats = routeTemplateGenerator(
  "get",
  "/getAllPrivateChats",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const chatsLastMessage = routeTemplateGenerator(
  "post",
  "/privateChatsLastMessages",
  200,
  "1.0.0",
  "Use for Get chats last message"
);

const getMessages = routeTemplateGenerator(
  "post",
  "/getPrivateMessages",
  200,
  "1.0.0",
  "Use for get all messages"
);

const startChat = routeTemplateGenerator(
  "post",
  "/startNewPrivateChat",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const sendMessage = routeTemplateGenerator(
  "post",
  "/sendPrivateMessage",
  200,
  "1.0.0",
  "Use for send private messages"
);

const privateChatRouterTemplate = {
  baseUrl,
  chatsLastMessage,
  getAllChats,
  getMessages,
  sendMessage,
  startChat,
  version: "1.0.0",
};

module.exports = {
  privateChatRouterTemplate,
};
