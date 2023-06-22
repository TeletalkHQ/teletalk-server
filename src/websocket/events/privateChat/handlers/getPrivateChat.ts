import { services } from "~/services";
import { SocketOnHandler } from "~/types";

const getPrivateChat: SocketOnHandler = async (_socket, data) => {
  const privateChat = await services.findOnePrivateChatByChatId(
    { chatId: data.chatId },
    undefined,
    { lean: true }
  );

  return { data: { privateChat } };
};

export { getPrivateChat };
