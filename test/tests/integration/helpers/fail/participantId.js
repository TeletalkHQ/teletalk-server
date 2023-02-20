const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

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

module.exports = {
  participantIdFailTest,
};
