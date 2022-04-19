const jwtOptions = { algorithm: "HS256" };

const { getEnvironment } = require("~/functions/utilities/utils");
const { environmentsKey } = require("~/variables/constants/environmentsKey");

const MONGO_URI =
  getEnvironment(environmentsKey.NODE_ENV) === "production"
    ? getEnvironment(environmentsKey.MONGO_URI_ATLAS)
    : getEnvironment(environmentsKey.MONGO_URI_LOCAL);

module.exports = { jwtOptions, MONGO_URI };
