import { Trier } from "simple-trier";

import { envManager } from "@/classes/EnvironmentManager";

const { PORT } = envManager.getEnvironment();
// const RANDOM_PORT = randomMaker.numberWithRange(8000, 10000);

class AppConfigs {
  private ENVIRONMENTS = envManager.getEnvironment();

  private CONFIGS = {
    MONGO_DB: {
      MONGO_URL: this.ENVIRONMENTS.MONGO_URL,
      MONGO_URL_FULL: makeMongoFullUrl(),
    },
    REDIS: {
      REDIS_HOST: this.ENVIRONMENTS.REDIS_HOST,
      REDIS_PASSWORD: this.ENVIRONMENTS.REDIS_PASSWORD,
      REDIS_PORT: this.ENVIRONMENTS.REDIS_PORT,
    },
    APP: {
      ENVIRONMENT: this.ENVIRONMENTS.NODE_ENV,
      HOSTNAME: "localhost",
      PORT,
      SELF_EXEC: this.ENVIRONMENTS.SELF_EXEC,
      SESSION_MAIN_SECRET: this.ENVIRONMENTS.SESSION_MAIN_SECRET,
      SESSION_SIGN_IN_SECRET: this.ENVIRONMENTS.SESSION_SIGN_IN_SECRET,
    },
    SMS_CLIENT: {
      SMS_PROVIDER_1_HOST: this.ENVIRONMENTS.SMS_PROVIDER_1_HOST,
      SMS_PROVIDER_1_ROUTE: this.ENVIRONMENTS.SMS_PROVIDER_1_ROUTE,
      SMS_PROVIDER_1_SENDER: this.ENVIRONMENTS.SMS_PROVIDER_1_SENDER,
      SMS_PROVIDER_1_SESSION: this.ENVIRONMENTS.SMS_PROVIDER_1_SESSION,
      SMS_PROVIDER_2_HOST: this.ENVIRONMENTS.SMS_PROVIDER_2_HOST,
      SMS_PROVIDER_2_REPORT_URL: this.ENVIRONMENTS.SMS_PROVIDER_2_REPORT_URL,
      SMS_PROVIDER_2_ROUTE: this.ENVIRONMENTS.SMS_PROVIDER_2_ROUTE,
      SMS_PROVIDER_2_SESSION: this.ENVIRONMENTS.SMS_PROVIDER_2_SESSION,
      SMS_PROVIDER_SELECTOR: this.ENVIRONMENTS.SMS_PROVIDER_SELECTOR,
    },
  };

  async setup() {
    const { NODE_ENV, LOG_LEVEL } = this.ENVIRONMENTS;
    logger.setLevel(logger.levels[LOG_LEVEL]);

    if (NODE_ENV.includes("test"))
      Trier.changeGlobalConfigs({
        callerName: "unknownCaller",
        canPrintError: true,
      });
  }

  getConfigs() {
    return this.CONFIGS;
  }
}

const makeMongoFullUrl = () => {
  const {
    MONGO_COLLECTION_NAME,
    //? This is actually mongoDb tcp url from docker!
    MONGO_PORT,
  } = envManager.getEnvironment();

  const CORRECTED_MONGO_URL_FROM_DOCKER = MONGO_PORT?.toString().replace(
    "tcp://",
    "mongodb://"
  );

  const mongoUrl =
    CORRECTED_MONGO_URL_FROM_DOCKER || envManager.getEnvironment().MONGO_URL;

  return `${mongoUrl}/${MONGO_COLLECTION_NAME}`;
};

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
