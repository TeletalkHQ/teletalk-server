const {
  getErrorObject,
  errorThrower,
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
  errorThrower(!phoneNumber, () => {
    return getErrorObject(PHONE_NUMBER_REQUIRED);
  });

  errorThrower(isNaN(+phoneNumber), () => {
    return getErrorObject(PHONE_NUMBER_INVALID_TYPE);
  });

  const result = await v({ phoneNumber });

  errorThrower(result !== true, () => {
    return getErrorObject(PHONE_NUMBER_INVALID, {
      validatedPhoneNumber: result,
    });
  });

  return true;
};

module.exports = { phoneNumberValidator, phoneNumberValidation };
