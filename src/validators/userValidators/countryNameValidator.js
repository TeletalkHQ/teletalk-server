const {
  getErrorObject,
  errorThrower,
  validatorErrorTypes,
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
      COUNTRY_NAME_INVALID_TYPE: { properties: COUNTRY_NAME_INVALID_TYPE },
      COUNTRY_NAME_MINLENGTH_REACH: {
        properties: COUNTRY_NAME_MINLENGTH_REACH,
      },
      COUNTRY_NAME_MAXLENGTH_REACH: {
        properties: COUNTRY_NAME_MAXLENGTH_REACH,
      },
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
  const result = await v({ countryName });

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    validatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedCountryName: countryName,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(COUNTRY_NAME_REQUIRED));

  errorThrower(string, () => errorObject(COUNTRY_NAME_INVALID_TYPE));

  errorThrower(stringMin, () => errorObject(COUNTRY_NAME_MINLENGTH_REACH));

  errorThrower(stringMax, () => errorObject(COUNTRY_NAME_MAXLENGTH_REACH));

  const country = countries.find((c) => c.countryName === countryName);

  errorThrower(country === undefined, () =>
    errorObject(COUNTRY_NAME_NOT_SUPPORTED)
  );

  errorThrower(result !== true, () => errorObject(COUNTRY_NAME_INVALID));

  return { done: false, error: result };
};

module.exports = { countryNameValidator, countryNameValidation };
