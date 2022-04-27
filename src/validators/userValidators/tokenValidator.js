const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");
const {
  getErrorObject,
  errorThrower,
  getEnvironment,
  validatorErrorTypes,
} = require("~/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  tokenValidationModel: { properties: tokenValidationModel },
} = require("~/models/validationModels/userValidationModels/tokenValidationModel");
const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");
const {
  userErrors: {
    properties: {
      TOKEN_REQUIRED: { properties: TOKEN_REQUIRED },
      TOKEN_INVALID_TYPE: { properties: TOKEN_INVALID_TYPE },
      TOKEN_INVALID: { properties: TOKEN_INVALID },
      TOKEN_CAN_NOT_VERIFIED: { properties: TOKEN_CAN_NOT_VERIFIED },
    },
  },
} = require("~/variables/errors/userErrors");

const tokenValidation = {
  properties: tokenValidationModel,

  info: {
    version: "1.0.0",
  },
};

const tokenValidator = async (token, secret) => {
  try {
    const result = await v({ token });

    const { string, required } = validatorErrorTypes(
      result === true ? [] : result
    );

    const errorObject = (errorObject) =>
      getErrorObject(errorObject, {
        validatedToken: token,
        validationResult: result,
        error: verifiedToken.error,
      });

    errorThrower(required, () => errorObject(TOKEN_REQUIRED));

    errorThrower(string, () => errorObject(TOKEN_INVALID_TYPE));

    const verifiedToken = await tokenVerifier(
      token,
      secret || getEnvironment(ENVIRONMENT_KEYS.JWT_MAIN_SECRET)
    );

    if (verifiedToken.done === true) return verifiedToken.data;

    errorThrower(verifiedToken.done === false, () =>
      errorObject(TOKEN_CAN_NOT_VERIFIED)
    );

    errorThrower(result !== true, () => errorObject(TOKEN_INVALID));

    return { done: false, error: result };
  } catch (error) {
    logger.log("tokenValidator catch, error:", error);
    return { error: true };
  }
};

const v = validatorCompiler(tokenValidation.properties);

module.exports = { tokenValidator };
