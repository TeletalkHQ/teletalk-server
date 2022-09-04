const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const {
  userModels: { phoneNumberModel },
} = require("@/models/userModels/userModels");
const {
  userErrors: {
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_NUMERIC,
    PHONE_NUMBER_REQUIRED,
  },
} = require("@/variables/errors/userErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const phoneNumberSuccessTests = (
  { phoneNumberMain, phoneNumberTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(phoneNumberModel, phoneNumberMain, phoneNumberTest)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .numericCheck()
    .addCommonTest()
    .execute();
};

const phoneNumberFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, phoneNumberModel, "phoneNumber")
    .required(PHONE_NUMBER_REQUIRED)
    .invalidType_typeIsString(PHONE_NUMBER_INVALID_TYPE)
    .numeric(PHONE_NUMBER_NUMERIC)
    .minlength(PHONE_NUMBER_MINLENGTH_REACH)
    .maxlength(PHONE_NUMBER_MAXLENGTH_REACH);
};

module.exports = { phoneNumberFailureTests, phoneNumberSuccessTests };
