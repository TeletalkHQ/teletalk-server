const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const chatModels = models.native.chat;

const { testVariables } = require("$/variables/testVariables");

const participantId = (
  { participantIdMain, participantIdTest } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(
      chatModels.participantId,
      participantIdMain,
      participantIdTest
    )
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

module.exports = { participantId };
