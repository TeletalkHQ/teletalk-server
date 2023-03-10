import { models } from "@/models";

import { PrivateChatMongo } from "@/types";

const findPrivateChat = async (data: Partial<PrivateChatMongo>) => {
  return await models.database.mongoDb.PrivateChat.find(data);
};

export { findPrivateChat };
