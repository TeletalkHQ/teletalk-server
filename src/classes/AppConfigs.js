const { envManager } = require("@/classes/EnvironmentManager");

const NODE_ENV = envManager.getNodeEnv();

const envName = `MONGO_URL_${NODE_ENV.toUpperCase()}`;
const MONGO_URL = envManager.getEnvironment(envName);

class AppConfigs {
  constructor() {
    this.configs = {
      dbConfigs: { MONGO_URL },
    };

    this.runConfigs();
  }
  runConfigs() {
    logger.setLevel(logger.levels.debug);
  }

  getConfigs() {
    return this.configs;
  }
}

const appConfigs = new AppConfigs();

module.exports = {
  appConfigs,
  AppConfigs,
};
