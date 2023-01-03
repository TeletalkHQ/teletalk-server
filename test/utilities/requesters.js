const { requesterCreator } = require("$/classes/requester/Requester");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { routes } = require("@/routes");

const { testUser_0 } = testVariablesManager.getTestUsers();
//TODO: Remove default token
const defaultToken = testUser_0.sessions[0].token;
const defaultRequesterCreator = requesterCreator(defaultToken);
const makeRequester = (routeObject) => () =>
  defaultRequesterCreator.create(routeObject);

const requesters = {
  addBlock: makeRequester(routes.user.addBlock),
  addContact: makeRequester(routes.user.addContact),
  createNewUser: makeRequester(routes.auth.createNewUser),
  editContact: makeRequester(routes.user.editContact),
  getAllPrivateChats: makeRequester(routes.privateChat.getAllPrivateChats),
  getCurrentUserData: makeRequester(routes.user.getCurrentUserData),
  getTargetUserData: makeRequester(routes.user.getTargetUserData),
  logout: makeRequester(routes.auth.logout),
  removeBlock: makeRequester(routes.user.removeBlock),
  removeContact: makeRequester(routes.user.removeContact),
  sendPrivateMessage: makeRequester(routes.privateChat.sendPrivateMessage),
  signIn: makeRequester(routes.auth.signIn),
  verify: makeRequester(routes.auth.verify),
};

module.exports = {
  makeRequester,
  requesters,
};
