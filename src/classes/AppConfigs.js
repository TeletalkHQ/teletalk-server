const { Trier } = require("utility-store/src/classes/Trier");

const { envManager } = require("@/classes/EnvironmentManager");

class AppConfigs {
  #configs = {
    db: {
      MONGO_URL: this.#getMongoUrl(),
      MONGO_URL_WITH_COLLECTION_NAME: this.#makeMongoUrlWithCollectionName(),
    },
    sms: {
      shouldSendSms: this.isProduction(),
    },
    server: {},
  };

  isProduction() {
    const NODE_ENV = envManager.getNodeEnv();
    return NODE_ENV === envManager.getNodeEnvValues().production;
  }

  async runConfigs() {
    const { NODE_ENV, LOGGER_LEVEL } = envManager.getAllLocalEnvironments();

    logger.setLevel(logger.levels[LOGGER_LEVEL]);

    if (NODE_ENV.includes("test"))
      Trier.changeGlobalConfigs({
        canPrintError: true,
      });
  }

  #getMongoUrl() {
    return envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.MONGO_URL);
  }
  #makeMongoUrlWithCollectionName() {
    const {
      MONGO_COLLECTION_NAME,
      //? This is actually mongoDb tcp url from docker!
      MONGO_PORT,
    } = envManager.getAllLocalEnvironments();

    const CORRECTED_MONGO_URL_FROM_DOCKER =
      MONGO_PORT && MONGO_PORT.replace("tcp://", "mongodb://");
    return `${
      CORRECTED_MONGO_URL_FROM_DOCKER || this.#getMongoUrl()
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
