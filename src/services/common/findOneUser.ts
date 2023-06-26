import { UserData } from "utility-store/lib/types";

import { models } from "~/models";
import { PrivateChatService } from "~/types/models";

const User = models.database.mongoDb.User;

const findOneUser: PrivateChatService<
  Partial<UserData>,
  Promise<UserData | null>
> = async (data, projection, options) => {
  return await User.findOne(data, projection, options);
};

export { findOneUser };
