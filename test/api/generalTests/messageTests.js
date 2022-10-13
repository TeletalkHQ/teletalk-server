const { failTestBuilder } = require("@/classes/FailTestBuilder");
const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const { errors } = require("@/variables/errors/errors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const chatModels = models.native.chat;

const messageSuccessTests = (
  { messageMain, messageTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.message, messageMain, messageTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const messageFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, chatModels.message, "message")
    .required(errors.MESSAGE_TEXT_REQUIRED)
    .maxlength(errors.MESSAGE_TEXT_MAX_LENGTH_REACH)
    .minlength(errors.MESSAGE_TEXT_MIN_LENGTH_REACH)
    .invalidType_typeIsString(errors.MESSAGE_TEXT_INVALID_TYPE);
};

module.exports = {
  messageSuccessTests,
  messageFailureTests,
};
