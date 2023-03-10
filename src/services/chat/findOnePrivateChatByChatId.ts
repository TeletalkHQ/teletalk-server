import { models } from "@/models";

const findOnePrivateChatByChatId = async (data: { chatId: string }) =>
  await models.database.mongoDb.PrivateChat.findOne({ chatId: data.chatId });

export { findOnePrivateChatByChatId };
