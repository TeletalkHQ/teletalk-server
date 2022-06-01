const { testBuilder } = require("@/functions/testUtilities/TestBuilder");
const {
  chatModels: { chatIdModel },
} = require("@/models/chatModels/chatModels");

const chatIdSuccessTests = (
  { chatIdMain, chatIdTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder
    .setVariables(chatIdModel, chatIdMain, chatIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const chatIdFailureTests = () => {};

module.exports = {
  chatIdSuccessTests,
  chatIdFailureTests,
};
