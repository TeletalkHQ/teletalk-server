const { Trier } = require("utility-store/src/classes/Trier");

const { envManager } = require("@/classes/EnvironmentManager");

const NODE_ENV = envManager.getNodeEnv();
const envName = `MONGO_URL_${NODE_ENV.toUpperCase()}`;
const {
  MONGO_COLLECTION_NAME,
  //? This is actually mongoDb tcp url from docker!
  MONGO_PORT,
  [envName]: MONGO_URL,
} = envManager.getAllLocalEnvironments();

const makeMongoUrlWithCollectionName = () => {
  const CORRECTED_MONGO_URL_FROM_DOCKER =
    MONGO_PORT && MONGO_PORT.replace("tcp://", "mongodb://");
  return `${
    CORRECTED_MONGO_URL_FROM_DOCKER || MONGO_URL
  }/${MONGO_COLLECTION_NAME}`;
};

class AppConfigs {
  constructor() {
    this.configs = {
      dbConfigs: {
        MONGO_URL,
        MONGO_URL_WITH_COLLECTION_NAME: makeMongoUrlWithCollectionName(),
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
