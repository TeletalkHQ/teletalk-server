/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { Socket } from "socket.io-client";
import { IoFields } from "check-fields";
import { faker } from "@faker-js/faker";

import { randomMaker } from "$/classes/RandomMaker";
import { requesterMaker } from "$/classes/Requester";

import { models } from "~/models";

import {
  Cellphone,
  EventName,
  Field,
  FullName,
  NativeError,
  SocketRoute,
} from "~/types";
import {
  RequesterCollection,
  RequesterMaker,
  RequesterMakerHelper,
  RequesterMakerWrapper,
} from "$/types";

import { utilities } from "~/utilities";

import { countries } from "~/variables";

import { routes } from "~/websocket/events";

async function asyncDescribe(title: string, suite: () => Promise<() => void>) {
  const describeBody = await suite();

  try {
    describe(title, describeBody);
  } catch (error) {
    utilities.crashServer(error);
  }
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
    models.native.countryCode.maxLength
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
  return `expected error: [event:${eventName}] [side:${error.side}] [reason:${error.reason}]`;
};

function generateDynamicData(schema: IoFields): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  Object.entries(schema).forEach(([fieldName, field]) => {
    const FIELD_NAME = fieldName as Field;
    const fieldModel = models.native[FIELD_NAME];

    switch (field.type) {
      case "string":
        if (FIELD_NAME === "countryCode") {
          data[fieldName] = randomMaker.country().countryCode;
          break;
        }
        if (FIELD_NAME === "countryName") {
          data[fieldName] = randomMaker.country().countryName;
          break;
        }
        if (FIELD_NAME === "phoneNumber") {
          // @ts-ignore
          data[fieldName] = randomMaker.stringNumber(fieldModel.maxLength);
          break;
        }

        data[fieldName] = faker.datatype.string(
          // @ts-ignore
          fieldModel.maxLength
        );
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
      //   const fieldArr = Array.isArray(field)
      //     ? field
      //     : [field];
      //   data[fieldName] = fieldArr.map((item) => {
      //     if (typeof item === "string") {
      //       if (fieldName === "countryCode" || fieldName === "phoneNumber") {
      //         return faker.datatype
      //           .number(fieldModel.maxLength)
      //           .toString();
      //       }
      //       return faker.datatype.string(fieldModel.maxLength);
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
  getCountries: requesterMakerHelper(routes.getCountries),
  getPrivateChat: requesterMakerHelper(routes.getPrivateChat),
  getPrivateChats: requesterMakerHelper(routes.getPrivateChats),
  getPublicUserData: requesterMakerHelper(routes.getPublicUserData),
  getStuff: requesterMakerHelper(routes.getStuff),
  getUserData: requesterMakerHelper(routes.getUserData),
  getWelcomeMessage: requesterMakerHelper(routes.getWelcomeMessage),
  joinRoom: requesterMakerHelper(routes.joinRoom),
  logout: requesterMakerHelper(routes.logout),
  ping: requesterMakerHelper(routes.ping),
  removeBlock: requesterMakerHelper(routes.removeBlock),
  removeContact: requesterMakerHelper(routes.removeContact),
  sendPrivateMessage: requesterMakerHelper(routes.sendPrivateMessage),
  signIn: requesterMakerHelper(routes.signIn),
  updatePublicUserData: requesterMakerHelper(routes.updatePublicUserData),
  verify: requesterMakerHelper(routes.verify),
};

const helpers = {
  asyncDescribe,
  createFailTestMessage,
  generateDynamicData,
  getWrongCountryCode,
  requesterCollection,
  requesterMakerHelper,
  setupRequester,
};

export { helpers };
