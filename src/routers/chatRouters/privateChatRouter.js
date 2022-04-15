const { Router } = require("express");

const {
  sendMessagePrivateChatController,
} = require("~/controllers/privateChatControllers/sendMessagePrivateChatController");

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
    properties: {
      sendMessage: { properties: sendMessage },
      getMessages: { properties: getMessages },
      getAllChats: { properties: getAllChats },
      chatsLastMessage: { properties: chatsLastMessage },
    },
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

module.exports = { privateChatRouter };
