const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const PrivateChat = models.database.mongoDb.PrivateChat;

const createPrivateChat = serviceBuilder
  .create()
  .body(async (data) => {
    return await PrivateChat.create({
      chatId: data.chatId,
      participants: [
        {
          participantId: data.currentUserId,
        },
        {
          participantId: data.targetUserId,
        },
      ],
    });
  })
  .build();

module.exports = {
  createPrivateChat,
};
