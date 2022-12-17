const { Router } = require("express");

const { controllers } = require("@/controllers");

const { middlewares } = require("@/middlewares");

const { routes } = require("@/routes");

const privateChatRouter = Router();

privateChatRouter.use(
  middlewares.checkCurrentUserStatus,
  middlewares.attachCurrentUserId
);

privateChatRouter[routes.privateChat.getChatsLastMessage.method](
  routes.privateChat.getChatsLastMessage.url,
  controllers.getChatsLastMessage
);

privateChatRouter[routes.privateChat.sendPrivateMessage.method](
  routes.privateChat.sendPrivateMessage.url,
  controllers.sendPrivateMessage
);

privateChatRouter[routes.privateChat.getPrivateChat.method](
  routes.privateChat.getPrivateChat.url,
  controllers.getPrivateChat
);

privateChatRouter[routes.privateChat.getAllPrivateChats.method](
  routes.privateChat.getAllPrivateChats.url,
  controllers.getAllPrivateChats
);

module.exports = { privateChatRouter };
