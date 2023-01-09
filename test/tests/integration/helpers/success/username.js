const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const usernameSuccessTest = (
  { equalValue, testValue },
  {
    modelCheck = true,
    stringEquality = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.username, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality });

  builder.stringEquality().typeCheck().lteCheck();

  if (equalValue) builder.gteCheck();

  builder.run();
};

module.exports = { usernameSuccessTest };
