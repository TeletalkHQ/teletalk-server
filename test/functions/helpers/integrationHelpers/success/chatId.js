const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const { testVariables } = require("$/variables/testVariables");

const chatModels = models.native.chat;

const chatId = (
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

module.exports = {
  chatId,
};
