const {
  getErrorObject,
  errorThrower,
  validatorErrorFinder,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  countryCodeValidationModel: { properties: countryCodeValidationModel },
} = require("~/models/validationModels/userValidationModels/countryCodeValidationModel");
const { countries } = require("~/variables/constants/countries");
const {
  userErrors: {
    properties: {
      COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
      COUNTRY_CODE_INVALID: { properties: COUNTRY_CODE_INVALID },
      COUNTRY_CODE_NOT_SUPPORTED: { properties: COUNTRY_CODE_NOT_SUPPORTED },
      COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
    },
  },
} = require("~/variables/errors/userErrors");

const countryCodeValidation = {
  properties: countryCodeValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(countryCodeValidation.properties);

const countryCodeValidator = async (countryCode) => {
  const result = await v({ countryCode });

  const finder = (value) => validatorErrorFinder(result, value);

  if (result === true) return { done: true };

  errorThrower(!countryCode, () => {
    return getErrorObject(COUNTRY_CODE_REQUIRED);
  });

  errorThrower(isNaN(+countryCode), () => {
    return getErrorObject(COUNTRY_CODE_INVALID_TYPE);
  });

  errorThrower(result !== true, () => {
    return getErrorObject(COUNTRY_CODE_INVALID, {
      validatedCountryCode: result,
    });
  });

  const country = countries.find((c) => c.countryCode === countryCode);

  errorThrower(!country, () => {
    return getErrorObject(COUNTRY_CODE_NOT_SUPPORTED, {
      validatedCountryCode: countryCode,
    });
  });

  return true;
};

module.exports = { countryCodeValidator, countryCodeValidation };
