import { models } from "@/models";
import { PrivateChatService, UserMongo } from "@/types";

const User = models.database.mongoDb.User;

const findOneUser: PrivateChatService<
  Partial<UserMongo>,
  Promise<UserMongo | null>
> = async (data, projection, options) => {
  return await User.findOne(data, projection, options);
};

export { findOneUser };
