const {
  getErrorObject,
  errorThrower,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  countryCodeValidationModel,
} = require("~/models/validationModels/userValidationModels/countryCodeValidationModel");
const { countries } = require("~/variables/constants/countries");
const {
  userErrors: {
    properties: {
      COUNTRY_CODE_REQUIRED,
      COUNTRY_CODE_INVALID,
      COUNTRY_NOT_SUPPORTED,
      COUNTRY_CODE_INVALID_TYPE,
    },
  },
} = require("~/variables/errors/userErrors");

const countryCodeValidation = {
  properties: { ...countryCodeValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(countryCodeValidation.properties);

const countryCodeValidator = async (countryCode) => {
  errorThrower(!countryCode, () => {
    const { statusCode, ...error } = getErrorObject(COUNTRY_CODE_REQUIRED);

    return {
      countryCodeValidation: {
        ...error,
      },
      statusCode,
    };
  });

  errorThrower(isNaN(+countryCode), () => {
    const { statusCode, ...error } = getErrorObject(COUNTRY_CODE_INVALID_TYPE);

    return {
      countryCodeValidation: {
        ...error,
      },
      statusCode,
    };
  });

  const result = await v({ countryCode });

  errorThrower(result !== true, () => {
    const { statusCode, ...error } = getErrorObject(COUNTRY_CODE_INVALID);

    return {
      countryCodeValidation: {
        ...error,
        validatedCountryCode: result,
      },
      statusCode,
    };
  });

  const country = countries.find((c) => c.countryCode === countryCode);

  errorThrower(!country, () => {
    const { statusCode, ...error } = getErrorObject(COUNTRY_NOT_SUPPORTED);

    return {
      countryCodeValidation: {
        ...error,
        validatedCountryCode: countryCode,
      },
      statusCode,
    };
  });

  return true;
};

module.exports = { countryCodeValidator, countryCodeValidation };
