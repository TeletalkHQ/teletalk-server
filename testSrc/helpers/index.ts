/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { Socket } from "socket.io-client";
import { IoFields } from "check-fields";
import { faker } from "@faker-js/faker";

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
    socket,
  };
};

const getWrongCountryCode = (): string => {
  const randomCountryCode = randomMaker.stringNumber(
    models.native.countryCode.maxlength.value
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

function generateDynamicData(schema: IoFields): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  Object.entries(schema).forEach(([fieldName, field]) => {
    switch (field.type) {
      case "string":
        data[fieldName] = faker.datatype.string();
        break;
      case "number":
        data[fieldName] = faker.datatype.number();
        break;
      case "boolean":
        data[fieldName] = faker.datatype.boolean();
        break;
      case "object":
        data[fieldName] = generateDynamicData(field.value as IoFields);
        break;
      case "array":
        const fieldArr = Array.isArray(field.value)
          ? field.value
          : [field.value];
        data[fieldName] = fieldArr.map((item) => {
          if (typeof item === "string") {
            return faker.datatype.string();
          } else if (typeof item === "number") {
            return faker.datatype.number();
          } else if (typeof item === "boolean") {
            return faker.datatype.boolean();
          } else if (typeof item === "object") {
            return generateDynamicData(item as IoFields);
          }
          return undefined;
        });
        break;
      default:
        data[fieldName] = null;
        break;
    }
  });

  return data;
}

const requesters = {
  addBlock: makeRequester(routes.addBlock),
  addContact: makeRequester(routes.addContact),
  addContactWithCellphone: makeRequester(routes.addContactWithCellphone),
  createNewUser: makeRequester(routes.createNewUser),
  editContact: makeRequester(routes.editContact),
  getChatInfo: makeRequester(routes.getChatInfo),
  getContacts: makeRequester(routes.getContacts),
  getUserData: makeRequester(routes.getUserData),
  getPrivateChat: makeRequester(routes.getPrivateChat),
  getPrivateChats: makeRequester(routes.getPrivateChats),
  getPublicUserData: makeRequester(routes.getPublicUserData),
  getStuff: makeRequester(routes.getStuff),
  joinRoom: makeRequester(routes.joinRoom),
  logout: makeRequester(routes.logout),
  ping: makeRequester(routes.ping),
  removeBlock: makeRequester(routes.removeBlock),
  removeContact: makeRequester(routes.removeContact),
  sendPrivateMessage: makeRequester(routes.sendPrivateMessage),
  signIn: makeRequester(routes.signIn),
  updatePublicUserData: makeRequester(routes.updatePublicUserData),
  verify: makeRequester(routes.verify),
  updateOnlineStatus: makeRequester(routes.updateOnlineStatus),
};

const helpers = {
  asyncDescribe,
  createFailTestMessage,
  generateDynamicData,
  getWrongCountryCode,
  makeRequester,
  requesters,
  setupRequester,
};

export { helpers };
