const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { models } = require("@/models/models");

const participantIdModel = models.native.chat.participantId;
const participantId = (
  { participantIdMain, participantIdTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  successTestBuilder
    .create()
    .setVariables(participantIdModel, participantIdMain, participantIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest();
};

module.exports = { participantId };
