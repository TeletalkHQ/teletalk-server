const {
  sendPrivateMessage,
} = require("@/models/chatModels/chatModelFunctions");

const {
  chatValidators: { participantIdValidator, messageTextValidator },
} = require("@/validators/chatValidators");

const sendMessagePrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      currentUser,
      body: { participantId, message },
    } = req;

    await participantIdValidator(participantId);
    await messageTextValidator(message);

    const { chatId, newMessage } = await sendPrivateMessage(
      currentUser,
      participantId,
      message
    );

    res.checkDataAndResponse({ chatId, newMessage });
  } catch (error) {
    logger.log("sendMessagePrivateChatController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { sendMessagePrivateChatController };
