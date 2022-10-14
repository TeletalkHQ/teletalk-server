const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const userModels = models.native.user;

const { testVariables } = require("$/variables/testVariables");

const firstName = (
  { firstNameMain, firstNameTest } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.firstName, firstNameMain, firstNameTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .execute();
};

module.exports = { firstName };
