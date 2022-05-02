const { errorThrower } = require("~/functions/utilities/utilsNoDeps");
const { randomId } = require("~/functions/utilities/randomId");

const {
  PrivateChatMongoModel,
} = require("~/models/chatModels/privateChatMongoModel");

const { userFinder } = require("~/models/userModels/userModelFunctions");
const {
  chatModels: {
    properties: {
      messageIdModel: { properties: messageIdModel },
      chatIdModel: { properties: chatIdModel },
    },
  },
} = require("~/models/chatModels/chatModels");

const {
  chatErrors: {
    properties: { CHAT_NOT_EXIST },
  },
} = require("~/variables/errors/chatErrors");
const {
  userErrors: {
    properties: { TARGET_USER_NOT_EXIST },
  },
} = require("~/variables/errors/userErrors");

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
    throw error;
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
  errorThrower(!targetUser, TARGET_USER_NOT_EXIST);

  const chat = await PrivateChatMongoModel.findOne({
    "participants.participantID": {
      $all: [currentUser.privateId, targetUser.privateId],
    },
  });

  let chatId = chat?.chatId;

  const newMessage = {
    message,
    messageId: randomId(messageIdModel.maxlength.value),
    messageSender: { senderID: currentUser.privateId },
  };

  if (!chat) {
    chatId = randomId(chatIdModel.maxlength.value);

    const privateChat = new PrivateChatMongoModel({
      chatId,
      participants: [
        { participantID: currentUser.privateId },
        { participantID: targetUser.privateId },
      ],
      messages: [newMessage],
    });

    await privateChat.save();

    await currentUser.updateOne({ chats: { chatId } });
    await targetUser.updateOne({ chats: { chatId } });
  } else if (chat) {
    chat.messages.push(newMessage);

    await chat.updateOne({ messages: chat.messages });
  }

  return { newMessage, chatId };
};

module.exports = {
  getChatsLastMessages,
  getAllChats,
  getPrivateChatMessages,
  sendPrivateMessage,
};
