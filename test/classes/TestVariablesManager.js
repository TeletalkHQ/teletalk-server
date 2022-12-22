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
      selfStuff: this.testUsers.testUser_0,
      addContactSuccessful: this.testUsers.testUser_1,
      contactItemExist: this.testUsers.testUser_2,
      editContactSuccessful: this.testUsers.testUser_3,
      editContactItemNotExist: this.testUsers.testUser_4,
      removeContactSuccessful: this.testUsers.testUser_5,
      addBlockSuccessful: this.testUsers.testUser_6,
      blacklistItemExist: this.testUsers.testUser_7,
      removeBlockSuccessful: this.testUsers.testUser_8,
      sendMessageSuccessful: this.testUsers.testUser_9,
      getAllPrivateChats: this.testUsers.testUser_10,
      logoutFailTest: this.testUsers.testUser_11,
      checkCurrentUserStatus: this.testUsers.testUser_12,
    };
  }
  getCellphones() {
    const randomCountry = countries[0];

    return {
      createNewUserSignIn:
        userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
      logout: userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
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
