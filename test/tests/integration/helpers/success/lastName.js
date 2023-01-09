const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const lastNameSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.lastName, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality });

  builder
    .stringEquality()
    .typeCheck()
    .emptyCheck()
    .addIf(userModels.lastName.empty.value === false, () => builder.lteCheck())
    .run();
};

module.exports = {
  lastNameSuccessTest,
};
