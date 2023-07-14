import { randomMaker } from "utility-store";
import { UserId } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";
import { createPrivateChat } from "~/services/chat/createPrivateChat";
import { findOnePrivateChat } from "~/services/chat/findOnePrivateChat";
import { findOneUser } from "~/services/user/findOneUser";
import { PrivateChatService } from "~/types";
import { MessageItem, MessageText } from "~/types/datatypes";
import { HydratedPrivateChat } from "~/types/models";

const chatModels = models.native;

//REFACTOR: Separate createPrivateChat parts
export const sendPrivateMessage: PrivateChatService<
  {
    currentUserId: UserId;
    messageText: MessageText;
    participantId: UserId;
  },
  { chatId: string; addedMessage: MessageItem }
> = async (data) => {
  const targetParticipantId = await findTargetParticipantId(data.participantId);

  const addedMessage = createNewMessage(data.messageText, data.currentUserId);

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
    addedMessage,
    privateChat: fixedPrivateChat,
  });

  return {
    chatId: fixedPrivateChat.chatId,
    addedMessage,
  };
};

const findTargetParticipantId = async (participantId: UserId) => {
  const targetParticipant = await findOneUser({
    userId: participantId,
  });

  if (!targetParticipant) throw errorStore.find("TARGET_USER_NOT_EXIST");

  return targetParticipant.userId;
};

const findPrivateChat = (
  currentUserId: string,
  targetParticipantId: string
) => {
  return findOnePrivateChat({
    ["participants.participantId"]: {
      $all: [currentUserId, targetParticipantId],
    },
  });
};

const createNewMessage = (messageText: string, currentUserId: UserId) =>
  ({
    createdAt: Date.now(),
    messageText,
    messageId: randomMaker.id(chatModels.messageId.maxLength),
    sender: {
      senderId: currentUserId,
    },
  } as MessageItem);

const fixPrivateChat = async (data: {
  currentUserId: UserId;
  privateChat: HydratedPrivateChat | null;
  targetParticipantId: UserId;
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
  addedMessage: MessageItem;
  privateChat: HydratedPrivateChat;
}) => {
  data.privateChat.messages.push(data.addedMessage);
  await data.privateChat.save();
};
