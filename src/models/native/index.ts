import { commonModels } from "~/models/native/common";
import { privateChatModels } from "~/models/native/privateChat";
import { userModels } from "~/models/native/user";
import { NativeModelCollection } from "~/types";

const nativeModels: NativeModelCollection = {
  ...privateChatModels,
  ...commonModels,
  ...userModels,
};

export { nativeModels };
