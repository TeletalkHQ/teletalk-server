const { errorThrower } = require("@/functions/utilities/utils");

const {
  getPrivateChatMessages,
} = require("@/models/chatModels/chatModelFunctions");

const {
  chatErrors: { CHAT_ID_REQUIRED },
} = require("@/variables/errors/chatErrors");

const getMessagesPrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { chatId },
      currentUser,
    } = req;

    errorThrower(!chatId, CHAT_ID_REQUIRED);

    const privateChatMessages = await getPrivateChatMessages(
      currentUser,
      chatId
    );

    res.checkAndResponse({
      messages: privateChatMessages.messages,
    });
  } catch (error) {
    logger.log("getMessagesPrivateChatController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getMessagesPrivateChatController };
