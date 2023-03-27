import { services } from "@/services";

import { SocketOnHandler } from "@/types";

import { validators } from "@/validators";

const sendPrivateMessage: SocketOnHandler = async (socket, data) => {
  const { currentUserId } = socket;
  const { participantId, message } = data;

  await validators.participantId(participantId);
  await validators.messageText(message);

  const { chatId, newMessage } = await services.sendPrivateMessage({
    currentUserId,
    participantId,
    message,
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
