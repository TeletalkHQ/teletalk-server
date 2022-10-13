const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const { errors } = require("@/variables/errors/errors");
const { testVariables } = require("$/variables/testVariables");

const userModels = models.native.user;

const phoneNumberSuccessTests = (
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

const phoneNumberFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(
      configuredCustomRequest,
      data,
      userModels.phoneNumber,
      "phoneNumber"
    )
    .required(errors.PHONE_NUMBER_REQUIRED)
    .invalidType_typeIsString(errors.PHONE_NUMBER_INVALID_TYPE)
    .numeric(errors.PHONE_NUMBER_NUMERIC)
    .minlength(errors.PHONE_NUMBER_MINLENGTH_REACH)
    .maxlength(errors.PHONE_NUMBER_MAXLENGTH_REACH);
};

module.exports = { phoneNumberFailureTests, phoneNumberSuccessTests };
