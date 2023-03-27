import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const getPrivateChats: SocketOnHandler = async (socket) => {
  const privateChats = await services.findPrivateChatByParticipantId(
    {
      participantId: socket.currentUserId,
    },
    undefined,
    { lean: true }
  );

  return { data: { privateChats } };
};

export { getPrivateChats };
