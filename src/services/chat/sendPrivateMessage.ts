import { randomMaker } from "utility-store";

import { models } from "~/models";

import { createPrivateChat } from "~/services/chat/createPrivateChat";
import { findOnePrivateChat } from "~/services/chat/findOnePrivateChat";
import { commonServices } from "~/services/common";

import { HydratedPrivateChatMongo, Message, PrivateChatMongo } from "~/types";

import { errors } from "~/variables";

const chatModels = models.native;

//REFACTOR: Separate createPrivateChat parts
const sendPrivateMessage = async (data: {
  currentUserId: string;
  messageText: string;
  participantId: string;
}) => {
  const targetParticipantId = await findTargetParticipantId(data.participantId);

  const newMessage = createNewMessage(data.messageText, data.currentUserId);

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

  if (!targetParticipant) throw errors.targetUserNotExist;

  return targetParticipant.userId;
};

const findPrivateChat = async (
  currentUserId: string,
  targetParticipantId: string
) => {
  const prop = "participants.participantId" as keyof PrivateChatMongo;

  return await findOnePrivateChat({
    [prop]: {
      $all: [currentUserId, targetParticipantId],
    },
  });
};

const createNewMessage = (messageText: string, currentUserId: string) => ({
  createdAt: Date.now(),
  messageText,
  messageId: randomMaker.id(chatModels.messageId.maxLength),
  sender: {
    senderId: currentUserId,
  },
});

const fixPrivateChat = async (data: {
  currentUserId: string;
  privateChat: HydratedPrivateChatMongo | null;
  targetParticipantId: string;
}) =>
  data.privateChat ||
  (await createPrivateChat({
    chatId: createChatId(),
    createdAt: Date.now(),
    currentParticipantId: data.currentUserId,
    targetParticipantId: data.targetParticipantId,
  }));

const createChatId = () => randomMaker.id(chatModels.chatId.maxLength);

const saveMessageOnPrivateChat = async (data: {
  newMessage: Message;
  privateChat: HydratedPrivateChatMongo;
}) => {
  data.privateChat.messages.push(data.newMessage);
  await data.privateChat.save();
};

export { sendPrivateMessage };
