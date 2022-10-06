const { envManager } = require("@/classes/EnvironmentManager");

const NODE_ENV = envManager.getNodeEnv();
const COVERAGE = envManager.getEnvironment(
  envManager.ENVIRONMENT_KEYS.COVERAGE
);
const envName = `MONGO_URL_${NODE_ENV.toUpperCase()}`;
const MONGO_URL = envManager.getEnvironment(envName);

class AppConfigs {
  constructor() {
    this.configs = {
      dbConfigs: { MONGO_URL },
      sms: {
        shouldSendSms: NODE_ENV === envManager.getNodeEnvValues().production,
      },
    };

    this.runConfigs();
  }
  runConfigs() {
    const shouldPrintLogs = !COVERAGE;
    if (shouldPrintLogs) {
      logger.setLevel(logger.levels.debug);
    }
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
