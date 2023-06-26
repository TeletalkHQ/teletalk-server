import { services } from "~/services";
import { GetPrivateChatsIO, SocketOnHandler } from "~/types";

const getPrivateChats: SocketOnHandler<GetPrivateChatsIO> = async (socket) => {
  const privateChats = (await services.findPrivateChatByParticipantId(
    {
      participantId: socket.userId,
    },
    undefined,
    { lean: true }
  ))!;

  return { data: { privateChats } };
};

export { getPrivateChats };
