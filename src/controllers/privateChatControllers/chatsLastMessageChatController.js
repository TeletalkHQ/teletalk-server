const {
  getChatsLastMessages,
} = require("@/models/chatModels/chatModelFunctions");

const chatsLastMessageChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser } = req;

    const chatsWithLastMessages = await getChatsLastMessages(currentUser);

    res.checkAndResponse({
      chatsWithLastMessages,
    });
  } catch (error) {
    logger.log("chatsLastMessageChatController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { chatsLastMessageChatController };
