const {
  errorThrower,
  getErrorObject,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");
const {
  userModel: {
    properties: {
      verificationCodeModel: { properties: verificationCodeModel },
    },
  },
} = require("~/models/userModels/userModel");

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
      VERIFICATION_CODE_INVALID_LENGTH: {
        properties: VERIFICATION_CODE_INVALID_LENGTH,
      },
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
    return getErrorObject(VERIFICATION_CODE_INVALID_TYPE, {
      validatedVerificationCode: verificationCode,
    });
  });

  const result = await v({ verificationCode });

  errorThrower(
    verificationCode.length !== verificationCodeModel.length.value,
    () =>
      getErrorObject(VERIFICATION_CODE_INVALID_LENGTH, {
        validatedVerificationCode: verificationCode,
      })
  );

  errorThrower(result !== true, () => {
    return getErrorObject(VERIFICATION_CODE_INVALID, {
      validatedVerificationCode: verificationCode,
      error: result,
    });
  });
};

module.exports = { verificationCodeValidator, verificationCodeValidation };
