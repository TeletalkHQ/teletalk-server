const JWT = require("jsonwebtoken");

const { getEnvironment } = require("@/functions/utilities/utils");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const { appConfigs } = require("@/configs/appConfigs");

const initialOptions = appConfigs.jwtOptions;

const tokenVerifier = async (
  token,
  secret = getEnvironment(ENVIRONMENT_KEYS.JWT_MAIN_SECRET),
  options = initialOptions
) => {
  try {
    const data = JWT.verify(token, secret, {
      complete: true,
      ...initialOptions,
      ...options,
    });

    return { data, done: true };
  } catch (error) {
    logger.log("tokenVerifier catch, error:", error);
    return {
      error,
      done: false,
    };
  }
};

module.exports = { tokenVerifier };
