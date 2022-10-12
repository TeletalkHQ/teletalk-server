const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

const { errorThrower } = require("@/functions/utilities/utilities");

const { models } = require("@/models/models");

const { userFinder } = require("@/services/userServices");

const {
  chatErrors: { CHAT_NOT_EXIST },
} = require("@/variables/errors/chatErrors");
const {
  userErrors: { TARGET_USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const chatModels = models.native.chat;
const PrivateChat = models.database.mongoDb.PrivateChat;

const tryToGetChatsLastMessages = async (currentUser) => {
  const chats = [];

  for (const chat of currentUser.chats) {
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
  const chatExist = currentUser.chats.find((chat) => chat.chatId === chatId);
  errorThrower(!chatExist, () => CHAT_NOT_EXIST);

  const chat = await PrivateChat.findOne({ chatId }, projections, options);

  errorThrower(!chat, () => CHAT_NOT_EXIST);

  return chat;
};

const getPrivateChatMessages = async (currentUser, chatId) =>
  (await getPrivateChat(currentUser, chatId)).messages;

const sendPrivateMessage = async (currentUser, participantId, message) => {
  const targetUser = await userFinder({ privateId: participantId }, {});
  //TODO Add test for TARGET_USER_NOT_EXIST
  errorThrower(!targetUser, () => TARGET_USER_NOT_EXIST);

  const chat = await PrivateChat.findOne({
    "participants.participantId": {
      $all: [currentUser.privateId, targetUser.privateId],
    },
  });

  const chatId =
    chat?.chatId || randomMaker.randomId(chatModels.chatId.maxlength.value);
  const newMessage = {
    message,
    messageId: randomMaker.randomId(chatModels.messageId.maxlength.value),
    messageSender: { senderId: currentUser.privateId },
  };

  if (!chat) {
    await PrivateChat.updateOne(
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
