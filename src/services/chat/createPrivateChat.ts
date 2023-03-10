import { models } from "@/models";

interface Data {
  chatId: string;
  createdAt: number;
  currentParticipantId: string;
  targetParticipantId: string;
}

const createPrivateChat = async (data: Data) => {
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
