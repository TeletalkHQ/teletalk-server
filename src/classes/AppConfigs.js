const { Trier } = require("utility-store/src/classes/Trier");

const { envManager } = require("@/classes/EnvironmentManager");

const NODE_ENV = envManager.getNodeEnv();
const mongoUrlEnvName = `MONGO_URL_${NODE_ENV.toUpperCase()}`;
const isProduction = NODE_ENV === envManager.getNodeEnvValues().production;
const {
  SHOULD_IGNORE_INPUT_FIELD_WRONG_TYPE_ERROR,
  [mongoUrlEnvName]: MONGO_URL,
  MONGO_COLLECTION_NAME,
  //? This is actually mongoDb tcp url from docker!
  MONGO_PORT,
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
    this.runConfigs();
  }
  #configs = {
    db: {
      MONGO_URL,
      MONGO_URL_WITH_COLLECTION_NAME: makeMongoUrlWithCollectionName(),
    },
    sms: {
      shouldSendSms: isProduction,
    },
    server: {
      shouldIgnoreInputFieldWrongTypeError:
        SHOULD_IGNORE_INPUT_FIELD_WRONG_TYPE_ERROR,
    },
  };
  runConfigs() {
    const { NODE_ENV, LOGGER_LEVEL } = envManager.getAllLocalEnvironments();

    logger.setLevel(LOGGER_LEVEL);

    const shouldNotPrintCatchErrors = NODE_ENV.includes("test");
    if (shouldNotPrintCatchErrors) {
      Trier.changeGlobalConfigs({ canPrintError: false });
    }
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
