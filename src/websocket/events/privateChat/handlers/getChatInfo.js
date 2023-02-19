const { services } = require("@/services");

const getChatInfo = async (_socket, _io, data) => {
  const { messages, ...chatInfo } = await services
    .findOnePrivateChatByChatId()
    .exclude()
    .run({ chatId: data.chatId });

  return { chatInfo };
};

module.exports = { getChatInfo };
