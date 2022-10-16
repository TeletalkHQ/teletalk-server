const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models");

const { testVariables } = require("$/variables/testVariables");

const chatModels = models.native.chat;

const message = (
  { clientValue, responseValue } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.message, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

module.exports = {
  message,
};
