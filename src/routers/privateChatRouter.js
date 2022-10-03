const { Router } = require("express");

const {
  chatsLastMessageChatController,
} = require("@/controllers/privateChatControllers/chatsLastMessageChatController");
const {
  getAllChatsUserController,
} = require("@/controllers/privateChatControllers/getAllChatsUserController");
const {
  getMessagesPrivateChatController,
} = require("@/controllers/privateChatControllers/getMessagesPrivateChatController");
const {
  sendMessagePrivateChatController,
} = require("@/controllers/privateChatControllers/sendMessagePrivateChatController");

const { middlewares } = require("@/middlewares/middlewares");

const {
  privateChatRoutes: {
    chatsLastMessageRoute,
    getAllChatsRoute,
    getPrivateChatMessagesRoute,
    sendMessageRoute,
  },
} = require("@/variables/routes/privateChatRoutes");

const privateChatRouter = Router();

privateChatRouter.use(middlewares.findCurrentUserFromDb);

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
privateChatRouter[getPrivateChatMessagesRoute.method](
  getPrivateChatMessagesRoute.url,
  getMessagesPrivateChatController
);

module.exports = { privateChatRouter };
