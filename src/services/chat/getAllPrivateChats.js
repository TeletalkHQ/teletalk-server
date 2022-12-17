const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const PrivateChat = models.database.mongoDb.PrivateChat;

const getAllPrivateChats = serviceBuilder
  .create()
  .body(async ({ currentUserId }) => {
    return await PrivateChat.find({
      "participants.participantId": currentUserId,
    });
  })
  .build();

module.exports = { getAllPrivateChats };
