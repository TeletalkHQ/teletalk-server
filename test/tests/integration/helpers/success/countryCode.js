const { successTestBuilder } = require("$/classes/SuccessTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const { testVariablesManager } = require("$/classes/TestVariablesManager");

const countryCodeSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.countryCode, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .run();
};

module.exports = { countryCodeSuccessTest };
