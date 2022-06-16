const {
  getPrivateChatMessages,
} = require("@/models/chatModels/chatModelFunctions");
const {
  chatValidators: { chatIdValidator },
} = require("@/validators/chatValidators");

const getMessagesPrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { chatId },
      currentUser,
    } = req;

    await chatIdValidator(chatId);

    const privateChatMessages = await getPrivateChatMessages(
      currentUser,
      chatId
    );

    res.checkDataAndResponse({
      messages: privateChatMessages,
    });
  } catch (error) {
    logger.log("getMessagesPrivateChatController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getMessagesPrivateChatController };
