import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "~/models";

import { AssertionInitializer } from "$/types";

const chatModels = models.native;

const chatIdAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(chatModels.chatId, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .run();
};

export { chatIdAssertionInitializer };
