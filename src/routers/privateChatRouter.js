const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

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
  controllers.getAllChats
);

privateChatRouter[chatsLastMessageRoute.method](
  chatsLastMessageRoute.url,
  controllers.chatsLastMessage
);

privateChatRouter[sendMessageRoute.method](
  sendMessageRoute.url,
  controllers.sendMessage
);
privateChatRouter[getPrivateChatMessagesRoute.method](
  getPrivateChatMessagesRoute.url,
  controllers.getMessages
);

module.exports = { privateChatRouter };
