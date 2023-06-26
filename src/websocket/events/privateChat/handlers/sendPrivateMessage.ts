import { services } from "~/services";
import { SendPrivateMessageIO, SocketOnHandler } from "~/types";

const sendPrivateMessage: SocketOnHandler<SendPrivateMessageIO> = async (
  socket,
  data
) => {
  const { userId: currentUserId } = socket;
  const { participantId, messageText: text } = data;

  const { chatId, addedMessage } = await services.sendPrivateMessage({
    currentUserId,
    participantId,
    messageText: text,
  });

  socket.io
    .to(currentUserId)
    .to(participantId)
    //TODO: Use customEmit
    .emit("newPrivateChatMessage", { chatId, addedMessage });

  return {
    data: { chatId, addedMessage },
  };
};

export { sendPrivateMessage };
