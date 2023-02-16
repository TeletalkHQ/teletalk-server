const { services } = require("@/services");

const getChatInfo = async (socket) => {
  const chat = await services
    .findPrivateChatByParticipantId({ participantId: socket.currentUserId })
    .exclude()
    .run({ currentUserId: socket.currentUserId });

  console.log(chat);
  return chat;
};

module.exports = { getChatInfo };
