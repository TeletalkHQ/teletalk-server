const {
  getErrorObject,
  errorThrower,
  validatorErrorFinder,
  validatorErrorTypes,
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

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    validatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedCountryCode: countryCode,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(COUNTRY_CODE_REQUIRED));

  errorThrower(stringMin, () => errorObject(COUNTRY_CODE_MINLENGTH_REACH));

  errorThrower(stringMax, () => errorObject(COUNTRY_CODE_MAXLENGTH_REACH));

  errorThrower(string || isNaN(+countryCode), () =>
    errorObject(COUNTRY_CODE_INVALID_TYPE)
  );

  const country = countries.find((c) => c.countryCode === countryCode);

  errorThrower(country === undefined, () =>
    errorObject(COUNTRY_CODE_NOT_SUPPORTED)
  );

  errorThrower(result !== true, () => errorObject(COUNTRY_CODE_INVALID));

  return { done: false, error: result };
};

module.exports = { countryCodeValidator, countryCodeValidation };
