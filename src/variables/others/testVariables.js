const { customRequestCreator } = require("@/classes/CustomRequest");
const { stateManager } = require("@/classes/StateManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  cellphoneRoutes: {
    addBlockRoute,
    addContactRoute,
    editContactRoute,
    removeBlockRoute,
    removeContactRoute,
  },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userRoutes: {
    createNewUserRoute,
    signInNormalRoute,
    verifySignInNormalRoute,
    logoutNormalRoute,
  },
} = require("@/variables/routes/userRoutes");
const {
  privateChatRoutes: {
    getAllChatsRoute,
    getPrivateChatMessagesRoute,
    sendMessageRoute,
  },
} = require("@/variables/routes/privateChatRoutes");
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

const defaultToken = userPropsUtilities.getTokenFromUserObject(testUser_0);
const defaultCustomRequest = customRequestCreator(defaultToken);

const makeRequester = (routeObject) => () =>
  defaultCustomRequest.create().setRouteObject(routeObject);

const testVariables = {
  cellphones: {
    createNewUserSignInCellphone:
      userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    logoutNormalCellphone:
      userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    notExistedContact,
    signInCellphone:
      userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    verifySignInFailTestCellphone:
      userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
    verifySignInNewUserCellphone:
      userPropsUtilities.makeUnusedRandomCellphoneAndUpdateUsage(),
  },
  testUsers: {
    addBlockSuccessfulTestUser: testUser_6,
    addContactSuccessfulTestUser: testUser_1,
    blacklistItemExistTestUser: testUser_7,
    contactItemExistTestUser: testUser_2,
    editContactItemNotExistTestUser: testUser_4,
    editContactSuccessfulTestUser: testUser_3,
    getPrivateChatMessagesTestUser: testUser_10,
    removeBlockSuccessfulTestUser: testUser_8,
    removeContactSuccessfulTestUser: testUser_5,
    selfStuffTestUser: testUser_0,
    sendMessageSuccessfulTestUser: testUser_9,
  },
};

const successTestDefaultOptions = {
  modelCheck: true,
  stringEquality: true,
};

const requesters = {
  addBlockRequest: makeRequester(addBlockRoute),
  addContactRequest: makeRequester(addContactRoute),
  createNewUserRequest: makeRequester(createNewUserRoute),
  editContactRequest: makeRequester(editContactRoute),
  getAllChatsRequest: makeRequester(getAllChatsRoute),
  getPrivateChatMessagesRequest: makeRequester(getPrivateChatMessagesRoute),
  logoutNormalRequest: makeRequester(logoutNormalRoute),
  removeBlockRequest: makeRequester(removeBlockRoute),
  removeContactRequest: makeRequester(removeContactRoute),
  sendMessageRequest: makeRequester(sendMessageRoute),
  signInNormalRequest: makeRequester(signInNormalRoute),
  verifySignInRequest: makeRequester(verifySignInNormalRoute),
};

module.exports = {
  requesters,
  successTestDefaultOptions,
  testVariables,
};
