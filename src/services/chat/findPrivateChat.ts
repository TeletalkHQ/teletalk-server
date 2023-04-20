import { models } from "@/models";

import { HydratedPrivateChatMongo, PrivateChatService } from "@/types";

const findPrivateChat: PrivateChatService<
  Partial<HydratedPrivateChatMongo>,
  Promise<HydratedPrivateChatMongo[] | null>
> = async (data, projection, options) => {
  return await models.database.mongoDb.PrivateChat.find(
    data,
    projection,
    options
  );
};

export { findPrivateChat };
