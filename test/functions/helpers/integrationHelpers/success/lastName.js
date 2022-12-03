const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const userModels = models.native.user;

const lastName = (
  { clientValue, responseValue } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.lastName, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality });

  builder
    .stringEquality()
    .typeCheck()
    .emptyCheck()
    .checkAndExecute(userModels.lastName.empty.value === false, () =>
      builder.lteCheck()
    )
    .execute();
};

module.exports = {
  lastName,
};
