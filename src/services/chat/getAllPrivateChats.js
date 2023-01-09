const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const {
  findPrivateChatByParticipantId,
} = require("@/services/chat/findPrivateChatByParticipantId");

const getAllPrivateChats = serviceBuilder
  .create()
  .body(async ({ currentUserId }) => {
    return await findPrivateChatByParticipantId().run({
      participantId: currentUserId,
    });
  })
  .build();

module.exports = {
  getAllPrivateChats,
};
