const { getStatusCodeFromRoute } = require("~/functions/utilities/utilsNoDeps");
const { errorThrower } = require("~/functions/utilities/utilsNoDeps");

const {
  getPrivateChatMessages,
} = require("~/models/chatModels/chatModelFunctions");

const {
  chatErrors: {
    properties: { CHAT_ID_REQUIRED },
  },
} = require("~/variables/errors/chatErrors");
const { privateChatRoutes } = require("~/variables/routes/privateChatRoutes");

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

    res
      .status(getStatusCodeFromRoute(privateChatRoutes.properties.getMessages))
      .json({ messages: privateChatMessages.messages });
  } catch (error) {
    logger.log("getMessagesPrivateChatController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getMessagesPrivateChatController };
