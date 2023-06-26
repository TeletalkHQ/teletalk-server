import { models } from "~/models";
import { PrivateChatData } from "~/types/datatypes";
import { HydratedPrivateChat, PrivateChatService } from "~/types/models";

const findOnePrivateChat: PrivateChatService<
  Partial<PrivateChatData>,
  Promise<HydratedPrivateChat | null>
> = async (data) => {
  return await models.database.mongoDb.PrivateChat.findOne(data);
};

export { findOnePrivateChat };
