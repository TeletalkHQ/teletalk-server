import { customTypeof } from "custom-typeof";
import { trier } from "simple-trier";
import { EventName } from "teletalk-type-store";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
  StringMap,
} from "~/types";
import { Field } from "~/types/model";
import { validationCheckers, validators } from "~/validators";

export const dynamicValidator: SocketMiddleware = async (
  _socket,
  next,
  [eventName, data]
) => {
  return await trier(dynamicValidator.name)
    .async()
    .try(tryBlock, data, eventName)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (data: StringMap, eventName: EventName) =>
  await validateField(data, eventName);

const validateField = async (data: StringMap, eventName: EventName) => {
  for (const prop in data) {
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

    const validationResult = await validators[field](value);

    validationCheckers[field](validationResult, value);
  }
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};
