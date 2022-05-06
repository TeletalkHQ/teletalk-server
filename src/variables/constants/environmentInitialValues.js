const ENVIRONMENT_KEYS = {
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
  TEST_VERIFICATION_CODE: "TEST_VERIFICATION_CODE",
  TEST_VERIFY_TOKEN: "TEST_VERIFY_TOKEN",
  TEST_USER: "TEST_USER",
  TEST_USERS: "TEST_USERS",
};

const ENVIRONMENT_VALUES = {
  NODE_ENV: {
    test: "test",
    production: "production",
    development: "development",
  },
  PORT: 8080,
};

module.exports = { ENVIRONMENT_KEYS, ENVIRONMENT_VALUES };
