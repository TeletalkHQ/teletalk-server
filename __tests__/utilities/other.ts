import { Socket } from "socket.io-client";
import { randomMaker } from "utility-store";

import { requesterCreator } from "$/classes/Requester";

import { models } from "@/models";

import { NativeError, SocketRoute } from "@/types";

import { countries } from "@/variables/others/countries";

import { routes } from "@/websocket/events";

const getWrongCountryCode = (): string => {
  const randomCountryCode = randomMaker.stringNumber(
    models.native.user.countryCode.maxlength.value
  );

  const isCountryExist = countries.some(
    (c) => c.countryCode === randomCountryCode
  );

  if (isCountryExist) return getWrongCountryCode();

  return randomCountryCode;
};

const makeRequester = (route: SocketRoute) => (socketClient: Socket) =>
  requesterCreator(socketClient, route);

const createFailTestMessage = (
  error: NativeError,
  route: SocketRoute | string
) => {
  const name = typeof route === "object" ? route.name : route;
  return `expected error: [route:${name}] [key:${error.key}] [reason:${
    error.reason
  }] - [ok:${error ? true : false}] `;
};

const requesters = {
  addBlock: makeRequester(routes.addBlock),
  addContact: makeRequester(routes.addContact),
  addContactWithCellphone: makeRequester(routes.addContactWithCellphone),
  createNewUser: makeRequester(routes.createNewUser),
  editContact: makeRequester(routes.editContact),
  getContacts: makeRequester(routes.getContacts),
  getCurrentUserData: makeRequester(routes.getCurrentUserData),
  getPublicUserData: makeRequester(routes.getPublicUserData),
  getStuff: makeRequester(routes.getStuff),
  logout: makeRequester(routes.logout),
  removeBlock: makeRequester(routes.removeBlock),
  removeContact: makeRequester(routes.removeContact),
  sendPrivateMessage: makeRequester(routes.sendPrivateMessage),
  signIn: makeRequester(routes.signIn),
  updatePublicUserData: makeRequester(routes.updatePublicUserData),
  verify: makeRequester(routes.verify),
  getPrivateChats: makeRequester(routes.getPrivateChats),
  getPrivateChat: makeRequester(routes.getPrivateChat),
};

const otherUtilities = {
  createFailTestMessage,
  getWrongCountryCode,
  makeRequester,
  requesters,
};

export { otherUtilities };
