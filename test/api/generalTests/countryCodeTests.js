const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const {
  getNonExistedCountryCode,
} = require("@/functions/utilities/testUtilities");

const { models } = require("@/models/models");

const userModels = models.native.user;

const { errors } = require("@/variables/errors/errors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const countryCodeSuccessTests = (
  { countryCodeMain, countryCodeTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.countryCode, countryCodeMain, countryCodeTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .execute();
};

const countryCodeFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(
      configuredCustomRequest,
      data,
      userModels.countryCode,
      "countryCode"
    )
    .required(errors.COUNTRY_CODE_REQUIRED)
    .numeric(errors.COUNTRY_CODE_NUMERIC)
    .invalidType_typeIsString(errors.COUNTRY_CODE_INVALID_TYPE)
    .minlength(errors.COUNTRY_CODE_MINLENGTH_REACH)
    .maxlength(errors.COUNTRY_CODE_MAXLENGTH_REACH)
    .custom(getNonExistedCountryCode(), errors.COUNTRY_CODE_NOT_SUPPORTED);
};

module.exports = { countryCodeFailureTests, countryCodeSuccessTests };
