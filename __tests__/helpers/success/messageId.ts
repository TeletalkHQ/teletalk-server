import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const chatModels = models.native.privateChat;

const messageIdSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.messageId, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .run();
};

export { messageIdSuccessTest };
