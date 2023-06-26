import { models } from "~/models";
import { HydratedPrivateChat, PrivateChatService } from "~/types/models";

const findOnePrivateChatByChatId: PrivateChatService<
  {
    chatId: string;
  },
  Promise<HydratedPrivateChat | null>
> = async (data, projection, options) => {
  return await models.database.mongoDb.PrivateChat.findOne(
    { chatId: data?.chatId },
    projection,
    options
  );
};

export { findOnePrivateChatByChatId };
