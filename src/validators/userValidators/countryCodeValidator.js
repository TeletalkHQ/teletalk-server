const {
  getErrorObject,
  errorThrower,
  getValidatorErrorTypes,
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
      COUNTRY_CODE_NOT_SUPPORTED: { properties: COUNTRY_CODE_NOT_SUPPORTED },
      COUNTRY_CODE_INVALID: { properties: COUNTRY_CODE_INVALID },
      COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
      COUNTRY_CODE_NUMERIC: { properties: COUNTRY_CODE_NUMERIC },
      COUNTRY_CODE_MINLENGTH_REACH: {
        properties: COUNTRY_CODE_MINLENGTH_REACH,
      },
      COUNTRY_CODE_MAXLENGTH_REACH: {
        properties: COUNTRY_CODE_MAXLENGTH_REACH,
      },
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

  if (result === true) {
    const country = countries.find((c) => c.countryCode === countryCode);

    errorThrower(country === undefined, () =>
      errorObject(COUNTRY_CODE_NOT_SUPPORTED)
    );

    return { done: true };
  }

  const { string, stringNumeric, stringMax, stringMin, required } =
    getValidatorErrorTypes(result);

  function errorObject(errorObject) {
    return getErrorObject(errorObject, {
      validatedCountryCode: countryCode,
      validationResult: result,
    });
  }

  errorThrower(required, () => errorObject(COUNTRY_CODE_REQUIRED));

  errorThrower(string, () => errorObject(COUNTRY_CODE_INVALID_TYPE));

  errorThrower(stringNumeric, () => errorObject(COUNTRY_CODE_NUMERIC));

  errorThrower(stringMin, () => errorObject(COUNTRY_CODE_MINLENGTH_REACH));

  errorThrower(stringMax, () => errorObject(COUNTRY_CODE_MAXLENGTH_REACH));

  errorThrower(result !== true, () => errorObject(COUNTRY_CODE_INVALID));

  return { done: false };
};

module.exports = { countryCodeValidator, countryCodeValidation };
