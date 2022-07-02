const { testBuilder } = require("@/classes/TestBuilder");

const {
  chatModels: { messageIdModel },
} = require("@/models/chatModels/chatModels");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const messageIdSuccessTests = (
  { messageIdMain, messageIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  testBuilder
    .create()
    .setVariables(messageIdModel, messageIdMain, messageIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

const messageIdFailureTests = () => {};

module.exports = {
  messageIdSuccessTests,
  messageIdFailureTests,
};
