const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const { testVariables } = require("$/variables/testVariables");

const chatModels = models.native.chat;

const messageId = (
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

module.exports = {
  messageId,
};
