import { models } from "@/models";

import { HydratedPrivateChatMongo, PrivateChatMongo } from "@/types";

const findOnePrivateChat = async (data: Partial<PrivateChatMongo>) => {
  return (await models.database.mongoDb.PrivateChat.findOne(
    data
  )) as HydratedPrivateChatMongo | null;
};

export { findOnePrivateChat };
