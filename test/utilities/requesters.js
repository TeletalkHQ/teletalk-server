const { customRequestCreator } = require("$/classes/CustomRequest");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { routes } = require("@/routes");

const { testUser_0 } = testVariablesManager.getTestUsers();
const defaultToken = testUser_0.sessions[0].token;
const defaultCustomRequestCreator = customRequestCreator(defaultToken);
const makeCustomRequest = (routeObject) => () =>
  defaultCustomRequestCreator.create().setRouteObject(routeObject);

const requesters = {
  addBlock: makeCustomRequest(routes.cellphone.addBlock),
  addContact: makeCustomRequest(routes.cellphone.addContact),
  createNewUser: makeCustomRequest(routes.user.createNewUser),
  editContact: makeCustomRequest(routes.cellphone.editContact),
  getAllPrivateChats: makeCustomRequest(routes.privateChat.getAllPrivateChats),
  getCurrentUserData: makeCustomRequest(routes.user.getCurrentUserData),
  getTargetUserData: makeCustomRequest(routes.user.getTargetUserData),
  logout: makeCustomRequest(routes.user.logout),
  removeBlock: makeCustomRequest(routes.cellphone.removeBlock),
  removeContact: makeCustomRequest(routes.cellphone.removeContact),
  sendPrivateMessage: makeCustomRequest(routes.privateChat.sendPrivateMessage),
  signIn: makeCustomRequest(routes.user.signIn),
  verify: makeCustomRequest(routes.user.verify),
};

module.exports = {
  makeCustomRequest,
  requesters,
};
