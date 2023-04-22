import { services } from "@/services";

import { SocketOnHandler } from "@/types";

import { ERRORS } from "@/variables";

const getChatInfo: SocketOnHandler = async (_socket, data) => {
  const privateChat = await services.findOnePrivateChatByChatId({
    chatId: data.chatId,
  });

  if (!privateChat) throw ERRORS.CHAT_NOT_EXIST;

  const { chatId, createdAt, participants } = privateChat;

  return {
    data: {
      chatInfo: {
        chatId,
        createdAt,
        participants,
      },
    },
  };
};

export { getChatInfo };
