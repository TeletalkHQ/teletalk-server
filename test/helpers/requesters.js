const { customRequestCreator } = require("@/classes/CustomRequest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { stateManager } = require("@/classes/StateManager");

const { routes } = require("@/routes/routes");

const { testUser_0 } = stateManager.state.testUsers;

const defaultToken = userPropsUtilities.getTokenFromUserObject(testUser_0);
const defaultCustomRequest = customRequestCreator(defaultToken);

const makeRequester = (routeObject) => () =>
  defaultCustomRequest.create().setRouteObject(routeObject);

const requesters = {
  addBlockRequest: makeRequester(routes.cellphone.addBlock),
  addContactRequest: makeRequester(routes.cellphone.addContact),
  createNewUserRequest: makeRequester(routes.user.createNewUser),
  editContactRequest: makeRequester(routes.cellphone.editContact),
  getAllChatsRequest: makeRequester(routes.privateChat.getAllPrivateChats),
  getPrivateChatMessagesRequest: makeRequester(
    routes.privateChat.getPrivateChatMessages
  ),
  logoutNormalRequest: makeRequester(routes.user.logoutNormal),
  removeBlockRequest: makeRequester(routes.cellphone.removeBlock),
  removeContactRequest: makeRequester(routes.cellphone.removeContact),
  sendMessageRequest: makeRequester(routes.privateChat.sendMessage),
  signInNormalRequest: makeRequester(routes.user.signInNormal),
  verifySignInRequest: makeRequester(routes.user.verifySignInNormal),
};

module.exports = { requesters };
