import { randomMaker } from "utility-store";

import { models } from "@/models";

import { commonServices } from "@/services/common";
import { createPrivateChat } from "@/services/chat/createPrivateChat";
import { findOnePrivateChat } from "@/services/chat/findOnePrivateChat";

import { PrivateChatMongo, HydratedPrivateChatMongo, Message } from "@/types";

import { errors } from "@/variables/errors";

const chatModels = models.native.chat;

//REFACTOR: Separate createPrivateChat parts
const sendPrivateMessage = async (data: {
  currentUserId: string;
  message: string;
  participantId: string;
}) => {
  const targetParticipantId = await findTargetParticipantId(data.participantId);

  const newMessage = createNewMessage(data.message, data.currentUserId);

  const privateChat = await findPrivateChat(
    data.currentUserId,
    targetParticipantId
  );
  const fixedPrivateChat = await fixPrivateChat({
    currentUserId: data.currentUserId,
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
};

const findTargetParticipantId = async (participantId: string) => {
  const targetParticipant = await commonServices.findOneUserById(participantId);

  if (!targetParticipant) throw errors.TARGET_USER_NOT_EXIST;

  return targetParticipant.userId;
};

const findPrivateChat = async (
  currentUserId: string,
  targetParticipantId: string
) => {
  const key = "participants.participantId" as keyof PrivateChatMongo;

  return await findOnePrivateChat({
    [key]: {
      $all: [currentUserId, targetParticipantId],
    },
  });
};

const createNewMessage = (message: string, currentUserId: string) => ({
  createdAt: Date.now(),
  message,
  messageId: randomMaker.id(chatModels.messageId.maxlength.value),
  sender: {
    senderId: currentUserId,
  },
});

const fixPrivateChat = async (data: {
  currentUserId: string;
  privateChat?: HydratedPrivateChatMongo | null;
  targetParticipantId: string;
}) =>
  data.privateChat ||
  (await createPrivateChat({
    chatId: createChatId(),
    createdAt: Date.now(),
    currentParticipantId: data.currentUserId,
    targetParticipantId: data.targetParticipantId,
  }));

const createChatId = () => randomMaker.id(chatModels.chatId.maxlength.value);

const saveMessageOnPrivateChat = async (data: {
  newMessage: Message;
  privateChat: HydratedPrivateChatMongo;
}) => {
  data.privateChat.messages.push(data.newMessage);
  await data.privateChat.save();
};

export { sendPrivateMessage };
