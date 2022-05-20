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
      TEST_VERIFICATION_CODE: "TEST_VERIFICATION_CODE",
      TEST_VERIFY_TOKEN: "TEST_VERIFY_TOKEN",
      TEST_USER: "TEST_USER",
      TEST_USERS: "TEST_USERS",
    };

    this.ENVIRONMENT_VALUES = {
      NODE_ENV: {
        test: "test",
        production: "production",
        development: "development",
      },
      PORT: 8080,
    };
  }

  getEnvironment(envName) {
    return process.env[envName];
  }
  getAllEnvironments() {
    const environments = { ...this.ENVIRONMENT_KEYS };

    for (const key in this.ENVIRONMENT_KEYS) {
      environments[key] = this.getEnvironment(key);
    }

    return environments;
  }
  setEnvironment(envName, value) {
    process.env[envName] = value;
  }

  getTestMainToken() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.TEST_MAIN_TOKEN);
  }
  setTestMainToken(token) {
    this.setEnvironment(this.ENVIRONMENT_KEYS.TEST_MAIN_TOKEN, token);
  }

  getTestVerifyToken() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN);
  }
  setTestVerifyToken(token) {
    this.setEnvironment(this.ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN, token);
  }

  setTestUser(user) {
    this.setEnvironment(this.ENVIRONMENT_KEYS.TEST_USER, user);
  }
  setTestUsers(users) {
    this.setEnvironment(this.ENVIRONMENT_KEYS.TEST_USERS, users);
  }
  getTestUsers() {
    this.getEnvironment(this.ENVIRONMENT_KEYS.TEST_USERS);
  }

  getTestVerificationCode() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE);
  }
  setTestVerificationCode(verificationCode) {
    return this.setEnvironment(
      this.ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE,
      verificationCode
    );
  }

  getNodeEnv() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.NODE_ENV);
  }
  getNodeEnvValues() {
    return this.ENVIRONMENT_VALUES.NODE_ENV;
  }

  getJwtSignInSecret() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET);
  }
  getJwtMainSecret() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.JWT_MAIN_SECRET);
  }
  getSmsClientProps() {
    return {
      username: this.getEnvironment(this.ENVIRONMENT_KEYS.SMS_CLIENT_USERNAME),
      password: this.getEnvironment(this.ENVIRONMENT_KEYS.SMS_CLIENT_PASSWORD),
    };
  }

  setTestUserProps(user) {
    this.setTestUser(user);
    this.setTestMainToken(user.tokens[0].mainToken);
  }

  getJwtSecrets() {
    return {
      JWT_MAIN_SECRET: this.getEnvironment(
        this.ENVIRONMENT_KEYS.JWT_MAIN_SECRET
      ),
      JWT_SIGN_IN_SECRET: this.getEnvironment(
        this.ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET
      ),
    };
  }
}

const environmentManager = new EnvironmentManager();

module.exports = {
  environmentManager,
  EnvironmentManager,
  envManager: environmentManager,
};
