const {
  getErrorObject,
  errorThrower,
  validatorErrorTypes,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  phoneNumberValidationModel: { properties: phoneNumberValidationModel },
} = require("~/models/validationModels/userValidationModels/phoneNumberValidationModel");
const {
  userErrors: {
    properties: {
      PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
      PHONE_NUMBER_INVALID: { properties: PHONE_NUMBER_INVALID },
      PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
      PHONE_NUMBER_MINLENGTH_REACH: {
        properties: PHONE_NUMBER_MINLENGTH_REACH,
      },
      PHONE_NUMBER_MAXLENGTH_REACH: {
        properties: PHONE_NUMBER_MAXLENGTH_REACH,
      },
    },
  },
} = require("~/variables/errors/userErrors");

const phoneNumberValidation = {
  properties: phoneNumberValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(phoneNumberValidation.properties);

const phoneNumberValidator = async (phoneNumber) => {
  const result = await v({ phoneNumber });

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    validatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedPhoneNumber: phoneNumber,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(PHONE_NUMBER_REQUIRED));

  errorThrower(stringMin, () => errorObject(PHONE_NUMBER_MINLENGTH_REACH));

  errorThrower(stringMax, () => errorObject(PHONE_NUMBER_MAXLENGTH_REACH));

  errorThrower(string || isNaN(+phoneNumber), () =>
    errorObject(PHONE_NUMBER_INVALID_TYPE)
  );

  errorThrower(result !== true, () => errorObject(PHONE_NUMBER_INVALID));

  return { done: false, error: result };
};

module.exports = { phoneNumberValidator, phoneNumberValidation };
