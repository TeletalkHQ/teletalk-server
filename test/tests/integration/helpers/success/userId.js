const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const userIdSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.userId, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .addCommonTest()
    .run();
};

module.exports = { userIdSuccessTest };
