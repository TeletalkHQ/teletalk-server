const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const {
  chatModels: { messageIdModel },
} = require("@/models/dataModels/chatModels");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const messageIdSuccessTests = (
  { messageIdMain, messageIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(messageIdModel, messageIdMain, messageIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

//TODO Add message id fail tests

const messageIdFailureTests = () => {};

module.exports = {
  messageIdSuccessTests,
  messageIdFailureTests,
};
