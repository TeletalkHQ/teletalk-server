const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const userIdSuccessTest = (
  { requestValue, responseValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.userId, requestValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .addCommonTest()
    .run();
};

module.exports = { userIdSuccessTest };
