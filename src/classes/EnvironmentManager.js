const {
  EnvironmentManager: EnvironmentManagerMain,
} = require("utility-store/src/classes/EnvironmentManager");

class EnvironmentManager extends EnvironmentManagerMain {
  constructor() {
    super();
    this.ENVIRONMENT_KEYS = {
      COVERAGE: "COVERAGE",
      DEVELOPMENT_PORT: "DEVELOPMENT_PORT",
      JWT_MAIN_SECRET: "JWT_MAIN_SECRET",
      JWT_SIGN_IN_SECRET: "JWT_SIGN_IN_SECRET",
      LOGGER_LEVEL: "LOGGER_LEVEL",
      MONGO_URL_DEVELOPMENT: "MONGO_URL_DEVELOPMENT",
      MONGO_URL_PRODUCTION: "MONGO_URL_PRODUCTION",
      MONGO_URL_TEST_DEV: "MONGO_URL_TEST_DEV",
      MONGO_URL_TEST_PRODUCTION: "MONGO_URL_TEST_PRODUCTION",
      NODE_ENV: "NODE_ENV",
      PORT: "PORT",
      SMS_CLIENT_PASSWORD: "SMS_CLIENT_PASSWORD",
      SMS_CLIENT_USERNAME: "SMS_CLIENT_USERNAME",
      TEST_MAIN_TOKEN: "TEST_MAIN_TOKEN",
      TEST_USER: "TEST_USER",
      TEST_USERS: "TEST_USERS",
      TEST_VERIFICATION_CODE: "TEST_VERIFICATION_CODE",
      TEST_VERIFY_TOKEN: "TEST_VERIFY_TOKEN",
    };

    this.ENVIRONMENT_VALUES = {
      LOGGER_LEVEL: {
        debug: "debug",
        error: "error",
        info: "info",
        warning: "warning",
      },
      NODE_ENV: {
        development: "development",
        production: "production",
        test_dev: "test_dev",
        test_production: "test_production",
      },
      PORT: 8080,
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
