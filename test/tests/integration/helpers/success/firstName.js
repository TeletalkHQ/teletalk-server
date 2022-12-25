const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const firstNameSuccessTest = (
  { requestValue, responseValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.firstName, requestValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .run();
};

module.exports = { firstNameSuccessTest };
