import { services } from "~/services";
import { GetChatInfoIO, SocketOnHandler } from "~/types";
import { errors } from "~/variables";

const getChatInfo: SocketOnHandler<GetChatInfoIO> = async (_socket, data) => {
  const privateChat = await services.findOnePrivateChatByChatId({
    chatId: data.chatId,
  });

  if (!privateChat) throw errors.chatNotExist;

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
