const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const chatModels = models.native.chat;

const {
  chatErrors: {
    PARTICIPANT_ID_INVALID_TYPE,
    PARTICIPANT_ID_MAX_LENGTH_REACH,
    PARTICIPANT_ID_MIN_LENGTH_REACH,
    PARTICIPANT_ID_REQUIRED,
  },
} = require("@/variables/errors/chatErrors");

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
    .required(PARTICIPANT_ID_REQUIRED)
    .invalidType_typeIsString(PARTICIPANT_ID_INVALID_TYPE)
    .minlength(PARTICIPANT_ID_MIN_LENGTH_REACH)
    .maxlength(PARTICIPANT_ID_MAX_LENGTH_REACH);
};

module.exports = {
  participantIdFailureTests, // participantIdSuccessTests,
};
