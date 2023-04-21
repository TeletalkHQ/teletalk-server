import { privateChatModels } from "@/models/native/privateChat";
import { commonModels } from "@/models/native/common";
import { userModels } from "@/models/native/user";

const nativeModels = {
  ...privateChatModels,
  ...commonModels,
  ...userModels,
};

export { nativeModels };
