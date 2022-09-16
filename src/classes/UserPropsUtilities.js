const {
  UserPropsUtilities: UserPropsUtilitiesMain,
} = require("utility-store/src/classes/UserPropsUtilities");

const { stateManager } = require("@/classes/StateManager");

class UserPropsUtilities extends UserPropsUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getTokenFromUserObject(userObject) {
    return userObject.tokens[0]?.mainToken;
  }

  //CLEANME: Move to TestUtilities
  async setTestUsers(testUsers) {
    const { testUsers: stateKey } = stateManager.stateKeys;
    return await stateManager.setState(stateKey, testUsers);
  }
}

const userPropsUtilities = new UserPropsUtilities();

module.exports = { userPropsUtilities };
