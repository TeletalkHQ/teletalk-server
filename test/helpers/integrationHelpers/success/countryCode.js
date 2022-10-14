const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const userModels = models.native.user;

const { testVariables } = require("$/variables/testVariables");

const countryCode = (
  { countryCodeMain, countryCodeTest } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.countryCode, countryCodeMain, countryCodeTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .execute();
};

module.exports = { countryCode };
