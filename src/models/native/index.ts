import { privateChatModels } from "~/models/native/privateChat";
import { commonModels } from "~/models/native/common";
import { userModels } from "~/models/native/user";

import { NativeModelCollection } from "~/types";

const nativeModels: NativeModelCollection = {
  ...privateChatModels,
  ...commonModels,
  ...userModels,
};

export { nativeModels };
