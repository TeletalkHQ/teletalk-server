const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

const { errorThrower } = require("@/functions/utilities/utilities");

const { models } = require("@/models");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors/errors");

const chatModels = models.native.chat;
const PrivateChat = models.database.mongoDb.PrivateChat;

const tryToGetChatsLastMessages = async (currentUser) => {
  const chats = [];

  for (const chat of currentUser.chatInfo) {
    const chatWithMessages = await PrivateChat.findOne({
      chatId: chat.chatId,
    });
    if (chatWithMessages) {
      const { messages, participants, chatId } = chatWithMessages;
      const lastMessage = messages?.at(-1);
      chats.push({ participants, chatId, messages: [lastMessage] });
    }
  }

  return chats;
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
  currentUser,
  chatId,
  projections = { "messages._id": 0 },
  options = { lean: true }
) => {
  const chatExist = currentUser.chatInfo.find((chat) => chat.chatId === chatId);
  errorThrower(!chatExist, () => errors.CHAT_NOT_EXIST);

  const chat = await PrivateChat.findOne({ chatId }, projections, options);

  errorThrower(!chat, () => errors.CHAT_NOT_EXIST);

  return chat;
};

const getPrivateChatMessages = async (currentUser, chatId) =>
  (await getPrivateChat(currentUser, chatId)).messages;

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

    await currentUser.chatInfo.push({ chatId });
    await targetUser.chatInfo.push({ chatId });
    await currentUser.save();
    await targetUser.save();
  } else if (privateChat) {
    privateChat.messages.push(newMessage);
    await privateChat.save();
  }

  return { newMessage, chatId };
};

const chatServices = {
  getChatsLastMessages,
  getPrivateChatMessages,
  sendPrivateMessage,
};

module.exports = { chatServices };
