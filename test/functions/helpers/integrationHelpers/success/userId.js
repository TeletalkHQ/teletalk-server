const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const userId = (
  { clientValue, responseValue } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.userId, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .addCommonTest()
    .execute();
};

module.exports = { userId };
