const { errorThrower } = require("@/functions/utilities/utilsNoDeps");

const {
  getPrivateChatMessages,
} = require("@/models/chatModels/chatModelFunctions");

const {
  chatErrors: {
    properties: {
      CHAT_ID_REQUIRED: { properties: CHAT_ID_REQUIRED },
    },
  },
} = require("@/variables/errors/chatErrors");
const {
  privateChatRoutes: { properties: getMessagesRoute },
} = require("@/variables/routes/privateChatRoutes");

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

    res.sendJsonResponse(getMessagesRoute, {
      messages: privateChatMessages.messages,
    });
  } catch (error) {
    logger.log("getMessagesPrivateChatController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getMessagesPrivateChatController };
