import { models } from "~/models";
import { HydratedPrivateChatMongo } from "~/types";

const createPrivateChat = async (data: {
  chatId: string;
  createdAt: number;
  currentParticipantId: string;
  targetParticipantId: string;
}): Promise<HydratedPrivateChatMongo> => {
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
