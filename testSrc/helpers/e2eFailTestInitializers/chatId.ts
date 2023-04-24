import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

const chatModels = models.native;

const chatIdE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, chatModels.chatId, "chatId")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minLength()
    .maxLength();
};
export { chatIdE2eFailTestInitializer };
