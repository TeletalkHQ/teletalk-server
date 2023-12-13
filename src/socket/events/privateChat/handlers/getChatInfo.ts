import { GetChatInfoIO } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getChatInfo: SocketOnHandler<GetChatInfoIO> = async (
  _socket,
  data
) => {
  const privateChat = await services.privateChat.findByChatId({
    chatId: data.chatId,
  });

  if (!privateChat) throw errorStore.find("PRIVATE_CHAT_NOT_EXIST");

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
