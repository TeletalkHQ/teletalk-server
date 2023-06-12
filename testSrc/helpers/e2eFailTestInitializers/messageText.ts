import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "~/models";

import { E2eFailTestInitializer } from "$/types";

const chatModels = models.native;

const messageTextE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, chatModels.messageText, "messageText")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .maxLength()
    .minLength();
};

export { messageTextE2eFailTestInitializer };
