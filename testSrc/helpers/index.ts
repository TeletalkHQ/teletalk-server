/* eslint-disable no-case-declarations */

/* eslint-disable indent */
import { faker } from "@faker-js/faker";
import { IoFields } from "check-fields";
import { Socket } from "socket.io-client";
import { Cellphone, FullName } from "utility-store/lib/types";

import { models } from "~/models";
import { EventName, IO, NativeError, SocketEvent } from "~/types";
import { Field } from "~/types/models";
import { utils } from "~/utils";
import { countries } from "~/variables";
import { events } from "~/websocket/events";

import { randomMaker } from "@/classes/RandomMaker";
import { requesterMaker } from "@/classes/Requester";
import { RequesterMaker, RequesterMakerWrapper } from "@/types";

async function asyncDescribe(title: string, suite: () => Promise<() => void>) {
  const describeBody = await suite();

  try {
    describe(title, describeBody);
  } catch (error) {
    utils.crashServer(error);
  }
}

const setupRequester = async <IOType extends IO>(
  requester: RequesterMaker<IOType>,
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

const requesterMakerHelper = <IOType extends IO>(
  event: SocketEvent<IOType>
) => {
  return ((socket: Socket) => {
    return requesterMaker(socket, event);
  }) as RequesterMakerWrapper<IOType>;
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

const requesterCollection = {
  addBlock: requesterMakerHelper(events.addBlock),
  addContact: requesterMakerHelper(events.addContact),
  createNewUser: requesterMakerHelper(events.createNewUser),
  editContact: requesterMakerHelper(events.editContact),
  getChatInfo: requesterMakerHelper(events.getChatInfo),
  getContacts: requesterMakerHelper(events.getContacts),
  getCountries: requesterMakerHelper(events.getCountries),
  getPrivateChat: requesterMakerHelper(events.getPrivateChat),
  getPrivateChats: requesterMakerHelper(events.getPrivateChats),
  getPublicUserData: requesterMakerHelper(events.getPublicUserData),
  getStuff: requesterMakerHelper(events.getStuff),
  getUserData: requesterMakerHelper(events.getUserData),
  getWelcomeMessage: requesterMakerHelper(events.getWelcomeMessage),
  joinRoom: requesterMakerHelper(events.joinRoom),
  logout: requesterMakerHelper(events.logout),
  ping: requesterMakerHelper(events.ping),
  removeBlock: requesterMakerHelper(events.removeBlock),
  removeContact: requesterMakerHelper(events.removeContact),
  sendPrivateMessage: requesterMakerHelper(events.sendPrivateMessage),
  signIn: requesterMakerHelper(events.signIn),
  updatePublicUserData: requesterMakerHelper(events.updatePublicUserData),
  verify: requesterMakerHelper(events.verify),
};

export const helpers = {
  asyncDescribe,
  createFailTestMessage,
  generateDynamicData,
  getWrongCountryCode,
  requesterCollection,
  requesterMakerHelper,
  setupRequester,
};
