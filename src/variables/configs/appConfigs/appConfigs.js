const jwtOptions = { algorithm: "HS256" };

const { getEnvironment } = require("~/functions/utilities/utils");
const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("~/variables/constants/environmentInitialValues");

const MONGO_URI =
  getEnvironment(ENVIRONMENT_KEYS.NODE_ENV) ===
  ENVIRONMENT_VALUES.NODE_ENV.production
    ? getEnvironment(ENVIRONMENT_KEYS.MONGO_URI_ATLAS)
    : getEnvironment(ENVIRONMENT_KEYS.MONGO_URI_LOCAL);

module.exports = { jwtOptions, MONGO_URI };
