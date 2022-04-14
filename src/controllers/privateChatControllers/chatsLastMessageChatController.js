const {
  PrivateChatModel,
} = require("~/models/chatModels/privateChatMongoModel");

const chatsLastMessageChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
    } = req;

    const chats = [];
    for (const chat of user.chats) {
      const chatWithMessages = await PrivateChatModel.findOne({
        chatId: chat.chatId,
      });
      if (chatWithMessages) {
        logger.log(chatWithMessages);
        const { messages, participants, chatId } = chatWithMessages;
        const lastMessage = messages[messages.length - 1];
        logger.log(lastMessage);
        chats.push({ participants, chatId, messages: [lastMessage] });
      }
    }

    res.status(200).json({ chats });
  } catch (error) {
    logger.log("chatsLastMessageChatController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { chatsLastMessageChatController };
