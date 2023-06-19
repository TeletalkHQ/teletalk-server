import { models } from "~/models";
import {
  HydratedPrivateChatMongo,
  PrivateChatMongo,
  PrivateChatService,
} from "~/types";

const findOnePrivateChat: PrivateChatService<
  Partial<PrivateChatMongo>,
  Promise<HydratedPrivateChatMongo | null>
> = async (data) => {
  return await models.database.mongoDb.PrivateChat.findOne(data);
};

export { findOnePrivateChat };
