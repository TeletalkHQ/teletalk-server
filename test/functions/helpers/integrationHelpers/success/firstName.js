const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const { testVariables } = require("$/variables/testVariables");

const firstName = (
  { clientValue, responseValue } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.firstName, clientValue, responseValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .execute();
};

module.exports = { firstName };
