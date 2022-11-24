const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { countries } = require("@/variables/others/countries");

class TestVariablesManager {
  constructor() {
    this.testUsers = {};
    this.successTestDefaultOptions = {
      modelCheck: true,
      stringEquality: true,
    };
  }

  getTestUsers() {
    return this.testUsers;
  }
  setTestUsers(testUsers) {
    this.testUsers = testUsers;
  }

  getUsers() {
    return {
      addBlockSuccessful: this.testUsers.testUser_6,
      addContactSuccessful: this.testUsers.testUser_1,
      blacklistItemExist: this.testUsers.testUser_7,
      contactItemExist: this.testUsers.testUser_2,
      editContactItemNotExist: this.testUsers.testUser_4,
      editContactSuccessful: this.testUsers.testUser_3,
      getPrivateChat: this.testUsers.testUser_10,
      removeBlockSuccessful: this.testUsers.testUser_8,
      removeContactSuccessful: this.testUsers.testUser_5,
      selfStuff: this.testUsers.testUser_0,
      sendMessageSuccessful: this.testUsers.testUser_9,
    };
  }
  getCellphones() {
    const randomCountry = countries[0];

    return {
      createNewUserSignIn:
        userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
      logoutNormal:
        userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
      notExistedContact: {
        countryCode: randomCountry.countryCode,
        countryName: randomCountry.countryName,
        firstName: "Stalwart",
        lastName: "SS!",
        phoneNumber: "1234567890",
      },
      signIn: userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
      verifySignInFailTest:
        userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
      verifySignInNewUser:
        userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    };
  }
}

const testVariablesManager = new TestVariablesManager();

module.exports = { TestVariablesManager, testVariablesManager };
