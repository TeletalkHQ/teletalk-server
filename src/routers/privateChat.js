const { Router } = require("express");

const { controllers } = require("@/controllers");

const { middlewares } = require("@/middlewares");
const { routes } = require("@/routes");

const privateChatRouter = Router();

privateChatRouter.use(middlewares.findCurrentUserFromDb);

privateChatRouter[routes.privateChat.chatsLastMessage.method](
  routes.privateChat.chatsLastMessage.url,
  controllers.chatsLastMessage
);

privateChatRouter[routes.privateChat.sendPrivateMessage.method](
  routes.privateChat.sendPrivateMessage.url,
  controllers.sendPrivateMessage
);
privateChatRouter[routes.privateChat.getPrivateChatMessages.method](
  routes.privateChat.getPrivateChatMessages.url,
  controllers.getPrivateChatMessages
);

module.exports = { privateChatRouter };
