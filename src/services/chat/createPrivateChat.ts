import { serviceBuilder } from "@/classes/service/ServiceBuilder";

import { models } from "@/models";

const PrivateChat = models.database.mongoDb.PrivateChat;

const createPrivateChat = serviceBuilder
  .create()
  .body(async (data) => {
    return await PrivateChat.create({
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
  })
  .build();

export { createPrivateChat };
