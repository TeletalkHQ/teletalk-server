const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

const {
  chatModels: { messageIdModel },
} = require("@/models/chatModels/chatModels");

const messageIdSuccessTests = (
  { chatIdMain, chatIdTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder
    .setVariables(messageIdModel, chatIdMain, chatIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const messageIdFailureTests = () => {};

module.exports = {
  messageIdSuccessTests,
  messageIdFailureTests,
};
