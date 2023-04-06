import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const chatModels = models.native.privateChat;

const messageIdAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(chatModels.messageId, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .run();
};

export { messageIdAssertionInitializer };
