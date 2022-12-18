const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { errorThrower } = require("utility-store/src/functions/utilities");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const chatModels = models.native.chat;
const PrivateChat = models.database.mongoDb.PrivateChat;

const sendPrivateMessage = serviceBuilder
  .create()
  .body(async ({ currentUserId, participantId, message }) => {
    const targetUserId = await findTargetUserId(participantId);

    const newMessage = createNewMessage(message, currentUserId);

    const privateChat = await findPrivateChat(currentUserId, targetUserId);
    const fixedPrivateChat = await fixPrivateChat({
      currentUserId,
      privateChat,
      targetUserId,
    });

    await saveMessageOnPrivateChat({
      privateChat: fixedPrivateChat,
      newMessage,
    });

    return {
      chatId: fixedPrivateChat.chatId,
      newMessage,
    };
  })
  .build();

const findTargetUserId = async (participantId) => {
  const targetUser = await commonServices.findOneUserById(participantId);
  //TODO Add test for TARGET_USER_NOT_EXIST
  errorThrower(!targetUser, () => errors.TARGET_USER_NOT_EXIST);

  return targetUser.userId;
};

const findPrivateChat = async (currentUserId, targetUserId) => {
  return await PrivateChat.findOne({
    "participants.participantId": {
      $all: [currentUserId, targetUserId],
    },
  });
};

const createNewMessage = (message, currentUserId) => ({
  message,
  messageId: randomMaker.randomId(chatModels.messageId.maxlength.value),
  sender: { senderId: currentUserId },
});

const fixPrivateChat = async ({ currentUserId, privateChat, targetUserId }) =>
  privateChat ||
  (await PrivateChat.create({
    chatId: createChatId(),
    participants: [
      { participantId: currentUserId },
      { participantId: targetUserId },
    ],
  }));
const createChatId = () =>
  randomMaker.randomId(chatModels.chatId.maxlength.value);

const saveMessageOnPrivateChat = async ({ privateChat, newMessage }) => {
  privateChat.messages.push(newMessage);
  await privateChat.save();
};

module.exports = { sendPrivateMessage };
