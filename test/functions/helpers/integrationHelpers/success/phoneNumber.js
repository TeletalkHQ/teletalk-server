const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models");

const { testVariables } = require("$/variables/testVariables");

const userModels = models.native.user;

const phoneNumber = (
  { clientValue, responseValue } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.phoneNumber, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .numericCheck()
    .addCommonTest()
    .execute();
};

module.exports = { phoneNumber };
