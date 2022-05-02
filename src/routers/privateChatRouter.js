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
      sendMessageRoute: { properties: sendMessageRoute },
      getMessagesRoute: { properties: getMessagesRoute },
      getAllChatsRoute: { properties: getAllChatsRoute },
      chatsLastMessageRoute: { properties: chatsLastMessageRoute },
    },
  },
} = require("~/variables/routes/privateChatRoutes");

const privateChatRouter = Router();

privateChatRouter[getAllChatsRoute.method](
  getAllChatsRoute.url,
  getAllChatsUserController
);

privateChatRouter[chatsLastMessageRoute.method](
  chatsLastMessageRoute.url,
  chatsLastMessageChatController
);

privateChatRouter[sendMessageRoute.method](
  sendMessageRoute.url,
  sendMessagePrivateChatController
);
privateChatRouter[getMessagesRoute.method](
  getMessagesRoute.url,
  getMessagesPrivateChatController
);

module.exports = { privateChatRouter };
