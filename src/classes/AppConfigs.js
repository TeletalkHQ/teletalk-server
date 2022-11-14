const { Trier } = require("utility-store/src/classes/Trier");

const { envManager } = require("@/classes/EnvironmentManager");
const { stateManager } = require("@/classes/StateManager");

class AppConfigs {
  #configs = {
    db: {
      MONGO_URL: this.getMongoUrl(),
      MONGO_URL_WITH_COLLECTION_NAME: this.makeMongoUrlWithCollectionName(),
    },
    sms: {
      shouldSendSms: this.isProduction(),
    },
    server: {
      shouldIgnoreInputFieldWrongTypeError: envManager.getEnvironment(
        envManager.ENVIRONMENT_KEYS.SHOULD_IGNORE_INPUT_FIELD_WRONG_TYPE_ERROR
      ),
    },
  };

  isProduction() {
    const NODE_ENV = envManager.getNodeEnv();
    return NODE_ENV === envManager.getNodeEnvValues().production;
  }

  async runConfigs() {
    await stateManager.initializeStates();

    const { NODE_ENV, LOGGER_LEVEL } = envManager.getAllLocalEnvironments();
    logger.setLevel(LOGGER_LEVEL);
    const shouldNotPrintCatchErrors = NODE_ENV.includes("test");
    if (shouldNotPrintCatchErrors) {
      Trier.changeGlobalConfigs({ canPrintError: false });
    }
  }

  getMongoUrl() {
    const NODE_ENV = envManager.getNodeEnv();
    const mongoUrlEnvName = `MONGO_URL_${NODE_ENV.toUpperCase()}`;
    return envManager.getEnvironment(mongoUrlEnvName);
  }
  makeMongoUrlWithCollectionName() {
    const {
      MONGO_COLLECTION_NAME,
      //? This is actually mongoDb tcp url from docker!
      MONGO_PORT,
    } = envManager.getAllLocalEnvironments();

    const CORRECTED_MONGO_URL_FROM_DOCKER =
      MONGO_PORT && MONGO_PORT.replace("tcp://", "mongodb://");
    return `${
      CORRECTED_MONGO_URL_FROM_DOCKER || this.getMongoUrl()
    }/${MONGO_COLLECTION_NAME}`;
  }

  getConfigs() {
    return this.#configs;
  }
}

const appConfigs = new AppConfigs();

module.exports = {
  appConfigs,
  AppConfigs,
};
