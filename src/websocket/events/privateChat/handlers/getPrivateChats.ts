const { services } = require("@/services");

const getPrivateChats = async (socket) => {
  const privateChats = await services
    .findPrivateChatByParticipantId()
    .exclude()
    .run({ participantId: socket.currentUserId });

  return { privateChats };
};

module.exports = { getPrivateChats };
