import { services } from "@/services";

const getPrivateChats = async (socket) => {
  const privateChats = await services
    .findPrivateChatByParticipantId()
    .exclude()
    .run({ participantId: socket.currentUserId });

  return { privateChats };
};

export { getPrivateChats };
