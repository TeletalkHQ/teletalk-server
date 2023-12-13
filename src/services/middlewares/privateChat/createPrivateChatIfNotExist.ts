import { UserId } from "teletalk-type-store";
import { randomMaker } from "utility-store";

import { models } from "~/models";
import { coreServices } from "~/services/privateChat/core";
import { HydratedUser, ServiceMiddleware } from "~/types";

export const createPrivateChatIfNotExist: ServiceMiddleware<
  {
    currentParticipant: HydratedUser;
    targetParticipantId: UserId;
  },
  void
> = async (data) => {
  const p = await coreServices.find({
    "participants.participantId": {
      $all: [data.currentParticipant.userId, data.targetParticipantId],
    },
  });

  if (!p) {
    await coreServices.create({
      chatId: randomMaker.id(models.native.chatId.maxLength),
      createdAt: Date.now(),
      currentParticipantId: data.currentParticipant.userId,
      targetParticipantId: data.targetParticipantId,
    });
  }
};
