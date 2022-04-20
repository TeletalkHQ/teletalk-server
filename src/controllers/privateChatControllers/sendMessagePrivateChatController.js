const { getStatusCodeFromRoute } = require("~/functions/utilities/utils");
const { errorThrower } = require("~/functions/utilities/utilsNoDeps");
const {
  sendPrivateMessage,
} = require("~/models/chatModels/chatModelFunctions");

const {
  chatErrors: {
    properties: { PARTICIPANT_ID_REQUIRED, MESSAGE_TEXT_REQUIRED },
  },
} = require("~/variables/errors/chatErrors");
const { privateChatRoutes } = require("~/variables/routes/privateChatRoutes");

const sendMessagePrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      currentUser,
      body: { participantId, message },
    } = req;
    errorThrower(!participantId, PARTICIPANT_ID_REQUIRED);
    errorThrower(!message, MESSAGE_TEXT_REQUIRED);

    const { chatId, newMessage } = await sendPrivateMessage(
      currentUser,
      participantId,
      message
    );

    res
      .status(getStatusCodeFromRoute(privateChatRoutes.properties.sendMessage))
      .send({ chatId, newMessage });
  } catch (error) {
    logger.log("sendMessagePrivateChatController catch", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { sendMessagePrivateChatController };
