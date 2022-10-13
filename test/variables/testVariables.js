const { stateManager } = require("@/classes/StateManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { countries } = require("@/variables/others/countries");

const {
  testUser_0,
  testUser_1,
  testUser_2,
  testUser_3,
  testUser_4,
  testUser_5,
  testUser_6,
  testUser_7,
  testUser_8,
  testUser_9,
  testUser_10,
} = stateManager.state.testUsers;

const { countryCode, countryName } = countries[0];
const notExistedContact = {
  countryCode,
  countryName,
  firstName: "Stalwart",
  lastName: "SS!",
  phoneNumber: "1234567890",
};

const testVariables = {
  cellphones: {
    createNewUserSignIn:
      userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    logoutNormal: userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    notExistedContact,
    signIn: userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    verifySignInFailTest:
      userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    verifySignInNewUser:
      userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
  },
  users: {
    addBlockSuccessful: testUser_6,
    addContactSuccessful: testUser_1,
    blacklistItemExist: testUser_7,
    contactItemExist: testUser_2,
    editContactItemNotExist: testUser_4,
    editContactSuccessful: testUser_3,
    getPrivateChatMessages: testUser_10,
    removeBlockSuccessful: testUser_8,
    removeContactSuccessful: testUser_5,
    selfStuff: testUser_0,
    sendMessageSuccessful: testUser_9,
  },
  successTestDefaultOptions: {
    modelCheck: true,
    stringEquality: true,
  },
};

module.exports = {
  testVariables,
};
