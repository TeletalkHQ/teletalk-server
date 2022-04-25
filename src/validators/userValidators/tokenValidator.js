const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");
const {
  getErrorObject,
  errorThrower,
  getEnvironment,
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
    errorThrower(!token, () => getErrorObject(TOKEN_REQUIRED));

    errorThrower(typeof token !== "string", () =>
      getErrorObject(TOKEN_INVALID_TYPE)
    );

    const result = await v({ token });

    errorThrower(result !== true, () => getErrorObject(TOKEN_INVALID));

    const verifiedToken = await tokenVerifier(
      token,
      secret || getEnvironment(ENVIRONMENT_KEYS.JWT_MAIN_SECRET)
    );

    errorThrower(verifiedToken.error, () =>
      getErrorObject(TOKEN_CAN_NOT_VERIFIED, {
        verifiedToken: token,
        error: verifiedToken.error,
        tokenSecret: secret,
      })
    );

    return verifiedToken;
  } catch (error) {
    logger.log("tokenValidator catch, error:", error);
    return { error: true };
  }
};

const v = validatorCompiler(tokenValidation.properties);

module.exports = { tokenValidator };
