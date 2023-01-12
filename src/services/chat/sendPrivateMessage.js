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
    const targetParticipantId = await findTargetParticipantId(participantId);

    const newMessage = createNewMessage(message, currentUserId);

    const privateChat = await findPrivateChat(
      currentUserId,
      targetParticipantId
    );
    const fixedPrivateChat = await fixPrivateChat({
      currentUserId,
      privateChat,
      targetParticipantId,
    });

    console.log("fixedPrivateChat:::", fixedPrivateChat);
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

const findTargetParticipantId = async (participantId) => {
  const targetParticipant = await commonServices.findOneUserById(participantId);
  errorThrower(!targetParticipant, () => errors.TARGET_USER_NOT_EXIST);
  return targetParticipant.userId;
};

const findPrivateChat = async (currentUserId, targetParticipantId) => {
  return await findOnePrivateChat({ shouldFixQueryResult: false }).run({
    "participants.participantId": {
      $all: [currentUserId, targetParticipantId],
    },
  });
};

const createNewMessage = (message, currentUserId) => ({
  message,
  messageId: randomMaker.id(chatModels.messageId.maxlength.value),
  sender: {
    senderId: currentUserId,
  },
});

const fixPrivateChat = async ({
  currentUserId,
  privateChat,
  targetParticipantId,
}) =>
  privateChat ||
  (await createPrivateChat({ shouldFixQueryResult: false }).run({
    chatId: createChatId(),
    currentParticipantId: currentUserId,
    targetParticipantId,
  }));
const createChatId = () => randomMaker.id(chatModels.chatId.maxlength.value);

const saveMessageOnPrivateChat = async ({ newMessage, privateChat }) => {
  privateChat.messages.push(newMessage);
  await privateChat.save();
};

module.exports = { sendPrivateMessage };
