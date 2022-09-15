const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const {
  getNonExistedCountryCode,
} = require("@/functions/utilities/testUtilities");

const {
  userModels: { countryCodeModel },
} = require("@/models/dataModels/userModels");

const {
  userErrors: {
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_NOT_SUPPORTED,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
  },
} = require("@/variables/errors/userErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const countryCodeSuccessTests = (
  { countryCodeMain, countryCodeTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(countryCodeModel, countryCodeMain, countryCodeTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .execute();
};

const countryCodeFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, countryCodeModel, "countryCode")
    .required(COUNTRY_CODE_REQUIRED)
    .numeric(COUNTRY_CODE_NUMERIC)
    .invalidType_typeIsString(COUNTRY_CODE_INVALID_TYPE)
    .minlength(COUNTRY_CODE_MINLENGTH_REACH)
    .maxlength(COUNTRY_CODE_MAXLENGTH_REACH)
    .custom(getNonExistedCountryCode(), COUNTRY_CODE_NOT_SUPPORTED);
};

module.exports = { countryCodeFailureTests, countryCodeSuccessTests };
