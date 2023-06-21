import { services } from "~/services";
import { SocketOnHandler } from "~/types";

const sendPrivateMessage: SocketOnHandler = async (socket, data) => {
  const { userId: currentUserId } = socket;
  const { participantId, messageText } = data;

  const { chatId, addedMessage } = await services.sendPrivateMessage({
    currentUserId,
    participantId,
    messageText,
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
