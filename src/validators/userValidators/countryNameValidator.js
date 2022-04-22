const {
  getErrorObject,
  errorThrower,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  countryNameValidationModel,
} = require("~/models/validationModels/userValidationModels/countryNameValidationModel");

const { countries } = require("~/variables/constants/countries");
const {
  userErrors: {
    properties: {
      COUNTRY_NAME_REQUIRED,
      COUNTRY_NAME_NOT_SUPPORTED,
      COUNTRY_NAME_INVALID,
    },
  },
} = require("~/variables/errors/userErrors");

const countryNameValidation = {
  properties: { ...countryNameValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(countryNameValidation.properties);

const countryNameValidator = async (countryName) => {
  errorThrower(!countryName, () => {
    const { statusCode, ...error } = getErrorObject(COUNTRY_NAME_REQUIRED);

    return {
      countryNameValidation: {
        ...error,
      },
      statusCode,
    };
  });

  const result = await v({ countryName });

  errorThrower(result !== true, () => {
    const { statusCode, ...error } = getErrorObject(COUNTRY_NAME_INVALID);

    return {
      countryNameValidation: {
        ...error,
        validatedCountryName: result,
      },
      statusCode,
    };
  });

  const country = countries.find((c) => c.countryName === countryName);

  errorThrower(!country, () => {
    const { statusCode, ...error } = getErrorObject(COUNTRY_NAME_NOT_SUPPORTED);

    return {
      countryNameValidation: {
        ...error,
        validatedCountryName: countryName,
      },
      statusCode,
    };
  });

  return true;
};

module.exports = { countryNameValidator, countryNameValidation };
