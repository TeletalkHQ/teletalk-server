const { Trier } = require("utility-store/src/classes/Trier");

const { envManager } = require("@/classes/EnvironmentManager");

const NODE_ENV = envManager.getNodeEnv();
const envName = `MONGO_URL_${NODE_ENV.toUpperCase()}`;
const MONGO_URL = envManager.getEnvironment(envName);

class AppConfigs {
  constructor() {
    this.configs = {
      dbConfigs: {
        MONGO_URL,
      },
      sms: {
        shouldSendSms: NODE_ENV === envManager.getNodeEnvValues().production,
      },
    };

    this.runConfigs();
  }
  runConfigs() {
    const { NODE_ENV, LOGGER_LEVEL } = envManager.getAllLocalEnvironments();

    logger.setLevel(LOGGER_LEVEL);

    const shouldNotPrintCatchErrors = NODE_ENV.includes("test");
    if (shouldNotPrintCatchErrors) {
      Trier.changeGlobalConfigs({ canPrintError: false });
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
