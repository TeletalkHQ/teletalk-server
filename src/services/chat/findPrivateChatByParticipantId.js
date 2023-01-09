const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { findPrivateChat } = require("@/services/chat/findPrivateChat");

const findPrivateChatByParticipantId = serviceBuilder
  .create()
  .body(async ({ participantId }) => {
    return await findPrivateChat().run({
      "participants.participantId": participantId,
    });
  })
  .build();

module.exports = { findPrivateChatByParticipantId };
