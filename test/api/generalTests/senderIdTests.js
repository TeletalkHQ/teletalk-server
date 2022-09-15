const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const {
  chatModels: { senderIdModel },
} = require("@/models/dataModels/chatModels");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const senderIdSuccessTests = (
  { participantIdMain, participantIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(senderIdModel, participantIdMain, participantIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

//TODO Add fail tests for senderId

module.exports = { senderIdSuccessTests };
