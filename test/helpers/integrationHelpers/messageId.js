const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const { testVariables } = require("$/variables/testVariables");

const chatModels = models.native.chat;

const messageIdSuccessTests = (
  { messageIdMain, messageIdTest } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.messageId, messageIdMain, messageIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

//TODO Add message id fail tests

const messageIdFailureTests = () => {};

module.exports = {
  messageIdSuccessTests,
  messageIdFailureTests,
};
