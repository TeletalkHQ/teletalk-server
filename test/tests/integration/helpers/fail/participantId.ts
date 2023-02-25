import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const chatModels = models.native.chat;

const participantIdFailTest = (configuredRequester, data = {}) => {
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
    .empty.minlength()
    .maxlength();
};

export { participantIdFailTest };
