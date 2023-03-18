import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const chatModels = models.native.chat;

const chatIdFailTest = (configuredRequester, data = {}) => {
  failTestBuilder
    .create(configuredRequester, data, chatModels.chatId, "chatId")
    .missing()
    .overload()
    .invalidType()
    .empty.minlength()
    .maxlength();
};
export { chatIdFailTest };
