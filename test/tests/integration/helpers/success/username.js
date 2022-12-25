const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const usernameSuccessTest = (
  { requestValue, responseValue },
  {
    modelCheck = true,
    stringEquality = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.username, requestValue, responseValue)
    .setOptions({ modelCheck, stringEquality });

  builder.stringEquality().typeCheck().lteCheck();

  if (requestValue) builder.gteCheck();

  builder.run();
};

module.exports = { usernameSuccessTest };
