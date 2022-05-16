const JWT = require("jsonwebtoken");

const { errorThrower } = require("@/functions/utilities/utils");
const { envManager } = require("@/functions/utilities/EnvironmentManager");

const {
  appConfigs: { jwtDefaultOptions },
} = require("@/configs/appConfigs");

const tokenSigner = async (
  data,
  secret = envManager.getJwtMainSecret(),
  options = jwtDefaultOptions
) => {
  try {
    return JWT.sign(data, secret, {
      ...jwtDefaultOptions,
      ...options,
    });
  } catch (error) {
    logger.log("tokenSigner catch, error:", error);
    errorThrower(error, error);
  }
};

module.exports = { tokenSigner };
