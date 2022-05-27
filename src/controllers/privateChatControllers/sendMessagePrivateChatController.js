const { errorThrower, getErrorObject } = require("@/functions/utilities/utils");
const {
  sendPrivateMessage,
} = require("@/models/chatModels/chatModelFunctions");

const {
  chatErrors: { PARTICIPANT_ID_REQUIRED, MESSAGE_TEXT_REQUIRED },
} = require("@/variables/errors/chatErrors");

const sendMessagePrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      currentUser,
      body: { participantId, message },
    } = req;
    errorThrower(!participantId, () => getErrorObject(PARTICIPANT_ID_REQUIRED));
    errorThrower(!message, () => getErrorObject(MESSAGE_TEXT_REQUIRED));

    const { chatId, newMessage } = await sendPrivateMessage(
      currentUser,
      participantId,
      message
    );

    res.checkAndResponse({ chatId, newMessage });
  } catch (error) {
    logger.log("sendMessagePrivateChatController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { sendMessagePrivateChatController };
