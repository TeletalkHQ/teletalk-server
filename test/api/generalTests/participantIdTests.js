const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const chatModels = models.native.chat;

const { errors } = require("@/variables/errors/errors");

// const participantIdSuccessTests = (
//   { participantIdMain, participantIdTest } = {},
//   { stringEquality = true, modelCheck = true } = {
//     stringEquality: true,
//     modelCheck: true,
//   }
// ) => {
//   successTestBuilder
//     .setVariables(participantIdModel, participantIdMain, participantIdTest)
//     .setOptions({ modelCheck, stringEquality })
//     .buildCommonTest();
// };

const participantIdFailureTests = (configuredCustomRequest, data = {}) => {
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
  participantIdFailureTests, // participantIdSuccessTests,
};
