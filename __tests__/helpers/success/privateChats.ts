import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

import { PrivateChatMongo } from "@/types";

const chatModels = models.native.privateChat;

const privateChatsSuccessTest: SuccessTestExecutor = (
  { testValue },
  options
) => {
  const builder = successTestBuilder
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

export { privateChatsSuccessTest };
