const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { models } = require("@/models");

const { requesterCreator } = require("$/classes/Requester");

const { routes } = require("@/http/routes");

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

const makeRequester = (route) => (token) =>
  requesterCreator(token).create(route);

const requesters = {
  addBlock: makeRequester(routes.user.addBlock),
  addContact: makeRequester(routes.user.addContact),
  createNewUser: makeRequester(routes.auth.createNewUser),
  editContact: makeRequester(routes.user.editContact),
  getAllPrivateChats: makeRequester(routes.privateChat.getAllPrivateChats),
  getAllStuff: makeRequester(routes.stuff.getAllStuffs),
  getContacts: makeRequester(routes.user.getContacts),
  getCurrentUserData: makeRequester(routes.user.getCurrentUserData),
  getPublicUserData: makeRequester(routes.user.getPublicUserData),
  logout: makeRequester(routes.auth.logout),
  removeBlock: makeRequester(routes.user.removeBlock),
  removeContact: makeRequester(routes.user.removeContact),
  sendPrivateMessage: makeRequester(routes.privateChat.sendPrivateMessage),
  signIn: makeRequester(routes.auth.signIn),
  updatePublicUserData: makeRequester(routes.user.updatePublicUserData),
  verify: makeRequester(routes.auth.verify),
  getPrivateChat: makeRequester(routes.privateChat.getPrivateChat),
};

const otherUtilities = {
  getWrongCountryCode,
  makeRequester,
  requesters,
};

module.exports = {
  otherUtilities,
};
