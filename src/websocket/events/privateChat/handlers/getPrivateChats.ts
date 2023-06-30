import { services } from "~/services";
import { GetPrivateChatsIO, SocketOnHandler } from "~/types";

export const getPrivateChats: SocketOnHandler<GetPrivateChatsIO> = async (
  socket
) => {
  const privateChats = (await services.findPrivateChatsByParticipantId(
    {
      participantId: socket.userId,
    },
    undefined,
    { lean: true }
  ))!;

  return { data: { privateChats } };
};
