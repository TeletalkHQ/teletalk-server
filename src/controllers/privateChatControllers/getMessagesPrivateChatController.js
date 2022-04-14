const { errorThrower } = require("~/functions/utilities/utils");
const {
  PrivateChatModel,
} = require("~/models/chatModels/privateChatMongoModel");

const { chatErrorTemplate } = require("~/variables/errors/chatErrorTemplate");

const getMessagesPrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { chatId },
      db: { user },
    } = req;

    errorThrower(!chatId, chatErrorTemplate.CHAT_ID_REQUIRED);

    const chatFromUser = user.chats.find((chat) => chat.chatId === chatId);

    const { CHAT_NOT_EXIST } = chatErrorTemplate;

    errorThrower(!chatFromUser, CHAT_NOT_EXIST);

    const chat = await PrivateChatModel.findOne({ chatId });

    errorThrower(!chat, CHAT_NOT_EXIST);

    res.status(200).json({ messages: chat.messages });
  } catch (error) {
    logger.log("getMessagesPrivateChatController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { getMessagesPrivateChatController };
