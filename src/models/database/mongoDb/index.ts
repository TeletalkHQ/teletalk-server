import { PrivateChatModel } from "~/models/database/mongoDb/PrivateChat";
import { UserModel } from "~/models/database/mongoDb/User";

const mongoDb = {
  PrivateChat: PrivateChatModel,
  User: UserModel,
};

export { mongoDb };
