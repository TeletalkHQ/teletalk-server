const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

const { errorThrower } = require("@/functions/utilities/utilities");

const { models } = require("@/models");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const chatModels = models.native.chat;
const PrivateChat = models.database.mongoDb.PrivateChat;

const tryToGetChatsLastMessages = async (participantId) => {
  const chats = (await getAllPrivateChats(participantId)) || [];
  const chatWithLastMessages = [];
  for (const chat of chats) {
    const { messages } = chat;
    const lastMessage = messages?.at(-1);

    chatWithLastMessages.push({
      ...chat,
      messages: [lastMessage],
    });
  }

  return chatWithLastMessages;
};

const getChatsLastMessages = async (currentUser) => {
  (
    await trier(getChatsLastMessages.name).tryAsync(
      tryToGetChatsLastMessages,
      currentUser
    )
  ).printAndThrow();
};

const getPrivateChat = async (
  chatId,
  projections = {
    __v: 0,
    _id: 0,
    "messages._id": 0,
    "participants._id": 0,
  },
  options = { lean: true }
) => {
  const chat = await PrivateChat.findOne({ chatId }, projections, options);

  errorThrower(!chat, () => errors.CHAT_NOT_EXIST);

  return chat;
};

const getAllPrivateChats = async (
  participantId,
  projections = {
    __v: 0,
    _id: 0,
    "messages._id": 0,
    "participants._id": 0,
  },
  options = { lean: true }
) => {
  return (
    (await PrivateChat.find(
      {
        "participants.participantId": participantId,
      },
      projections,
      options
    )) || []
  );
};

const sendPrivateMessage = async (currentUser, participantId, message) => {
  const targetUser = await commonServices.userFinder(
    { userId: participantId },
    {}
  );
  //TODO Add test for TARGET_USER_NOT_EXIST
  errorThrower(!targetUser, () => errors.TARGET_USER_NOT_EXIST);

  const privateChat = await PrivateChat.findOne({
    "participants.participantId": {
      $all: [currentUser.userId, targetUser.userId],
    },
  });

  const chatId =
    privateChat?.chatId ||
    randomMaker.randomId(chatModels.chatId.maxlength.value);
  const newMessage = {
    message,
    messageId: randomMaker.randomId(chatModels.messageId.maxlength.value),
    messageSender: { senderId: currentUser.userId },
  };

  if (!privateChat) {
    await PrivateChat.create({
      chatId,
      participants: [
        { participantId: currentUser.userId },
        { participantId: targetUser.userId },
      ],
      messages: [newMessage],
    });
  } else if (privateChat) {
    privateChat.messages.push(newMessage);
    await privateChat.save();
  }

  return { newMessage, chatId };
};

const chatServices = {
  getAllPrivateChats,
  getChatsLastMessages,
  getPrivateChat,
  sendPrivateMessage,
};

module.exports = { chatServices };
