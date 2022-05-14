const JWT = require("jsonwebtoken");

const { envManager } = require("@/functions/utilities/EnvironmentManager");

const {
  appConfigs: { jwtDefaultOptions },
} = require("@/configs/appConfigs");

const tokenVerifier = (
  token,
  secret = envManager.getJwtMainSecret(),
  options = jwtDefaultOptions
) => {
  try {
    const data = JWT.verify(token, secret, {
      complete: true,
      ...jwtDefaultOptions,
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
