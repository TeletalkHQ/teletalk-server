import { UserId } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { coreServices } from "~/services/privateChat/core";
import { ChatId, HydratedPrivateChat, ServiceMiddleware } from "~/types";

export const throwIfPrivateChatExist: ServiceMiddleware<
  {
    currentParticipantId?: UserId;
    targetParticipantId?: UserId;
    chatId?: ChatId;
  },
  void
> = async (data) => {
  let p: HydratedPrivateChat | null;

  if (data.chatId) {
    p = await coreServices.find({
      chatId: data.chatId,
    });
  } else if (data.currentParticipantId && data.targetParticipantId) {
    p = await coreServices.find({
      ["participants.participantId"]: {
        $all: [data.currentParticipantId, data.targetParticipantId],
      },
    });
  }

  if (p!) throw errorStore.find("PRIVATE_CHAT_EXIST");
};
