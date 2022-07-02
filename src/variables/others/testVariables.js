const { stateManager } = require("@/classes/StateManager");
const { userProps } = require("@/classes/UserProps");
const { customRequest } = require("@/classes/CustomRequest");

const {
  cellphoneRoutes: {
    addBlockRoute,
    addContactRoute,
    cellphoneRouteBaseUrl,
    editContactRoute,
    removeBlockRoute,
    removeContactRoute,
  },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userRoutes: {
    createNewUserRoute,
    signInNormalRoute,
    userRouteBaseUrl,
    verifySignInNormalRoute,
  },
} = require("@/variables/routes/userRoutes");
const {
  privateChatRoutes: {
    getAllChatsRoute,
    getPrivateChatMessagesRoute,
    privateChatRouteBaseUrl,
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
  phoneNumber: "1234567890",
  countryCode,
  countryName,
  firstName: "Stalwart",
  lastName: "SS!",
};

const makeRequester = (baseUrl, routeObject, testUserNumber) =>
  customRequest.create().setRequestRequirements(baseUrl, routeObject, {
    testUserNumber,
  });

const testVariables = {
  cellphones: {
    signInCellphone: userProps.makeUnusedTestCellphoneAndUpdateUsage(),
    verifySignInNewUserCellphone:
      userProps.makeUnusedTestCellphoneAndUpdateUsage(),
    verifySignInFailTestCellphone:
      userProps.makeUnusedTestCellphoneAndUpdateUsage(),
    createNewUserSignInCellphone:
      userProps.makeUnusedTestCellphoneAndUpdateUsage(),
    notExistedContact,
  },
  testUsers: {
    selfStuffTestUser: testUser_0,
    addContactSuccessfulTestUser: testUser_1,
    contactItemExistTestUser: testUser_2,
    editContactSuccessfulTestUser: testUser_3,
    editContactItemNotExistTestUser: testUser_4,
    removeContactSuccessfulTestUser: testUser_5,
    addBlockSuccessfulTestUser: testUser_6,
    blacklistItemExistTestUser: testUser_7,
    removeBlockSuccessfulTestUser: testUser_8,
    sendMessageSuccessfulTestUser: testUser_9,
    getPrivateChatMessagesTestUser: testUser_10,
  },
};

const successTestDefaultOptions = {
  stringEquality: true,
  modelCheck: true,
};

const requesters = {
  addBlockRequest: makeRequester(cellphoneRouteBaseUrl, addBlockRoute, 0),
  addContactRequest: makeRequester(cellphoneRouteBaseUrl, addContactRoute, 0),
  createNewUserRequest: makeRequester(userRouteBaseUrl, createNewUserRoute),
  editContactRequest: makeRequester(cellphoneRouteBaseUrl, editContactRoute, 0),
  getAllChatsRequest: makeRequester(
    privateChatRouteBaseUrl,
    getAllChatsRoute,
    0
  ),
  getPrivateChatMessagesRequest: makeRequester(
    privateChatRouteBaseUrl,
    getPrivateChatMessagesRoute,
    0
  ),
  removeBlockRequest: makeRequester(cellphoneRouteBaseUrl, removeBlockRoute, 0),
  removeContactRequest: makeRequester(
    cellphoneRouteBaseUrl,
    removeContactRoute,
    0
  ),
  sendMessageRequest: makeRequester(
    privateChatRouteBaseUrl,
    sendMessageRoute,
    0
  ),
  signInNormalRequest: makeRequester(userRouteBaseUrl, signInNormalRoute),
  verifySignInRequest: makeRequester(userRouteBaseUrl, verifySignInNormalRoute),
};

module.exports = {
  successTestDefaultOptions,
  testVariables,
  requesters,
};
