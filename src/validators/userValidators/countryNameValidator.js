const {
  getErrorObject,
  errorThrower,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  countryNameValidationModel: { properties: countryNameValidationModel },
} = require("~/models/validationModels/userValidationModels/countryNameValidationModel");

const { countries } = require("~/variables/constants/countries");
const {
  userErrors: {
    properties: {
      COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
      COUNTRY_NAME_NOT_SUPPORTED: { properties: COUNTRY_NAME_NOT_SUPPORTED },
      COUNTRY_NAME_INVALID: { properties: COUNTRY_NAME_INVALID },
    },
  },
} = require("~/variables/errors/userErrors");

const countryNameValidation = {
  properties: countryNameValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(countryNameValidation.properties);

const countryNameValidator = async (countryName) => {
  errorThrower(!countryName, () => {
    return getErrorObject(COUNTRY_NAME_REQUIRED);
  });

  const result = await v({ countryName });

  errorThrower(result !== true, () => {
    return getErrorObject(COUNTRY_NAME_INVALID, {
      validatedCountryName: result,
    });
  });

  const country = countries.find((c) => c.countryName === countryName);

  errorThrower(!country, () => {
    return getErrorObject(COUNTRY_NAME_NOT_SUPPORTED, {
      validatedCountryName: countryName,
    });
  });

  return true;
};

module.exports = { countryNameValidator, countryNameValidation };
