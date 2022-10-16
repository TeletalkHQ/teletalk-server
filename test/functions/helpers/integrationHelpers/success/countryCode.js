const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const { testVariables } = require("$/variables/testVariables");

const countryCode = (
  { clientValue, responseValue } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.countryCode, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .execute();
};

module.exports = { countryCode };
