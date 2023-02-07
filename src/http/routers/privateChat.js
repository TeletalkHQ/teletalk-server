const { Router } = require("express");

const { controllers } = require("@/http/controllers");

const { routes } = require("@/http/routes");

const privateChatRouter = Router();

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
