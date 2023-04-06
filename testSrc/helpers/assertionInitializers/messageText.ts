import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const chatModels = models.native.privateChat;

const messageTextAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(chatModels.messageText, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .run();
};

export { messageTextAssertionInitializer };
