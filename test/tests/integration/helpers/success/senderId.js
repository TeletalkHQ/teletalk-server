const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const chatModels = models.native.chat;

const participantIdSuccessTest = (
  { requestValue, responseValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.participantId, requestValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .run();
};

module.exports = { participantIdSuccessTest };
