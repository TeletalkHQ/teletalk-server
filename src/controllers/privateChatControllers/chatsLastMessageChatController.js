const {
  getChatsLastMessages,
} = require("@/models/chatModels/chatModelFunctions");

const {
  privateChatRoutes: { chatsLastMessageRoute },
} = require("@/variables/routes/privateChatRoutes");

const chatsLastMessageChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser } = req;

    const chatsWithLastMessages = await getChatsLastMessages(currentUser);

    res.sendJsonResponse(chatsLastMessageRoute, {
      chatsWithLastMessages,
    });
  } catch (error) {
    logger.log("chatsLastMessageChatController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { chatsLastMessageChatController };
