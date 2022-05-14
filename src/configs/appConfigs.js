const { envManager } = require("@/functions/utilities/EnvironmentManager");

const jwtDefaultOptions = { algorithm: "HS256" };

const NODE_ENV = envManager.getNodeEnv();

const MONGO_URL = envManager.getEnvironment(
  `MONGO_URL_${NODE_ENV.toUpperCase()}`
);

const appConfigs = { jwtDefaultOptions, MONGO_URL };

module.exports = { appConfigs };
