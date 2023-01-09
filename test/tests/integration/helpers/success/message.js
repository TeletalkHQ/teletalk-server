const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const chatModels = models.native.chat;

const messageSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.message, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .run();
};

module.exports = {
  messageSuccessTest,
};
