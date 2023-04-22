import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const sendPrivateMessage: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const { participantId, messageText } = data;

  const { chatId, newMessage } = await services.sendPrivateMessage({
    currentUserId,
    participantId,
    messageText,
  });

  socket.io
    .to(currentUserId)
    .to(participantId)
    //TODO: Use customEmit
    .emit("newPrivateChatMessage", { chatId, newMessage });

  return {
    data: { chatId, newMessage },
  };
};

export { sendPrivateMessage };
