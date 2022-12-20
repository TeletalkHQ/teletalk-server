const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const chatModels = models.native.chat;

const participantId = (configuredCustomRequest, data = {}) => {
  failTestBuilder
    .create(
      configuredCustomRequest,
      data,
      chatModels.participantId,
      "participantId"
    )
    .required(errors.PARTICIPANT_ID_REQUIRED)
    .invalidType_typeIsString(errors.PARTICIPANT_ID_INVALID_TYPE)
    .minlength(errors.PARTICIPANT_ID_MIN_LENGTH_REACH)
    .maxlength(errors.PARTICIPANT_ID_MAX_LENGTH_REACH);
};

module.exports = {
  participantId,
};
