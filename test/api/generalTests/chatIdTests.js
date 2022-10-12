const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const {
  chatErrors: {
    CHAT_ID_INVALID_TYPE,
    CHAT_ID_MAX_LENGTH_REACH,
    CHAT_ID_MIN_LENGTH_REACH,
    CHAT_ID_REQUIRED,
  },
} = require("@/variables/errors/chatErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const chatModels = models.native.chat;

const chatIdSuccessTests = (
  { chatIdMain, chatIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
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
    .required(CHAT_ID_REQUIRED)
    .minlength(CHAT_ID_MIN_LENGTH_REACH)
    .maxlength(CHAT_ID_MAX_LENGTH_REACH)
    .invalidType_typeIsString(CHAT_ID_INVALID_TYPE);
};
module.exports = {
  chatIdSuccessTests,
  chatIdFailureTests,
};
