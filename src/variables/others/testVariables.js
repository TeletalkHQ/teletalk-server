const { stateManager } = require("@/classes/StateManager");
const { userProps } = require("@/classes/UserProps");
const { customRequest } = require("@/classes/CustomRequest");

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

const token = userProps.getTokenFromUserObjectByParam(testUser_0);
const customRequestWithTestUser_0_data = customRequest(token);

const makeRequester = (routeObject) =>
  customRequestWithTestUser_0_data.create().setRequestRequirements(routeObject);

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
  addBlockRequest: makeRequester(addBlockRoute),
  addContactRequest: makeRequester(addContactRoute),
  createNewUserRequest: makeRequester(createNewUserRoute),
  editContactRequest: makeRequester(editContactRoute),
  getAllChatsRequest: makeRequester(getAllChatsRoute),
  getPrivateChatMessagesRequest: makeRequester(getPrivateChatMessagesRoute),
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
