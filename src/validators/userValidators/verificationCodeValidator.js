const {
  errorThrower,
  getErrorObject,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  verificationCodeValidationModel,
} = require("~/models/validationModels/userValidationModels/verificationCodeValidationModel");
const {
  userErrors: {
    properties: {
      VERIFICATION_CODE_INVALID,
      VERIFICATION_CODE_INVALID_TYPE,
      VERIFICATION_CODE_REQUIRED,
    },
  },
} = require("~/variables/errors/userErrors");

const verificationCodeValidation = {
  properties: { ...verificationCodeValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const v = validatorCompiler(verificationCodeValidation.properties);

const verificationCodeValidator = async (verificationCode) => {
  errorThrower(!verificationCode, () => {
    const { statusCode, ...error } = getErrorObject(VERIFICATION_CODE_REQUIRED);

    return {
      verificationCodeValidation: {
        ...error,
      },
      statusCode,
    };
  });

  errorThrower(isNaN(+verificationCode), () => {
    const { statusCode, ...error } = getErrorObject(
      VERIFICATION_CODE_INVALID_TYPE
    );

    return {
      verificationCodeValidation: {
        ...error,
      },
      statusCode,
    };
  });

  const result = await v({ verificationCode });

  errorThrower(result !== true, () => {
    const { statusCode, ...error } = getErrorObject(VERIFICATION_CODE_INVALID);

    return {
      verificationCodeValidation: {
        ...error,
        validatedVerificationCode: result,
      },
      statusCode,
    };
  });
};

module.exports = { verificationCodeValidator, verificationCodeValidation };
