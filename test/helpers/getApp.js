const { envManager } = require("@/classes/EnvironmentManager");

const { crashServer } = require("@/utilities/utilities");

const getApp = () => {
  const NODE_ENV = envManager.getNodeEnv();
  const {
    NODE_ENV: { test_development, test_production, test_production_local },
  } = envManager.ENVIRONMENT_VALUES;

  if (NODE_ENV === test_development)
    return require("@/servers/express").expressServer;

  if ([test_production, test_production_local].includes(NODE_ENV))
    return require("@/../build").servers.expressServer;

  const message = "No server found! check your environments...";
  crashServer(message);
};

module.exports = { getApp };
