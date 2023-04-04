import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

const chatModels = models.native.privateChat;

const participantIdFailTest: FailTestExecutor = (
  configuredRequester,
  data = {}
) => {
  failTestBuilder
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
    .minlength()
    .maxlength();
};

export { participantIdFailTest };
