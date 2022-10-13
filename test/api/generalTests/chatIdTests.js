const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const { errors } = require("@/variables/errors/errors");
const { testVariables } = require("$/variables/testVariables");

const chatModels = models.native.chat;

const chatIdSuccessTests = (
  { chatIdMain, chatIdTest } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.chatId, chatIdMain, chatIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const chatIdFailureTests = (configuredCustomRequest, data = {}) => {
  failTestBuilder
    .create(configuredCustomRequest, data, chatModels.chatId, "chatId")
    .required(errors.CHAT_ID_REQUIRED)
    .minlength(errors.CHAT_ID_MIN_LENGTH_REACH)
    .maxlength(errors.CHAT_ID_MAX_LENGTH_REACH)
    .invalidType_typeIsString(errors.CHAT_ID_INVALID_TYPE);
};
module.exports = {
  chatIdSuccessTests,
  chatIdFailureTests,
};
