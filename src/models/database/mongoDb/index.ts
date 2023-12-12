import { PrivateChatModel } from "~/models/database/mongoDb/PrivateChat";
import { UserModel } from "~/models/database/mongoDb/User";

export const mongoDb = {
  PrivateChat: PrivateChatModel,
  User: UserModel,
};
