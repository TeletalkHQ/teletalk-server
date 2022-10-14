const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const { testVariables } = require("$/variables/testVariables");

const userModels = models.native.user;

const phoneNumber = (
  { phoneNumberMain, phoneNumberTest } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.phoneNumber, phoneNumberMain, phoneNumberTest)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .numericCheck()
    .addCommonTest()
    .execute();
};

module.exports = { phoneNumber };
