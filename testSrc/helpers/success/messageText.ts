import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const chatModels = models.native.privateChat;

const messageTextSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.messageText, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .run();
};

export { messageTextSuccessTest };
