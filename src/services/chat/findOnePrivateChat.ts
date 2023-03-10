import { models } from "@/models";

import { PrivateChatMongo } from "@/types";

const findOnePrivateChat = async (data: Partial<PrivateChatMongo>) => {
  return await models.database.mongoDb.PrivateChat.findOne(data);
};

export { findOnePrivateChat };
