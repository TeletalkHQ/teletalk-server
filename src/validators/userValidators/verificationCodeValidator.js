const {
  errorThrower,
  getErrorObject,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  verificationCodeValidationModel: {
    properties: verificationCodeValidationModel,
  },
} = require("~/models/validationModels/userValidationModels/verificationCodeValidationModel");
const {
  userErrors: {
    properties: {
      VERIFICATION_CODE_INVALID: { properties: VERIFICATION_CODE_INVALID },
      VERIFICATION_CODE_INVALID_TYPE: {
        properties: VERIFICATION_CODE_INVALID_TYPE,
      },
      VERIFICATION_CODE_REQUIRED: { properties: VERIFICATION_CODE_REQUIRED },
    },
  },
} = require("~/variables/errors/userErrors");

const verificationCodeValidation = {
  properties: verificationCodeValidationModel,

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(verificationCodeValidation.properties);

const verificationCodeValidator = async (verificationCode) => {
  errorThrower(!verificationCode, () => {
    return getErrorObject(VERIFICATION_CODE_REQUIRED);
  });

  errorThrower(isNaN(+verificationCode), () => {
    return getErrorObject(VERIFICATION_CODE_INVALID_TYPE);
  });

  const result = await v({ verificationCode });

  errorThrower(result !== true, () => {
    return getErrorObject(VERIFICATION_CODE_INVALID, {
      validatedVerificationCode: result,
    });
  });
};

module.exports = { verificationCodeValidator, verificationCodeValidation };
