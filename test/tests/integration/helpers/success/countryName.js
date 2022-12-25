const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const countryNameSuccessTest = (
  { requestValue, responseValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.countryName, requestValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .run();
};

module.exports = { countryNameSuccessTest };
