const { testBuilder } = require("@/classes/TestBuilder");

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
    .create()
    .setVariables(senderIdModel, participantIdMain, participantIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

module.exports = { senderIdSuccessTests };
