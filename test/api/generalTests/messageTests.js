const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const {
  chatModels: { messageModel },
} = require("@/models/chatModels/chatModels");

const {
  chatErrors: {
    MESSAGE_TEXT_INVALID_TYPE,
    MESSAGE_TEXT_MAX_LENGTH_REACH,
    MESSAGE_TEXT_MIN_LENGTH_REACH,
    MESSAGE_TEXT_REQUIRED,
  },
} = require("@/variables/errors/chatErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const messageSuccessTests = (
  { messageMain, messageTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(messageModel, messageMain, messageTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const messageFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, messageModel, "message")
    .required(MESSAGE_TEXT_REQUIRED)
    .maxlength(MESSAGE_TEXT_MAX_LENGTH_REACH)
    .minlength(MESSAGE_TEXT_MIN_LENGTH_REACH)
    .invalidType_typeIsString(MESSAGE_TEXT_INVALID_TYPE);
};

module.exports = {
  messageSuccessTests,
  messageFailureTests,
};
