const JWT = require("jsonwebtoken");

const { getEnvironment } = require("@/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const {
  appConfigs: { jwtOptions },
} = require("@/configs/appConfigs");

const tokenSigner = async (data, secret, options = jwtOptions) => {
  try {
    return JWT.sign(
      data,
      secret || getEnvironment(ENVIRONMENT_KEYS.JWT_MAIN_SECRET),
      {
        ...jwtOptions,
        ...options,
      }
    );
  } catch (error) {
    logger.log("tokenSigner catch, error:", error);
    throw error;
  }
};

module.exports = { tokenSigner };
