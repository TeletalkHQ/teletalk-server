const { testBuilder } = require("@/classes/TestBuilder");

const {
  chatModels: { senderIdModel },
} = require("@/models/chatModels/chatModels");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const senderIdSuccessTests = (
  { participantIdMain, participantIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  testBuilder
    .create()
    .setVariables(senderIdModel, participantIdMain, participantIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

module.exports = { senderIdSuccessTests };
