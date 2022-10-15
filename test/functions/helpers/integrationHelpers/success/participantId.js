const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { models } = require("@/models/models");

const participantIdModel = models.native.chat.participantId;
const participantId = (
  { clientValue, responseValue } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  successTestBuilder
    .create()
    .setVariables(participantIdModel, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest();
};

module.exports = { participantId };
