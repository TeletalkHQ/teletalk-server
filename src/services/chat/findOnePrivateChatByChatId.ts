import { models } from "~/models";
import { HydratedPrivateChatMongo, PrivateChatService } from "~/types";

const findOnePrivateChatByChatId: PrivateChatService<
  {
    chatId: string;
  },
  Promise<HydratedPrivateChatMongo | null>
> = async (data, projection, options) => {
  return await models.database.mongoDb.PrivateChat.findOne(
    { chatId: data?.chatId },
    projection,
    options
  );
};

export { findOnePrivateChatByChatId };
