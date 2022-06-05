const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

const {
  chatModels: { senderIdModel },
} = require("@/models/chatModels/chatModels");

const senderIdSuccessTests = (
  { participantIdMain, participantIdTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder
    .setVariables(senderIdModel, participantIdMain, participantIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

module.exports = { senderIdSuccessTests };
