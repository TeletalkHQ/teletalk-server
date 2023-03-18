import { randomMaker } from "utility-store";

import { models } from "@/models";

import { requesterCreator } from "$/classes/Requester";

import { routes } from "@/http/routes";

import { countries } from "@/variables/others/countries";

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
  getAllStuff: makeRequester(routes.stuff.getAllStuffs),
  getContacts: makeRequester(routes.user.getContacts),
  getCurrentUserData: makeRequester(routes.user.getCurrentUserData),
  getPublicUserData: makeRequester(routes.user.getPublicUserData),
  logout: makeRequester(routes.auth.logout),
  removeBlock: makeRequester(routes.user.removeBlock),
  removeContact: makeRequester(routes.user.removeContact),
  signIn: makeRequester(routes.auth.signIn),
  updatePublicUserData: makeRequester(routes.user.updatePublicUserData),
  verify: makeRequester(routes.auth.verify),
};

const otherUtilities = {
  getWrongCountryCode,
  makeRequester,
  requesters,
};

export { otherUtilities };
