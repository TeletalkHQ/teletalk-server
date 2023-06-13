import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "~/models";

import { E2eFailTestInitializer } from "$/types";

const chatModels = models.native;

const participantIdE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  e2eFailTestInitializer
    .create(
      configuredRequester,
      data,
      chatModels.participantId,
      "participantId"
    )
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minLength()
    .maxLength();
};

export { participantIdE2eFailTestInitializer };
