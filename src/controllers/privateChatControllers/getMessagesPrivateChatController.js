const { errorThrower } = require("~/functions/utilities/utils");
const { PrivateChatModel } = require("~/models/chatModels/privateChatModel");

const {
  chatErrorTemplate,
} = require("~/templates/errorTemplates/chatErrorTemplate");

const getMessagesPrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { chatID },
      db: { user },
    } = req;

    errorThrower(!chatID, chatErrorTemplate.CHAT_ID_REQUIRED);

    const chatFromUser = user.chats.find((chat) => chat.chatID === chatID);

    const { CHAT_NOT_EXIST } = chatErrorTemplate;

    errorThrower(!chatFromUser, CHAT_NOT_EXIST);

    const chat = await PrivateChatModel.findOne({ chatID });

    errorThrower(!chat, CHAT_NOT_EXIST);

    res.status(200).json({ messages: chat.messages });
  } catch (error) {
    logger.log("getMessagesPrivateChatController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { getMessagesPrivateChatController };
