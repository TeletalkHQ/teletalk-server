const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const chatModels = models.native.chat;

const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const senderIdSuccessTests = (
  { participantIdMain, participantIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.senderId, participantIdMain, participantIdTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .execute();
};

//TODO Add fail tests for senderId

module.exports = { senderIdSuccessTests };
