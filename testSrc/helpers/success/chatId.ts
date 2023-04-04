import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const chatModels = models.native.privateChat;

const chatIdSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.chatId, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .run();
};

export { chatIdSuccessTest };
