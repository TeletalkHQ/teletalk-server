import { services } from "@/services";

const getChatInfo = async (_socket, _io, data) => {
  const { messages, ...chatInfo } = await services.findOnePrivateChatByChatId({
    chatId: data.chatId,
  });

  return { chatInfo };
};

export { getChatInfo };
