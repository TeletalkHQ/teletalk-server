import { services } from "@/services";

import { validators } from "@/validators";

const sendPrivateMessage = async (socket, io, data) => {
  const { currentUserId } = socket;
  const { participantId, message } = data;

  await validators.participantId(participantId);
  await validators.messageText(message);

  const { chatId, newMessage } = await await services
    .sendPrivateMessage()
    .run({ currentUserId, participantId, message });

  io.to(currentUserId)
    .to(participantId)
    //TODO: Use customEmit
    .emit("newPrivateChatMessage", { chatId, newMessage });
};

export { sendPrivateMessage };
