const {
  getAllEnvironments,
  getEnvironment,
} = require("@/functions/utilities/utilsNoDeps");

const jwtOptions = { algorithm: "HS256" };

const { NODE_ENV } = getAllEnvironments();

const MONGO_URL = getEnvironment(`MONGO_URL_${NODE_ENV.toUpperCase()}`);

const appConfigs = { jwtOptions, MONGO_URL };

module.exports = { appConfigs };
