import { services } from "@/services";

import { SocketOnHandler } from "@/types";
import { validators } from "@/validators";

const getPrivateChat: SocketOnHandler = async (_socket, data) => {
  await validators.chatId(data.chatId);

  const privateChat = await services.findOnePrivateChatByChatId(
    { chatId: data.chatId },
    undefined,
    { lean: true }
  );

  return { data: { privateChat } };
};

export { getPrivateChat };
