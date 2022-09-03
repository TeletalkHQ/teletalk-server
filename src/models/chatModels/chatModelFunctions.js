const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const {
  errorThrower,
  getErrorObject,
} = require("@/functions/utilities/utilities");

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

const getPrivateChat = async (
  currentUser,
  chatId,
  projections = { "messages._id": 0 },
  options = { lean: true }
) => {
  const chatExist = currentUser.chats.find((chat) => chat.chatId === chatId);
  errorThrower(!chatExist, () => CHAT_NOT_EXIST);

  const chat = await PrivateChatMongoModel.findOne(
    { chatId },
    projections,
    options
  );

  errorThrower(!chat, () => CHAT_NOT_EXIST);

  return chat;
};

const getPrivateChatMessages = async (currentUser, chatId) =>
  (await getPrivateChat(currentUser, chatId)).messages;

const sendPrivateMessage = async (currentUser, participantId, message) => {
  const targetUser = await userFinder({ privateId: participantId }, {});
  //TODO Add test for TARGET_USER_NOT_EXIST
  errorThrower(!targetUser, () => TARGET_USER_NOT_EXIST);

  const chat = await PrivateChatMongoModel.findOne({
    "participants.participantId": {
      $all: [currentUser.privateId, targetUser.privateId],
    },
  });

  const chatId =
    chat?.chatId || randomMaker.randomId(chatIdModel.maxlength.value);
  const newMessage = {
    message,
    messageId: randomMaker.randomId(messageIdModel.maxlength.value),
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
  getPrivateChatMessages,
  sendPrivateMessage,
};
