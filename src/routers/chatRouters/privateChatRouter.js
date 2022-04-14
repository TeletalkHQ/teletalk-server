const { Router } = require("express");

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
  privateChatRoutes: {
    sendMessage: { properties: sendMessage },
    startChat: { properties: startChat },
    getMessages: { properties: getMessages },
    getAllChats: { properties: getAllChats },
    chatsLastMessage: { properties: chatsLastMessage },
  },
} = require("~/variables/routes/privateChatRoutes");

const privateChatRoute = Router();

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
