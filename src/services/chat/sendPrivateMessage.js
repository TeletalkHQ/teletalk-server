const { errorThrower } = require("utility-store/src/utilities/utilities");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const { commonServices } = require("@/services/common");
const { createPrivateChat } = require("@/services/chat/createPrivateChat");
const { findOnePrivateChat } = require("@/services/chat/findOnePrivateChat");

const { errors } = require("@/variables/errors");

const chatModels = models.native.chat;

const sendPrivateMessage = serviceBuilder
  .create()
  .body(async ({ currentUserId, message, participantId }) => {
    const targetUserId = await findTargetUserId(participantId);

    const newMessage = createNewMessage(message, currentUserId);

    const privateChat = await findPrivateChat(currentUserId, targetUserId);
    const fixedPrivateChat = await fixPrivateChat({
      currentUserId,
      privateChat,
      targetUserId,
    });

    await saveMessageOnPrivateChat({
      newMessage,
      privateChat: fixedPrivateChat,
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
  return await findOnePrivateChat({ shouldFixQueryResult: false }).run({
    "participants.participantId": {
      $all: [currentUserId, targetUserId],
    },
  });
};

const createNewMessage = (message, currentUserId) => ({
  message,
  messageId: randomMaker.id(chatModels.messageId.maxlength.value),
  sender: { senderId: currentUserId },
});

const fixPrivateChat = async ({ currentUserId, privateChat, targetUserId }) =>
  privateChat ||
  (await createPrivateChat({ shouldFixQueryResult: false }).run({
    chatId: createChatId(),
    currentUserId,
    targetUserId,
  }));
const createChatId = () => randomMaker.id(chatModels.chatId.maxlength.value);

const saveMessageOnPrivateChat = async ({ newMessage, privateChat }) => {
  privateChat.messages.push(newMessage);
  await privateChat.save();
};

module.exports = { sendPrivateMessage };
