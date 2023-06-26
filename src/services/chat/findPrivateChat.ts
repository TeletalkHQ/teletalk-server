import { models } from "~/models";
import { HydratedPrivateChat, PrivateChatService } from "~/types/models";

const findPrivateChat: PrivateChatService<
  Partial<HydratedPrivateChat>,
  Promise<HydratedPrivateChat[] | null>
> = async (data, projection, options) => {
  return await models.database.mongoDb.PrivateChat.find(
    data,
    projection,
    options
  );
};

export { findPrivateChat };
