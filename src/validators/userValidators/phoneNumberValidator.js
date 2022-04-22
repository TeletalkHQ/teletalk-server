const {
  getErrorObject,
  errorThrower,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  phoneNumberValidationModel,
} = require("~/models/validationModels/userValidationModels/phoneNumberValidationModel");
const {
  userErrors: {
    properties: {
      PHONE_NUMBER_REQUIRED,
      PHONE_NUMBER_INVALID,
      PHONE_NUMBER_INVALID_TYPE,
    },
  },
} = require("~/variables/errors/userErrors");

const phoneNumberValidation = {
  properties: { ...phoneNumberValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(phoneNumberValidation.properties);

const phoneNumberValidator = async (phoneNumber) => {
  errorThrower(!phoneNumber, () => {
    const { statusCode, ...error } = getErrorObject(PHONE_NUMBER_REQUIRED);

    return {
      phoneNumberValidation: {
        ...error,
      },
      statusCode,
    };
  });

  errorThrower(isNaN(+phoneNumber), () => {
    const { statusCode, ...error } = getErrorObject(PHONE_NUMBER_INVALID_TYPE);

    return {
      phoneNumberValidation: {
        ...error,
      },
      statusCode,
    };
  });

  const result = await v({ phoneNumber });

  errorThrower(result !== true, () => {
    const { statusCode, ...error } = getErrorObject(PHONE_NUMBER_INVALID);

    return {
      phoneNumberValidation: {
        ...error,
        validatedPhoneNumber: result,
      },
      statusCode,
    };
  });

  return true;
};

module.exports = { phoneNumberValidator, phoneNumberValidation };
