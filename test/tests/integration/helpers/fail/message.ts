import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const chatModels = models.native.chat;

const messageFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, chatModels.message, "message")
    .missing()
    .overload()
    .invalidType()
    .empty.maxlength()
    .minlength();
};

export { messageFailTest };
