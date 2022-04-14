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

const privateChatRouter = Router();

privateChatRouter[getAllChats.method](
  getAllChats.url,
  getAllChatsUserController
);

privateChatRouter[chatsLastMessage.method](
  chatsLastMessage.url,
  chatsLastMessageChatController
);

privateChatRouter[sendMessage.method](
  sendMessage.url,
  sendMessagePrivateChatController
);
privateChatRouter[getMessages.method](
  getMessages.url,
  getMessagesPrivateChatController
);
privateChatRouter[startChat.method](
  startChat.url,
  startChatPrivateChatController
);

module.exports = { privateChatRouter };
