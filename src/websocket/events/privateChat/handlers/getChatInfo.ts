import { services } from "@/services";

const getChatInfo = async (_socket, _io, data) => {
  const { messages, ...chatInfo } = await services
    .findOnePrivateChatByChatId()
    .exclude()
    .run({ chatId: data.chatId });

  return { chatInfo };
};

export { getChatInfo };
