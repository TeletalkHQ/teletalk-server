const { Router } = require("express");

const { controllers } = require("@/controllers");

const { middlewares } = require("@/middlewares");

const { routes } = require("@/routes");

const privateChatRouter = Router();

privateChatRouter.use(middlewares.findCurrentUserFromDb);

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

//CLEANME: Make a class for creating router item
privateChatRouter[routes.privateChat.getAllPrivateChats.method](
  routes.privateChat.getAllPrivateChats.url,
  controllers.getAllPrivateChats
);

module.exports = { privateChatRouter };
