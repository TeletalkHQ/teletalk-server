const {
  EnvironmentManager: EnvironmentManagerMain,
} = require("utility-store/src/classes/EnvironmentManager");

class EnvironmentManager extends EnvironmentManagerMain {
  constructor() {
    super();
    this.ENVIRONMENT_KEYS = {
      COVERAGE: "COVERAGE",
      JWT_MAIN_SECRET: "JWT_MAIN_SECRET",
      JWT_SIGN_IN_SECRET: "JWT_SIGN_IN_SECRET",
      LOGGER_LEVEL: "LOGGER_LEVEL",
      MONGO_COLLECTION_NAME: "MONGO_COLLECTION_NAME",
      MONGO_PORT: "MONGO_PORT",
      MONGO_URL: "MONGO_URL",
      NODE_ENV: "NODE_ENV",
      PORT: "PORT",
      REDIS_CLOUD_HOST: "REDIS_CLOUD_HOST",
      REDIS_CLOUD_PASSWORD: "REDIS_CLOUD_PASSWORD",
      REDIS_CLOUD_PORT: "REDIS_CLOUD_PORT",
      REDIS_DEFAULT_PORT: "REDIS_DEFAULT_PORT",
      REDIS_PORT: "REDIS_PORT",
      PORT_DEFAULT: "PORT_DEFAULT",
      SMS_PROVIDER_1_ROUTE: "SMS_PROVIDER_1_ROUTE",
      SMS_PROVIDER_1_HOST: "SMS_PROVIDER_1_HOST",
      SMS_PROVIDER_1_SENDER: "SMS_PROVIDER_1_SENDER",
      SMS_PROVIDER_1_TOKEN: "SMS_PROVIDER_1_TOKEN",
      SMS_PROVIDER_2_HOST: "SMS_PROVIDER_2_HOST",
      SMS_PROVIDER_2_REPORT_URL: "SMS_PROVIDER_2_REPORT_URL",
      SMS_PROVIDER_2_ROUTE: "SMS_PROVIDER_2_ROUTE",
      SMS_PROVIDER_2_TOKEN: "SMS_PROVIDER_2_TOKEN",
      SMS_PROVIDER_SELECTOR: "SMS_PROVIDER_SELECTOR",
    };

    this.ENVIRONMENT_VALUES = {
      LOGGER_LEVEL: {
        debug: "debug",
        error: "error",
        info: "info",
        warning: "warning",
      },
      NODE_ENV: {
        build: "build",
        development: "development",
        production: "production",
        production_local: "production_local",
        test_development: "test_development",
        test_production: "test_production",
        test_production_local: "test_production_local",
      },
    };
  }

  getAllLocalEnvironments() {
    return Object.keys(this.ENVIRONMENT_KEYS).reduce(
      (prevValue, key) => {
        prevValue[key] = this.getEnvironment(key);
        return prevValue;
      },
      { ...this.ENVIRONMENT_KEYS }
    );
  }

  getNodeEnvValues() {
    return this.ENVIRONMENT_VALUES.NODE_ENV;
  }
}

const environmentManager = new EnvironmentManager();

module.exports = {
  environmentManager,
  envManager: environmentManager,
};
