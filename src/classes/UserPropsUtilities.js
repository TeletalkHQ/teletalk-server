const {
  UserPropsUtilities: UserPropsUtilitiesMain,
} = require("utility-store/src/classes/UserPropsUtilities");

const { stateManager } = require("@/classes/StateManager");
const { envManager } = require("@/classes/EnvironmentManager");

class UserPropsUtilities extends UserPropsUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getTokenFromUserObject(userObject) {
    return userObject.tokens[0]?.mainToken;
  }
  getTestVerificationCode() {
    const { TEST_VERIFICATION_CODE } = envManager.ENVIRONMENT_KEYS;
    return envManager.getEnvironment(TEST_VERIFICATION_CODE);
  }
  setTestVerificationCode(verificationCode) {
    const { TEST_VERIFICATION_CODE } = envManager.ENVIRONMENT_KEYS;
    envManager.setEnvironment(TEST_VERIFICATION_CODE, verificationCode);
  }

  async setTestUsers(testUsers) {
    const { testUsers: stateKey } = stateManager.stateKeys;
    return await stateManager.setState(stateKey, testUsers);
  }
  setTestVerifyToken(token) {
    const { TEST_VERIFY_TOKEN } = envManager.ENVIRONMENT_KEYS;
    envManager.setEnvironment(TEST_VERIFY_TOKEN, token);
  }
}

const userPropsUtilities = new UserPropsUtilities();

module.exports = { userPropsUtilities };
