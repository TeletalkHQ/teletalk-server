import { models } from "~/models";
import { PrivateChatData } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

const chatModels = models.native;

const privateChatsAssertionInitializer: AssertionInitializer = (
  { testValue },
  _options
) => {
  const builder = assertionInitializer.create();
  //   .setModel(chatModels.privateChats)
  //   .setTestValue(testValue)
  //   .setOptions(options);

  // builder.typeCheck().run();

  testValue.forEach((privateChat: PrivateChatData) => {
    builder
      .customTypeCheck(privateChat, "object")
      //TODO: Add all parts
      .setModel(chatModels.chatId)
      .setTestValue(privateChat.chatId)
      .typeCheck()
      .gteCheck()
      .lteCheck()
      .run();
  });
};

export { privateChatsAssertionInitializer };
