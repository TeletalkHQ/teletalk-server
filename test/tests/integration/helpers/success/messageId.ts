import { successTestBuilder } from "$/classes/SuccessTestBuilder";
import { testVariablesManager } from "$/classes/TestVariablesManager";

import { models } from "@/models";

const chatModels = models.native.chat;

const messageIdSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.messageId, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .run();
};

export { messageIdSuccessTest };
