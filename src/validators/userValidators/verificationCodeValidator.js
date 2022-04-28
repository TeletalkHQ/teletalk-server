const {
  errorThrower,
  getErrorObject,
  getValidatorErrorTypes,
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
      VERIFICATION_CODE_NUMERIC: { properties: VERIFICATION_CODE_NUMERIC },
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
  const result = await v({ verificationCode });
  logger.log("verificationCodeValidator result", result);

  if (result === true) return { done: true };

  const { string, stringNumeric, stringEmpty, required, stringLength } =
    getValidatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedVerificationCode: verificationCode,
      validationResult: result,
    });

  errorThrower(stringEmpty || required, () =>
    errorObject(VERIFICATION_CODE_REQUIRED)
  );

  errorThrower(string, () => errorObject(VERIFICATION_CODE_INVALID_TYPE));

  errorThrower(stringNumeric, () => errorObject(VERIFICATION_CODE_NUMERIC));

  errorThrower(stringLength, () =>
    errorObject(VERIFICATION_CODE_INVALID_LENGTH)
  );

  errorThrower(result !== true, () => errorObject(VERIFICATION_CODE_INVALID));

  return { done: false, error: result };
};

module.exports = { verificationCodeValidator, verificationCodeValidation };
