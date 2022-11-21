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
      SERVER_DEFAULT_PORT: "SERVER_DEFAULT_PORT",
      SHOULD_IGNORE_INPUT_FIELD_WRONG_TYPE_ERROR:
        "SHOULD_IGNORE_INPUT_FIELD_WRONG_TYPE_ERROR",
      SMS_PROVIDER_1_ROUTE: "SMS_PROVIDER_1_ROUTE",
      SMS_PROVIDER_1_HOST: "SMS_PROVIDER_1_HOST",
      SMS_PROVIDER_1_SENDER: "SMS_PROVIDER_1_SENDER",
      SMS_PROVIDER_1_TOKEN: "SMS_PROVIDER_1_TOKEN",
      SMS_PROVIDER_2_HOST: "SMS_PROVIDER_2_HOST",
      SMS_PROVIDER_2_REPORT_URL: "SMS_PROVIDER_2_REPORT_URL",
      SMS_PROVIDER_2_ROUTE: "SMS_PROVIDER_2_ROUTE",
      SMS_PROVIDER_2_TOKEN: "SMS_PROVIDER_2_TOKEN",
      SMS_PROVIDER_INDEX: "SMS_PROVIDER_INDEX",
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
        test_development: "test_development",
        test_production: "test_production",
        test_production_local: "test_production_local",
      },
    };
  }

  getAllLocalEnvironments() {
    const environments = { ...this.ENVIRONMENT_KEYS };

    for (const key in this.ENVIRONMENT_KEYS) {
      environments[key] = this.getEnvironment(key);
    }

    return environments;
  }

  getNodeEnv() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.NODE_ENV);
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
