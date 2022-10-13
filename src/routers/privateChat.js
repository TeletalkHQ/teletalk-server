const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

const { middlewares } = require("@/middlewares/middlewares");
const { routes } = require("@/routes/routes");

const privateChatRouter = Router();

privateChatRouter.use(middlewares.findCurrentUserFromDb);

privateChatRouter[routes.privateChat.getAllPrivateChats.method](
  routes.privateChat.getAllPrivateChats.url,
  controllers.getAllPrivateChats
);

privateChatRouter[routes.privateChat.chatsLastMessage.method](
  routes.privateChat.chatsLastMessage.url,
  controllers.chatsLastMessage
);

privateChatRouter[routes.privateChat.sendMessage.method](
  routes.privateChat.sendMessage.url,
  controllers.sendMessage
);
privateChatRouter[routes.privateChat.getPrivateChatMessages.method](
  routes.privateChat.getPrivateChatMessages.url,
  controllers.getMessages
);

module.exports = { privateChatRouter };
