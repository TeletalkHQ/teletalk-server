const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models");

const { testVariables } = require("$/variables/testVariables");

const userModels = models.native.user;

const lastName = (
  { clientValue, responseValue } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  const ts = successTestBuilder
    .create()
    .setVariables(userModels.lastName, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality });

  ts.stringEquality()
    .typeCheck()
    .emptyCheck()
    .checkAndExecute(userModels.lastName.empty.value === false, () =>
      ts.lteCheck()
    )
    .execute();
};

module.exports = {
  lastName,
};
