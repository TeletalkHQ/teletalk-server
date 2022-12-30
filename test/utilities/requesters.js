const { requesterCreator } = require("$/classes/requester/Requester");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { routes } = require("@/routes");

const { testUser_0 } = testVariablesManager.getTestUsers();
const defaultToken = testUser_0.sessions[0].token;
const defaultRequesterCreator = requesterCreator(defaultToken);
const makeRequester = (routeObject) => () =>
  defaultRequesterCreator.create(routeObject);

const requesters = {
  addBlock: makeRequester(routes.cellphone.addBlock),
  addContact: makeRequester(routes.cellphone.addContact),
  createNewUser: makeRequester(routes.user.createNewUser),
  editContact: makeRequester(routes.cellphone.editContact),
  getAllPrivateChats: makeRequester(routes.privateChat.getAllPrivateChats),
  getCurrentUserData: makeRequester(routes.user.getCurrentUserData),
  getTargetUserData: makeRequester(routes.user.getTargetUserData),
  logout: makeRequester(routes.user.logout),
  removeBlock: makeRequester(routes.cellphone.removeBlock),
  removeContact: makeRequester(routes.cellphone.removeContact),
  sendPrivateMessage: makeRequester(routes.privateChat.sendPrivateMessage),
  signIn: makeRequester(routes.user.signIn),
  verify: makeRequester(routes.user.verify),
};

module.exports = {
  makeRequester,
  requesters,
};
