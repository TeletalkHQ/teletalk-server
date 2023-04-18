import { Socket } from "socket.io-client";

import { randomMaker } from "$/classes/RandomMaker";
import { requesterCreator } from "$/classes/Requester";

import { models } from "@/models";

import { NativeError, SocketRoute, Cellphone, FullName } from "@/types";
import { RequesterCreator } from "$/types";

import { countries } from "@/variables/others/countries";

import { routes } from "@/websocket/events";

async function asyncDescribe(title: string, suite: () => Promise<() => void>) {
  const describeBody = await suite();

  describe(title, describeBody);
}

const setupRequester = async (
  requester: RequesterCreator,
  cellphone?: Cellphone,
  fullName?: FullName
) => {
  const { socket, user } = await randomMaker.user(cellphone, fullName);
  return {
    requester: requester(socket),
    user,
  };
};

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
  getPrivateChat: makeRequester(routes.getPrivateChat),
  getPrivateChats: makeRequester(routes.getPrivateChats),
  getPublicUserData: makeRequester(routes.getPublicUserData),
  getStuff: makeRequester(routes.getStuff),
  logout: makeRequester(routes.logout),
  removeBlock: makeRequester(routes.removeBlock),
  removeContact: makeRequester(routes.removeContact),
  sendPrivateMessage: makeRequester(routes.sendPrivateMessage),
  signIn: makeRequester(routes.signIn),
  updatePublicUserData: makeRequester(routes.updatePublicUserData),
  verify: makeRequester(routes.verify),
};

const helpers = {
  asyncDescribe,
  createFailTestMessage,
  getWrongCountryCode,
  makeRequester,
  requesters,
  setupRequester,
};

export { helpers };
