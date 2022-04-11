const { PrivateChatModel } = require("~/models/chatModels/privateChat.mongo");

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
        chatID: chat.chatID,
      });
      if (chatWithMessages) {
        logger.log(chatWithMessages);
        const { messages, participants, chatID } = chatWithMessages;
        const lastMessage = messages[messages.length - 1];
        logger.log(lastMessage);
        chats.push({ participants, chatID, messages: [lastMessage] });
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
