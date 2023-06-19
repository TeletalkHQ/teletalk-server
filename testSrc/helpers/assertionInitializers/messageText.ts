import { models } from "~/models";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

const chatModels = models.native;

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
