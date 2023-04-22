import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

import { PrivateChatMongo } from "@/types";

const chatModels = models.native;

const privateChatsAssertionInitializer: AssertionInitializer = (
  { testValue },
  options
) => {
  const builder = assertionInitializer
    .create()
    .setModel(chatModels.privateChats)
    .setTestValue(testValue)
    .setOptions(options);

  builder.typeCheck().run();

  testValue.forEach((privateChat: PrivateChatMongo) => {
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
