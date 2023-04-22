/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { Socket } from "socket.io-client";
import { IoFields } from "check-fields";
import { faker } from "@faker-js/faker";

import { randomMaker } from "$/classes/RandomMaker";
import { requesterMaker } from "$/classes/Requester";

import { models } from "@/models";

import {
  Cellphone,
  EventName,
  FullName,
  NativeError,
  SocketRoute,
} from "@/types";
import {
  RequesterCollection,
  RequesterMaker,
  RequesterMakerHelper,
  RequesterMakerWrapper,
} from "$/types";

import { countries } from "@/variables";

import { routes } from "@/websocket/events";

async function asyncDescribe(title: string, suite: () => Promise<() => void>) {
  const describeBody = await suite();

  describe(title, describeBody);
}

const setupRequester = async (
  requester: RequesterMaker,
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

const requesterMakerHelper: RequesterMakerHelper = (route: SocketRoute) => {
  return ((socket: Socket) => {
    return requesterMaker(socket, route);
  }) as RequesterMakerWrapper;
};

const createFailTestMessage = (error: NativeError, eventName: EventName) => {
  return `expected error: [event:${eventName}] [key:${error.key}] [reason:${error.reason}]`;
};

function generateDynamicData(schema: IoFields): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  Object.entries(schema).forEach(([fieldName, field]) => {
    const { [fieldName as keyof typeof models.native]: fieldModel } =
      models.native;

    switch (field.type) {
      case "string":
        if (fieldName === "countryCode") {
          data[fieldName] = randomMaker.country().countryCode;
          break;
        }
        if (fieldName === "countryName") {
          data[fieldName] = randomMaker.country().countryName;
          break;
        }
        if (fieldName === "phoneNumber") {
          data[fieldName] = randomMaker.stringNumber(
            fieldModel.maxlength.value
          );
          break;
        }

        data[fieldName] = faker.datatype.string(fieldModel.maxlength.value);
        break;
      // case "number":
      //   data[fieldName] = faker.datatype.number();
      // break;
      case "boolean":
        data[fieldName] = faker.datatype.boolean();
        break;
      case "object":
        data[fieldName] = generateDynamicData(field.value as IoFields);
        break;
      // case "array":
      //   const fieldArr = Array.isArray(field.value)
      //     ? field.value
      //     : [field.value];
      //   data[fieldName] = fieldArr.map((item) => {
      //     if (typeof item === "string") {
      //       if (fieldName === "countryCode" || fieldName === "phoneNumber") {
      //         return faker.datatype
      //           .number(fieldModel.maxlength.value)
      //           .toString();
      //       }
      //       return faker.datatype.string(fieldModel.maxlength.value);
      //     }
      //     // else if (typeof item === "number") {
      //     //   return faker.datatype.number();
      //     // }
      //     else if (typeof item === "boolean") {
      //       return faker.datatype.boolean();
      //     } else if (typeof item === "object") {
      //       return generateDynamicData(item as IoFields);
      //     }
      //     return undefined;
      //   });
      //   break;
      default:
        data[fieldName] = null;
        break;
    }
  });

  return data;
}

const requesterCollection: RequesterCollection = {
  addBlock: requesterMakerHelper(routes.addBlock),
  addContact: requesterMakerHelper(routes.addContact),
  addContactWithCellphone: requesterMakerHelper(routes.addContactWithCellphone),
  createNewUser: requesterMakerHelper(routes.createNewUser),
  editContact: requesterMakerHelper(routes.editContact),
  getChatInfo: requesterMakerHelper(routes.getChatInfo),
  getContacts: requesterMakerHelper(routes.getContacts),
  getUserData: requesterMakerHelper(routes.getUserData),
  getPrivateChat: requesterMakerHelper(routes.getPrivateChat),
  getPrivateChats: requesterMakerHelper(routes.getPrivateChats),
  getWelcomeMessage: requesterMakerHelper(routes.getWelcomeMessage),
  getCountries: requesterMakerHelper(routes.getCountries),
  getPublicUserData: requesterMakerHelper(routes.getPublicUserData),
  getStuff: requesterMakerHelper(routes.getStuff),
  joinRoom: requesterMakerHelper(routes.joinRoom),
  logout: requesterMakerHelper(routes.logout),
  ping: requesterMakerHelper(routes.ping),
  removeBlock: requesterMakerHelper(routes.removeBlock),
  removeContact: requesterMakerHelper(routes.removeContact),
  sendPrivateMessage: requesterMakerHelper(routes.sendPrivateMessage),
  signIn: requesterMakerHelper(routes.signIn),
  updatePublicUserData: requesterMakerHelper(routes.updatePublicUserData),
  verify: requesterMakerHelper(routes.verify),
  updateOnlineStatus: requesterMakerHelper(routes.updateOnlineStatus),
};

const helpers = {
  asyncDescribe,
  createFailTestMessage,
  generateDynamicData,
  getWrongCountryCode,
  requesterMakerHelper,
  requesterCollection,
  setupRequester,
};

export { helpers };
