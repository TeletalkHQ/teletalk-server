import { commonModels } from "~/models/native/common";
import { privateChatModels } from "~/models/native/privateChat";
import { userModels } from "~/models/native/user";

export const nativeModels = {
  ...privateChatModels,
  ...commonModels,
  ...userModels,
};
