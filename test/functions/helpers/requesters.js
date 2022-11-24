const { customRequestCreator } = require("@/classes/CustomRequest");
const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { routes } = require("@/routes");

const { testUser_0 } = testVariablesManager.getTestUsers();
const defaultToken = userPropsUtilities.getTokenFromUserObject(testUser_0);
const defaultCustomRequest = customRequestCreator(defaultToken);
const makeCustomRequest = (routeObject) => () =>
  defaultCustomRequest.create().setRouteObject(routeObject);

const requesters = {
  addBlock: makeCustomRequest(routes.cellphone.addBlock),
  addContact: makeCustomRequest(routes.cellphone.addContact),
  createNewUser: makeCustomRequest(routes.user.createNewUser),
  editContact: makeCustomRequest(routes.cellphone.editContact),
  getChatInfo: makeCustomRequest(routes.user.getChatInfo),
  getPrivateChat: makeCustomRequest(routes.privateChat.getPrivateChat),
  logoutNormal: makeCustomRequest(routes.user.logoutNormal),
  removeBlock: makeCustomRequest(routes.cellphone.removeBlock),
  removeContact: makeCustomRequest(routes.cellphone.removeContact),
  sendPrivateMessage: makeCustomRequest(routes.privateChat.sendPrivateMessage),
  signInNormal: makeCustomRequest(routes.user.signInNormal),
  verifySignIn: makeCustomRequest(routes.user.verifySignInNormal),
};

module.exports = { requesters };
