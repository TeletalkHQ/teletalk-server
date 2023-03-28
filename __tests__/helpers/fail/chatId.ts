import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

const chatModels = models.native.privateChat;

const chatIdFailTest: FailTestExecutor = (configuredRequester, data = {}) => {
  failTestBuilder
    .create(configuredRequester, data, chatModels.chatId, "chatId")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minlength()
    .maxlength();
};
export { chatIdFailTest };
