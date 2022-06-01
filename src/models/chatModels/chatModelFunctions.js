const {
  errorThrower,
  getErrorObject,
  randomId,
} = require("@/functions/utilities/utils");

const {
  PrivateChatMongoModel,
} = require("@/models/chatModels/privateChatMongoModel");

const { userFinder } = require("@/models/userModels/userModelFunctions");
const {
  chatModels: { messageIdModel, chatIdModel },
} = require("@/models/chatModels/chatModels");

const {
  chatErrors: { CHAT_NOT_EXIST },
} = require("@/variables/errors/chatErrors");
const {
  userErrors: { TARGET_USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const getChatsLastMessages = async (currentUser) => {
  try {
    const chats = [];

    for (const chat of currentUser.chats) {
      const chatWithMessages = await PrivateChatMongoModel.findOne({
        chatId: chat.chatId,
      });
      if (chatWithMessages) {
        const { messages, participants, chatId } = chatWithMessages;
        const lastMessage = messages?.at(-1);
        chats.push({ participants, chatId, messages: [lastMessage] });
      }
    }

    return chats;
  } catch (error) {
    logger.log("getChatsLastMessages catch, error", error);
    errorThrower(error, error);
  }
};

const getPrivateChatMessages = async (currentUser, chatId) => {
  const isChatExist = currentUser.chats.find((chat) => chat.chatId === chatId);
  errorThrower(!isChatExist, CHAT_NOT_EXIST);

  const chat = await PrivateChatMongoModel.findOne({ chatId });
  errorThrower(!chat, CHAT_NOT_EXIST);

  return chat;
};

const getAllChats = (currentUser) => {
  return currentUser.chats;
};

const sendPrivateMessage = async (currentUser, participantId, message) => {
  const targetUser = await userFinder({ privateId: participantId });
  errorThrower(!targetUser, () => getErrorObject(TARGET_USER_NOT_EXIST));

  const chat = await PrivateChatMongoModel.findOne({
    "participants.participantId": {
      $all: [currentUser.privateId, targetUser.privateId],
    },
  });

  const chatId = chat?.chatId || randomId(chatIdModel.maxlength.value);
  const newMessage = {
    message,
    messageId: randomId(messageIdModel.maxlength.value),
    messageSender: { senderId: currentUser.privateId },
  };

  if (!chat) {
    await PrivateChatMongoModel.updateOne(
      { chatId },
      {
        chatId,
        participants: [
          { participantId: currentUser.privateId },
          { participantId: targetUser.privateId },
        ],
        messages: [newMessage],
      },
      { upsert: true }
    );

    await currentUser.updateOne({ chats: { chatId } });
    await targetUser.updateOne({ chats: { chatId } });
  } else if (chat) {
    chat.messages.push(newMessage);

    await chat.updateOne({ chatId }, { messages: chat.messages });
  }

  return { newMessage, chatId };
};

module.exports = {
  getChatsLastMessages,
  getAllChats,
  getPrivateChatMessages,
  sendPrivateMessage,
};
