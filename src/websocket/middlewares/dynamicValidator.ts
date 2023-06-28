import { customTypeof } from "custom-typeof";
import lodash from "lodash";
import { trier } from "simple-trier";

import {
  AddContactIO,
  EventName,
  Field,
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
  StringMap,
  ValidationCheckerIgnores,
} from "~/types";
import { validationCheckers } from "~/validationCheckers";
import { validators } from "~/validators";

type Data = StringMap;

export const dynamicValidator: SocketMiddleware = async (
  _socket,
  next,
  [eventName, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(dynamicValidator.name)
    .async()
    .try(tryBlock, data, eventName)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (data: Data, eventName: EventName) => {
  await validateField(data, eventName);
  return {
    ok: true,
  };
};

const validateField = async (data: Data, eventName: EventName) => {
  const filteredData = ignoreFieldsForValidate(data, eventName);

  for (const prop in filteredData) {
    const field = prop as Field;
    const value = data[field];

    if (customTypeof.isObject(value)) {
      await validateField(value, eventName);
      continue;
    }

    if (customTypeof.isArray(value)) {
      for (const item of value) {
        await validateField(item, eventName);
      }
      continue;
    }

    const ignores: ValidationCheckerIgnores = [];

    const validationResult = await validators[field](value);
    validationCheckers[field](validationResult, value, ignores);
  }
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

const ignoreAddContactData = (data: AddContactIO["input"]) => {
  const cellphoneFields = [
    data.countryCode,
    data.countryName,
    data.phoneNumber,
  ];

  if (cellphoneFields.every((i) => i === "") && data.userId) {
    return lodash.omit(data, "countryCode", "countryName", "phoneNumber");
  } else if (cellphoneFields.every(Boolean) && data.userId === "") {
    return lodash.omit(data, ["userId"]);
  }

  return data;
};

function ignoreFieldsForValidate(data: StringMap, eventName: EventName) {
  if (eventName === "addContact") {
    return ignoreAddContactData(data as AddContactIO["input"]);
  }

  return data;
}
