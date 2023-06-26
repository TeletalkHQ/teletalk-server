import { CreatedAt } from "utility-store/lib/types";

import { models } from "~/models";
import { HydratedPrivateChat } from "~/types/models";

const createPrivateChat = async (data: {
  chatId: string;
  createdAt: CreatedAt;
  currentParticipantId: string;
  targetParticipantId: string;
}): Promise<HydratedPrivateChat> => {
  return await models.database.mongoDb.PrivateChat.create({
    createdAt: data.createdAt,
    chatId: data.chatId,
    participants: [
      {
        participantId: data.currentParticipantId,
      },
      {
        participantId: data.targetParticipantId,
      },
    ],
  });
};

export { createPrivateChat };
