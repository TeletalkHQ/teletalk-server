const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

const {
  chatModels: { messageModel },
} = require("@/models/chatModels/chatModels");

const messageSuccessTests = (
  { messageMain, messageTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder
    .setVariables(messageModel, messageMain, messageTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};
const messageFailureTests = () => {};

module.exports = {
  messageSuccessTests,
  messageFailureTests,
};
