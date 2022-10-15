const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const chatModels = models.native.chat;

const { testVariables } = require("$/variables/testVariables");

const participantId = (
  { clientValue, responseValue } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.participantId, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

module.exports = { participantId };
