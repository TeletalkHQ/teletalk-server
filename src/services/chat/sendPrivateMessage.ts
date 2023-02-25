import { errorThrower } from "utility-store/src/utilities/utilities";
import { randomMaker } from "utility-store/src/classes/RandomMaker";

import { serviceBuilder } from "@/classes/service/ServiceBuilder";

import { models } from "@/models";

import { commonServices } from "@/services/common";
import { createPrivateChat } from "@/services/chat/createPrivateChat";
import { findOnePrivateChat } from "@/services/chat/findOnePrivateChat";

import { errors } from "@/variables/errors";

const chatModels = models.native.chat;

//CLEANME: Separate createPrivateChat parts
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
  createdAt: Date.now(),
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
    createdAt: Date.now(),
    currentParticipantId: currentUserId,
    targetParticipantId,
  }));
const createChatId = () => randomMaker.id(chatModels.chatId.maxlength.value);

const saveMessageOnPrivateChat = async ({ newMessage, privateChat }) => {
  privateChat.messages.push(newMessage);
  await privateChat.save();
};

export { sendPrivateMessage };
