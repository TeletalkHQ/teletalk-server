const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(
  true,
  "/chat/private",
  true,
  "1.0.0",
  ""
);

const getAllChats = routeTemplateGenerator(
  "get",
  "/get/all/chats",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const chatsLastMessage = routeTemplateGenerator(
  "post",
  "/chats/last/message",
  200,
  "1.0.0",
  "Use for Get chats last message"
);

const getMessages = routeTemplateGenerator(
  "post",
  "/get/messages",
  200,
  "1.0.0",
  "Use for get all messages"
);

const startChat = routeTemplateGenerator(
  "post",
  "/start/chat",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const sendMessage = routeTemplateGenerator(
  "post",
  "/send/message",
  200,
  "1.0.0",
  "Use for send private messages"
);

const error = routeTemplateGenerator(
  "get",
  "/error",
  200,
  "1.0.0",
  "Use for get all auth errors"
);

const template = routeTemplateGenerator(
  "get",
  "/template",
  200,
  "1.0.0",
  "Use for get all user properties and value structure"
);

const privateChatRouterTemplate = {
  baseUrl,
  chatsLastMessage,
  error,
  getAllChats,
  getMessages,
  sendMessage,
  startChat,
  template,
  version: "1.0.0",
};

module.exports = {
  privateChatRouterTemplate,
};
