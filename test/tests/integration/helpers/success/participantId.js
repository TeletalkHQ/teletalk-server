const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { models } = require("@/models");

const participantIdModel = models.native.chat.participantId;
const participantIdSuccessTest = (
  { requestValue, responseValue },
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  successTestBuilder
    .create()
    .setVariables(participantIdModel, requestValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest();
};

module.exports = { participantIdSuccessTest };
