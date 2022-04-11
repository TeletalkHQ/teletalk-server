const { Router } = require("express");

const { authDefaultMDW } = require("~/middlewares/authDefaultMDW");
const { findUserFromDB } = require("~/middlewares/findUserFromDB");

const {
  sendMessagePrivateChatController,
} = require("~/controllers/privateChatControllers/sendMessagePrivateChatController");
const {
  startChatPrivateChatController,
} = require("~/controllers/privateChatControllers/startChatPrivateChatController");
const {
  getMessagesPrivateChatController,
} = require("~/controllers/privateChatControllers/getMessagesPrivateChatController");
const {
  chatsLastMessageChatController,
} = require("~/controllers/privateChatControllers/chatsLastMessageChatController");
const {
  getAllChatsUserController,
} = require("~/controllers/privateChatControllers/getAllChatsUserController");

const {
  privateChatRouterTemplate: {
    sendMessage: { properties: sendMessage },
    startChat: { properties: startChat },
    getMessages: { properties: getMessages },
    getAllChats: { properties: getAllChats },
    chatsLastMessage: { properties: chatsLastMessage },
  },
} = require("~/templates/routerTemplates/privateChatRouterTemplate");

const privateChatRoute = Router();

privateChatRoute.use(authDefaultMDW);

privateChatRoute.use(findUserFromDB);

privateChatRoute[getAllChats.method](
  getAllChats.url,
  getAllChatsUserController
);

privateChatRoute[chatsLastMessage.method](
  chatsLastMessage.url,
  chatsLastMessageChatController
);

privateChatRoute[sendMessage.method](
  sendMessage.url,
  sendMessagePrivateChatController
);
privateChatRoute[getMessages.method](
  getMessages.url,
  getMessagesPrivateChatController
);
privateChatRoute[startChat.method](
  startChat.url,
  startChatPrivateChatController
);

module.exports = { privateChatRoute };
