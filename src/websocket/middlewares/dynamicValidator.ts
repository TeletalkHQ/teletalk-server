import { customTypeof } from "custom-typeof";
import { trier } from "simple-trier";

import {
  EventName,
  Field,
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "~/types";
import { validationCheckers } from "~/validationCheckers";
import { validators } from "~/validators";

type Data = { [prop in Field]: any };

const dynamicValidator: SocketMiddleware = async (
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
  return { ok: true };
};

const validateField = async (data: Data, eventName: EventName) => {
  for (const prop in data) {
    const p = prop as Field;
    const value = data[p];

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

    const validationResult = await validators[p](value);
    validationCheckers[p](validationResult, value);
  }
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { dynamicValidator };
