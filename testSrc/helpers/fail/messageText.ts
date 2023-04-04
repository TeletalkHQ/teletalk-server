import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

const chatModels = models.native.privateChat;

const messageTextFailTest: FailTestExecutor = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, chatModels.messageText, "messageText")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .maxlength()
    .minlength();
};

export { messageTextFailTest };
