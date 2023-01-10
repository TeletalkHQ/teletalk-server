const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { models } = require("@/models");

const { requesterCreator } = require("$/classes/requester/Requester");

const { routes } = require("@/routes");

const { countries } = require("@/variables/others/countries");

const getWrongCountryCode = () => {
  const randomCountryCode = randomMaker.stringNumber(
    models.native.user.countryCode.maxlength.value
  );

  const isCountryExist = countries.some(
    (c) => c.countryCode === randomCountryCode
  );

  if (isCountryExist) return getWrongCountryCode();

  return randomCountryCode;
};

const makeRequester = (routeObject) => (token) =>
  requesterCreator(token).create(routeObject);

const requesters = {
  addBlock: makeRequester(routes.user.addBlock),
  addContact: makeRequester(routes.user.addContact),
  createNewUser: makeRequester(routes.auth.createNewUser),
  editContact: makeRequester(routes.user.editContact),
  getAllPrivateChats: makeRequester(routes.privateChat.getAllPrivateChats),
  getContacts: makeRequester(routes.user.getContacts),
  getCurrentUserData: makeRequester(routes.user.getCurrentUserData),
  getPublicUserData: makeRequester(routes.user.getPublicUserData),
  logout: makeRequester(routes.auth.logout),
  removeBlock: makeRequester(routes.user.removeBlock),
  removeContact: makeRequester(routes.user.removeContact),
  sendPrivateMessage: makeRequester(routes.privateChat.sendPrivateMessage),
  signIn: makeRequester(routes.auth.signIn),
  verify: makeRequester(routes.auth.verify),
};

const otherUtilities = {
  getWrongCountryCode,
  makeRequester,
  requesters,
};

module.exports = {
  otherUtilities,
};
