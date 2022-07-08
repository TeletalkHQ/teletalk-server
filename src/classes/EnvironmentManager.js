class EnvironmentManager {
  constructor() {
    this.ENVIRONMENT_KEYS = {
      DEVELOPMENT_PORT: "DEVELOPMENT_PORT",
      JWT_MAIN_SECRET: "JWT_MAIN_SECRET",
      JWT_SIGN_IN_SECRET: "JWT_SIGN_IN_SECRET",
      MONGO_URL_DEVELOPMENT: "MONGO_URL_DEVELOPMENT",
      MONGO_URL_PRODUCTION: "MONGO_URL_PRODUCTION",
      MONGO_URL_TEST: "MONGO_URL_TEST",
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
      [this.ENVIRONMENT_KEYS.NODE_ENV]: {
        development: "development",
        production: "production",
        test: "test",
      },
      PORT: 8080,
    };
  }

  getEnvironment(envName) {
    return process.env[envName];
  }
  getAllLocalEnvironments() {
    const environments = { ...this.ENVIRONMENT_KEYS };

    for (const key in this.ENVIRONMENT_KEYS) {
      environments[key] = this.getEnvironment(key);
    }

    return environments;
  }
  setEnvironment(envName, value) {
    process.env[envName] = value;
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
  EnvironmentManager,
  envManager: environmentManager,
};
